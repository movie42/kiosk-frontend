import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

import {
  InputDefault,
  LabelDefault,
  Loading,
  TextareaDefault
} from "@/Components";

import {
  CancelButton,
  CreateProductContainer,
  CreateButton,
  CreateProductHeader,
  OptionsField,
  ButtonContainer
} from "./styles";
import { useModalHook } from "@/lib/hooks";
import { CreateProductModal } from "@/Components/Modals";
import { useCreateProduct } from "../hooks";

interface ProductDefaultValue {
  imageUrl?: string;
  name: string;
  price: number;
  description?: string;
}

interface ProductMutationValue extends ProductDefaultValue {
  storeId: number;
}

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { isModal, setIsModal, setConfirm, confirm } = useModalHook();
  const {
    newProducts,
    addProductMutate,
    isProductAddSuccess,
    addProductOptionMutate,
    isProductAdding,
    isOptionAdding
  } = useCreateProduct();

  const {
    getValues: getProductValues,
    register,
    control,
    formState: { errors }
  } = useForm<{ product: ProductMutationValue[] }>({
    defaultValues: {
      product: [
        {
          storeId: Number(storeId),
          imageUrl: "",
          name: "",
          price: 0,
          description: ""
        }
      ]
    }
  });

  const { fields, append: productAppend } = useFieldArray({
    control,
    name: "product"
  });

  const {
    register: optionRegister,
    control: optionControl,
    formState: { errors: optionErrors },
    setError: optionSetError,
    getValues: optionValue
  } = useForm<{ options: { name: string }[] }>({
    defaultValues: {
      options: [{ name: "기본" }]
    }
  });

  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove
  } = useFieldArray({
    control: optionControl,
    name: "options"
  });

  const hasOptions = ({ options }: { options: { name: string }[] }) => {
    if (options.length === 0) {
      optionSetError("options", {
        message: "반드시 기본 옵션을 들어가야합니다."
      });
      return false;
    }

    optionSetError("options", { message: "" });
    return true;
  };

  const handleCancelAddProduct = () => {
    navigate(-1);
  };
  const handlSubmitAddProduct = () => {
    const options = optionValue("options");
    const isOption = hasOptions({ options });
    if (!isOption) {
      return;
    }
    setIsModal(true);
  };

  useEffect(() => {
    if (confirm) {
      const products = getProductValues("product").map((value) => ({
        ...value,
        price: Number(value.price)
      }));

      addProductMutate({ products });
    }
  }, [confirm]);

  useEffect(() => {
    if (isProductAddSuccess && newProducts?.addProducts) {
      const [productId] = newProducts.addProducts;
      const option = optionValue("options").map((value) => ({
        productId,
        name: value.name
      }));
      addProductOptionMutate({ option });
    }
  }, [isProductAddSuccess]);

  return (
    <>
      {isProductAdding && isOptionAdding && (
        <Loading
          title="잠시만 기다려주세요!"
          subTitle={
            isProductAdding
              ? "상품 등록 중입니다."
              : "옵션을 등록하는 중입니다."
          }
        />
      )}
      <CreateProductModal
        isModal={isModal}
        setIsModal={setIsModal}
        setConfirm={setConfirm}
      />
      <CreateProductContainer>
        <CreateProductHeader>
          <h2>상품 등록</h2>
          <button
            onClick={() =>
              productAppend({
                storeId: Number(storeId),
                name: "",
                price: 0,
                description: ""
              })
            }
          >
            추가
          </button>
        </CreateProductHeader>
        <form onSubmit={handlSubmitAddProduct}>
          {fields.map((item, index) => (
            <fieldset key={item.id}>
              {/* {location && <Images src={location} />} */}
              <div
                className="product-input-container"
                style={{ visibility: "hidden" }}
              >
                <InputDefault
                  id="name"
                  type="text"
                  disabled
                  {...register(`product.${index}.storeId`, {
                    value: Number(storeId)
                  })}
                />
              </div>
              {/* <div className="product-input-container">
                <LabelDefault htmlFor="imageUploader">섬네일</LabelDefault>
                <AddimageUrlLabel htmlFor="imageUploader">
                  <IoIosAddCircle />
                </AddimageUrlLabel>
                <AddimageUrl
                  id="imageUploader"
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  placeholder="사진 찾기"
                />
                <AddimageUrl
                  id="imageUrl"
                  type="text"
                  {...register(`product.${index}.imageUrl`)}
                />
              </div> */}

              <div className="product-input-container">
                <LabelDefault htmlFor="name">상품 이름</LabelDefault>
                <InputDefault
                  id="name"
                  type="text"
                  placeholder="상품 이름을 입력해주세요."
                  {...register(`product.${index}.name`, {
                    required: "상품 이름은 꼭 입력해야해요"
                  })}
                />
              </div>
              {errors.product && <p>{errors.product[index]?.name?.message}</p>}
              <div className="product-input-container">
                <LabelDefault htmlFor="price">상품 가격</LabelDefault>
                <InputDefault
                  id="price"
                  type="number"
                  placeholder="상품 가격을 입력해주세요."
                  {...register(`product.${index}.price`, {
                    required: "상품의 가격은 꼭 입력해야해요"
                  })}
                />
              </div>
              {errors.product && <p>{errors.product[index]?.name?.message}</p>}
              <OptionsField>
                <div className="add-option-button-container">
                  <LabelDefault>상품 옵션</LabelDefault>
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => optionsAppend({ name: "" })}
                  >
                    <IoIosAddCircle />
                    <span>옵션 추가</span>
                  </button>
                </div>
                {optionsFields.map((optionField, index) => (
                  // TODO: 컴포넌트로 따로 뺴는게 더 이득일까?
                  // FIXME: 옵션 필드가 제대로 동작하지 않는다. 수정이 필요함
                  <div className="option-input-container" key={optionField.id}>
                    <div className="option-label-button-container">
                      <LabelDefault htmlFor="option">
                        상품 옵션 {index + 1}
                      </LabelDefault>
                      <button
                        type="button"
                        onClick={() => optionsRemove(index)}
                      >
                        <IoIosRemoveCircle />
                        <span>삭제</span>
                      </button>
                    </div>
                    <InputDefault
                      id="option"
                      type="text"
                      placeholder="옵션의 이름을 입력해주세요"
                      {...optionRegister(`options.${index}.name`, {
                        value: optionField.name
                      })}
                    />
                  </div>
                ))}
                {optionErrors.options && <p>{optionErrors.options.message}</p>}
              </OptionsField>
              <div className="product-input-container">
                <LabelDefault htmlFor="infomation">상품 정보</LabelDefault>
                <TextareaDefault
                  id="description"
                  placeholder="상세 정보를 입력해주세요."
                  {...register(`product.${index}.description`)}
                />
              </div>
            </fieldset>
          ))}
        </form>
        <ButtonContainer>
          <h3>상품 입력이 끝나면 등록하기 버튼을 눌러주세요.</h3>
          <div>
            <CancelButton onClick={handleCancelAddProduct}>
              등록 취소
            </CancelButton>
            <CreateButton onClick={handlSubmitAddProduct}>
              상품 등록
            </CreateButton>
          </div>
        </ButtonContainer>
      </CreateProductContainer>
    </>
  );
};

export default CreateProductPage;
