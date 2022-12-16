import React, { useEffect, useState } from "react";
import { translateLocalCurrency } from "@/lib/utils";
import { useHandleOrderItem } from "../../hooks/useHandleOrderItem";
import { Images, Noimage } from "@/Components/UI/Atoms/Images";
import { ProductListValues } from "@/lib/state/productItemState";
import {
  AddCountButton,
  MinusCountButton
} from "@/Page/Client/ClientSelectList/styles";
import {
  ItemNameContainer,
  Wrapper,
  OptionButton,
  OrderContainer,
  OptionContainer,
  CancelButton,
  OrderButton,
  Title,
  ProductCount
} from "./styles";
import { useWarning } from "../../hooks/useWarning";
import { WARNING_MESSAGE } from "../../interface";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";

interface SelectedOption {
  name: string;
  id: number;
}

interface MenuItemModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: ProductListValues;
}

const MenuItemModal = ({
  setIsModal,
  selectedItem: selected
}: MenuItemModalProps) => {
  const [count, setCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    name: "",
    id: 0
  });
  const { warning, displayWarning } = useWarning();
  const { orderSelectedItem, orderDone } = useHandleOrderItem();

  const handleClick = () => {
    displayWarning({ selected, count, optionName: selectedOption.name });
  };

  const closeModal = () => {
    setCount(0);
    setIsModal(false);
  };

  useEffect(() => {
    if (warning === "NONE") {
      orderSelectedItem({ selected, count, selectedOption });
    }
  }, [warning]);

  useEffect(() => {
    if (orderDone) {
      closeModal();
      // setOrderDone(false); // is must?
    }
  }, [orderDone]);

  return (
    <Wrapper>
      <div className="image-container">
        <span className="transparent-box"></span>
        <ItemNameContainer>
          <h2>{selected.name}</h2>
        </ItemNameContainer>
        {selected.imageUrl ? (
          <Images src={selected.imageUrl} alt={selected.name} />
        ) : (
          <Noimage />
        )}
      </div>
      <div className="item-info-container">
        <Title composition={true}>구성</Title>
        <p className="item-title">{selected.name} 1개</p>

        {selected.options && (
          <OptionSelection
            selected={selected}
            selectedOptionName={selectedOption.name}
            setSelectedOption={setSelectedOption}
          />
        )}

        <Title>
          총 가격&nbsp;
          {translateLocalCurrency(count * Number(selected.price), "ko-KR")}원
        </Title>

        <OrderContainer>
          {warning && (
            <span className="warning">{WARNING_MESSAGE[warning]}</span>
          )}

          <CountButtonGroup count={count} setCount={setCount} />

          <CancelButton onClick={closeModal}>취소하기</CancelButton>
          <OrderButton onClick={handleClick}>주문하기</OrderButton>
        </OrderContainer>
      </div>
    </Wrapper>
  );
};

export default MenuItemModal;

interface OptionSelectionProps {
  selected: ProductListValues;
  selectedOptionName: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption>>;
}
const OptionSelection = ({
  selected,
  selectedOptionName,
  setSelectedOption
}: OptionSelectionProps) => {
  return (
    <>
      <Title>상품옵션</Title>
      <OptionContainer>
        {selected.options?.map((item) => (
          <OptionButton
            className="noto"
            key={item.name}
            selected={selectedOptionName === item.name ? true : false}
            onClick={() =>
              setSelectedOption((prev) => {
                return { ...prev, name: item.name, id: item.id };
              })
            }
          >
            {item.name}
          </OptionButton>
        ))}
      </OptionContainer>
    </>
  );
};

interface CountButtonGroupProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
const CountButtonGroup = ({ count, setCount }: CountButtonGroupProps) => {
  return (
    <>
      <MinusCountButton
        ReactIcon={MdRemoveCircle}
        hidden={false}
        text="수량 감소"
        onClick={() => {
          if (count < 1) return;
          setCount((count) => count - 1);
        }}
      />
      <ProductCount>{count}</ProductCount>
      <AddCountButton
        ReactIcon={MdAddCircle}
        hidden={false}
        text="수량 증가"
        onClick={() => {
          if (count < 0) return;
          setCount((count) => count + 1);
        }}
      />
    </>
  );
};
