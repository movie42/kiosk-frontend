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
import Modal from "../Modal";
import {
  ButtonContainer,
  ConfirmButton,
  FinalItem,
  Item,
  ItemListContainer,
  ItemWrapper
} from "./styles";

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
    setIsModal(false);
    setSelectOption({ options: "NONE" });
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
    <Modal>
      <h1>삭제하기</h1>
      {!isSuccess && (
        <p>상품을 삭제하면 복구할 수 없습니다. 한 번 더 확인해주세요.</p>
      )}
      {isSendingItem && (
        <p>{finalSelectedProduct.length}개의 상품을 삭제하고 있습니다.</p>
      )}
      {isSuccess && !isSendingItem && <p>상품 삭제를 완료했습니다.</p>}

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
    </Modal>
  );
};

export default DeleteModalChildren;