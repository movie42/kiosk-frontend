import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ProductListValues } from "../../../lib/state/productItemState";
import {
  selectOptionState,
  selectProductListState,
  Option
} from "../../../lib/state/productItemState";
import styled from "styled-components";
import Noimage from "../../../Components/Images/Noimage";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { translateLocalCurrency } from "../../../lib/utils/helper/translateLocalCurrency";
import { useRemoveProductsMutation } from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { userState } from "../../../lib/state/userState";
import { useQueryClient } from "react-query";
import { motion } from "framer-motion";
import LoadingBall from "../../../Components/LoadingBall";
import Images from "../../../Components/Images/Images";

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem 0;
  overflow: auto;
  height: 100%;
`;
const ItemListContainer = styled.ul`
  height: 100%;
`;

const Item = styled.li<{ selected?: boolean }>`
  margin-top: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  padding: 0.5rem;
  display: grid;
  width: 100%;
  align-items: center;
  grid-template-columns: 0.5fr 1fr 2fr;
  .check-box {
    position: relative;
    width: 2rem;
    height: 2rem;
    border: 2px solid ${(props) => props.theme.color.gray300};
    border-radius: 100%;
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.7rem;
      height: 1.7rem;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      background-color: ${(props) =>
        props.selected && props.theme.color.error600};
      content: "";
    }
  }
  .image-container {
    overflow: hidden;
    width: 10rem;
  }
  .item-info-container {
    display: flex;
    flex-direction: column;
  }
`;

const ButtonContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-items: flex-end;
  align-self: flex-end;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;
const FinalItem = styled.li``;

const CancelButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.gray400};
`;
const ConfirmButton = styled(ButtonDefaultStyle)<{ isSuccess?: boolean }>`
  background-color: ${(props) =>
    props.isSuccess
      ? props.theme.color.primary700
      : props.theme.color.error700};
`;

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
    setSelectOption({ options: Option.NONE });
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
      setSelectOption({ options: Option.NONE });
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
    <>
      <h1>삭제하기</h1>
      {!isSuccess ? (
        <p>상품을 삭제하면 복구할 수 없습니다. 한 번 더 확인해주세요.</p>
      ) : isSendingItem ? (
        <p>{finalSelectedProduct.length}개의 상품을 삭제하고 있습니다.</p>
      ) : (
        <p>상품 삭제를 완료했습니다.</p>
      )}

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
              <FinalItem>
                <h3>{item.name}</h3>
              </FinalItem>
            ))}
          {isSuccess &&
            !isSendingItem &&
            finalSelectedProduct.map((item) => (
              <FinalItem>
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
    </>
  );
};

export default DeleteModalChildren;
