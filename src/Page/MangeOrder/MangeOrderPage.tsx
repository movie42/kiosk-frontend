import { useTransform, useViewportScroll } from "framer-motion";

import { Container, OrderStateContainer, OrderStateHeader } from "./styles";
import { useGetOrder, useElementTopOffset } from "./hooks";
import { Loading } from "@/Components/UI/Molecules";
import {
  OptionsContainer,
  OrderStateListContainer
} from "@/Components/UI/Organisms";

const handleMotionDiff = <TStart, TDiff>(start: TStart, ...rest: TDiff[]) => {
  return [start, ...rest];
};

const ManageOrderPage = () => {
  const { isLoading, isRefetching } = useGetOrder();
  const { elemetRef, topOffset } = useElementTopOffset();

  const { scrollY } = useViewportScroll();

  const display = useTransform(
    scrollY,
    handleMotionDiff(0, topOffset, topOffset + 1),
    handleMotionDiff("none", "none", "block")
  );
  const borderTick = useTransform(
    scrollY,
    handleMotionDiff(0, topOffset, topOffset + 1),
    handleMotionDiff("unset", "unset", "3px solid #575757")
  );

  return isLoading && isRefetching ? (
    <Loading title="주문 정보를 불러오고있어요" />
  ) : (
    <Container>
      <OrderStateHeader
        style={{
          display,
          borderBottom: borderTick,
          zIndex: 100
        }}
      >
        <OptionsContainer />
      </OrderStateHeader>
      <div ref={elemetRef}>
        <OptionsContainer />
      </div>
      <OrderStateContainer>
        <OrderStateListContainer />
      </OrderStateContainer>
    </Container>
  );
};

export default ManageOrderPage;
