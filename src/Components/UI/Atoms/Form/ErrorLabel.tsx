import styled from "styled-components";
import { SubTitle2 } from "@/lib/styles";
import LabelDefault from "./LabelDefault";

const ErrorLabel = styled(LabelDefault)`
  font-size: 1.8rem;
  grid-column: 2 / 10;
  color: ${(props) => props.theme.color.error500};
  ${({ theme }) => theme.device.tablet} {
    .error-label {
      grid-column: 1 / 10;
      ${SubTitle2};
      color: ${(props) => props.theme.color.error500};
    }
  }
`;

export default ErrorLabel;
