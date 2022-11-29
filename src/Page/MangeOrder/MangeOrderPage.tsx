import {
  Loading,
  OptionsContainer,
  OrderStateListContainer
} from "@/Components";
import { Container, OrderStateContainer, OrderStateHeader } from "./styles";
import { useGetOrder, useStikyHeader } from "./hooks";

const ManageOrderPage = () => {
  const { isLoading, isRefetching } = useGetOrder();
  const { sticky, stickyPos } = useStikyHeader();

  return isLoading && isRefetching ? (
    <Loading title="주문 정보를 불러오고있어요" />
  ) : (
    <Container>
      <OrderStateHeader ref={sticky}>
        <OptionsContainer stickyPos={stickyPos} />
      </OrderStateHeader>
      <OrderStateContainer>
        <OrderStateListContainer />
      </OrderStateContainer>
    </Container>
  );
};

export default ManageOrderPage;
