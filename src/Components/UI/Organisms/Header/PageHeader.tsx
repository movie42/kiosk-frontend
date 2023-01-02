import { Wrapper } from "./styles";

interface IPageMessageHeaderProps {
  header: string;
  message?: string;
}

const PageHeader = ({ header, message }: IPageMessageHeaderProps) => {
  return (
    <Wrapper>
      <h2>{header}</h2>
      <h3>{message}</h3>
    </Wrapper>
  );
};

export default PageHeader;
