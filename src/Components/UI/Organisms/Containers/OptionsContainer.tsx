import { useSearchParams } from "react-router-dom";
import { AnimateSharedLayout } from "framer-motion";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { orderStatusState } from "@/lib/state";
import type { OrderStatusValue } from "@/lib/state/interface";
import {
  ManageOrderStatusButton,
  BasicSquareButton
} from "@/Components/UI/Atoms";
import { PageHeader } from "@/Components/UI/Organisms";
import { ButtonContainer, OptionContainer, SearchingInput } from "./styles";

type OptionsContainerProps = React.HTMLAttributes<HTMLDivElement>;

const OptionsContainer = ({ ...props }: OptionsContainerProps) => {
  const [_, setQueryString] = useSearchParams();

  const { register, handleSubmit } = useForm();
  const setOrderStatus = useSetRecoilState(orderStatusState);

  const searchOrder = handleSubmit((data) => {
    const { searchOrder } = data;
    if (searchOrder) {
      setQueryString(`order=${searchOrder}`);
      return;
    }
    setQueryString("");
  });

  const handleStatus = (statue: OrderStatusValue) => () => {
    setOrderStatus(statue);
  };

  return (
    <OptionContainer {...props}>
      <PageHeader header="주문관리" />
      <form onSubmit={searchOrder}>
        <SearchingInput
          type="number"
          placeholder="주문번호를 입력해주세요."
          {...register("searchOrder", {
            max: 3000,
            min: 1000
          })}
        />
        <BasicSquareButton>검색</BasicSquareButton>
      </form>
      <AnimateSharedLayout>
        <ButtonContainer>
          <ManageOrderStatusButton
            statusCheck="ALL"
            onClick={handleStatus("ALL")}
          >
            전체
          </ManageOrderStatusButton>
          <ManageOrderStatusButton
            statusCheck="READY"
            onClick={handleStatus("READY")}
          >
            주문접수
          </ManageOrderStatusButton>
          <ManageOrderStatusButton
            statusCheck="DONE"
            onClick={handleStatus("DONE")}
          >
            준비완료
          </ManageOrderStatusButton>
          <ManageOrderStatusButton
            statusCheck="COMPLETE"
            onClick={handleStatus("COMPLETE")}
          >
            주문완료
          </ManageOrderStatusButton>
          <ManageOrderStatusButton
            statusCheck="CANCELED"
            onClick={handleStatus("CANCELED")}
          >
            주문취소
          </ManageOrderStatusButton>
        </ButtonContainer>
      </AnimateSharedLayout>
    </OptionContainer>
  );
};

OptionsContainer.displayName = "OptionsContainer";

export default OptionsContainer;
