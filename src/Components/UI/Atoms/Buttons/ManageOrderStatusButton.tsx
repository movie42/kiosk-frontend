import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

import { orderStatusState } from "@/lib/state";
import { OrderStatusValue } from "@/lib/state/interface";
import BasicSquareButton from "./BasicSquareButton";
import styled from "styled-components";
import { motion } from "framer-motion";

interface ManageOrderStatusButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  statusCheck: OrderStatusValue;
  children: ReactNode;
}

const ManageOrderStatusButton = ({
  statusCheck,
  children,
  ...props
}: ManageOrderStatusButtonProps) => {
  const orderStatus = useRecoilValue(orderStatusState);

  return (
    <BasicSquareButton {...props}>
      {children}
      {orderStatus === statusCheck && <Underline layoutId="underline" />}
    </BasicSquareButton>
  );
};

export default ManageOrderStatusButton;

const Underline = styled(motion.div)`
  border-bottom: 3px solid ${(props) => props.theme.color.primary700};
`;
