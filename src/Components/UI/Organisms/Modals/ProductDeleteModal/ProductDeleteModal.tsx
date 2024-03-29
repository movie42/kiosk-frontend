import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useQueryClient } from "react-query";

import {
  ProductListValues,
  selectOptionState,
  selectProductListState,
  userState
} from "@/lib/state";
import { translateLocalCurrency } from "@/lib/utils";
import { useRemoveProductsMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { LoadingBall, Images, Noimage } from "@/Components/UI/Atoms";
import { CancelButton } from "../styles";
import {
  ButtonContainer,
  ConfirmButton,
  FinalItem,
  Item,
  ItemListContainer,
  ItemWrapper
} from "./styles";
import { ModalHeader, NewModal } from "@/Components/UI/Molecules";

interface IDeleteModalChildrenProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModalChildren = ({ setIsModal }: IDeleteModalChildrenProps) => {
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);
  const [isSendingItem, setIsSendingItem] = useState(false);
  const setSelectOption = useSetRecoilState(selectOptionState);
  const [selectProduct, setSelectProduct] = useRecoilState<ProductListValues[]>(
    selectProductListState
  );
  const [finalSelectedProduct, setFinalSelectedProduct] =
    useState<ProductListValues[]>(selectProduct);

  const { mutate, isSuccess } = useRemoveProductsMutation(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getProducts");
      }
    }
  );

  const handleModal = () => {
    setSelectProduct([]);
    setSelectOption({ options: "NONE" });
    setIsModal(false);
  };

  const selectDeleteItemsSubmitHandler = () => {
    const deleteProductIds = finalSelectedProduct.map((product) => product.id);
    setIsSendingItem(true);
    mutate({ productIds: { productIds: deleteProductIds } });
  };

  const checkBoxChangeHandler = (id: number) => {
    const hasItem = finalSelectedProduct.find((item) => item.id === id);
    if (!hasItem) {
      setFinalSelectedProduct((pre) => [
        ...pre,
        ...selectProduct.filter((value) => value.id === id)
      ]);
      return;
    }
    setFinalSelectedProduct((pre) => pre.filter((item) => item.id !== id));
  };

  const deleteModalStatusMessage = () => {
    if (!isSuccess) {
      return "상품을 삭제하면 복구할 수 없습니다. 한 번 더 확인해주세요.";
    }
    if (isSendingItem) {
      return `${finalSelectedProduct.length}개의 상품을 삭제하고 있습니다.`;
    }

    if (isSuccess && !isSendingItem) {
      return "상품 삭제를 완료했습니다.";
    }
  };

  useEffect(() => {
    return () => {
      setSelectOption({ options: "NONE" });
      setSelectProduct([]);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => setIsSendingItem(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  return (
    <NewModal
      modalOptions={{ stretch: true }}
      Header={
        <ModalHeader title="삭제하기" subtitle={deleteModalStatusMessage()} />
      }
      Model={
        <ItemWrapper>
          <ItemListContainer>
            {!isSuccess &&
              !isSendingItem &&
              selectProduct?.map((item) => (
                <Item
                  key={item.id}
                  data-id={item.id}
                  onClick={() => checkBoxChangeHandler(item.id)}
                  selected={finalSelectedProduct?.some(
                    (findItem) => findItem.id === item.id
                  )}
                >
                  <span className="check-box"></span>
                  <div className="image-container">
                    {item.imageUrl ? (
                      <Images src={`${item.imageUrl}`} alt={item.name} />
                    ) : (
                      <Noimage />
                    )}
                  </div>
                  <div className="item-info-container">
                    <h3>{item.name}</h3>
                    <p>
                      {translateLocalCurrency(item.price, "ko-KR", {
                        style: "currency",
                        currency: "KRW"
                      })}
                    </p>
                  </div>
                </Item>
              ))}
            {isSendingItem &&
              finalSelectedProduct.map((item) => (
                <FinalItem key={item.id}>
                  <h3>{item.name}</h3>
                </FinalItem>
              ))}
            {isSuccess &&
              !isSendingItem &&
              finalSelectedProduct.map((item) => (
                <FinalItem key={item.id}>
                  <h3>{item.name}</h3>
                </FinalItem>
              ))}
          </ItemListContainer>
        </ItemWrapper>
      }
      Buttons={
        <ButtonContainer>
          {!isSuccess && !isSendingItem && (
            <>
              <CancelButton onClick={handleModal}>돌아가기</CancelButton>
              <ConfirmButton onClick={selectDeleteItemsSubmitHandler}>
                삭제하기
              </ConfirmButton>
            </>
          )}
          {isSendingItem && <LoadingBall color="black" />}
          {isSuccess && !isSendingItem && (
            <ConfirmButton onClick={handleModal} isSuccess={isSuccess}>
              완료하기
            </ConfirmButton>
          )}
        </ButtonContainer>
      }
    />
  );
};

export default DeleteModalChildren;
