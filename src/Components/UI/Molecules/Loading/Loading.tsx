import LoadingBall from "../../Atoms/LoadingBall/LoadingBall";
import {
  loadingBackgroundVariants,
  Wrapper,
  FontContainer,
  Title,
  SubTitle,
  TransparentBackground
} from "./styles";

interface ILoadingProps {
  title: string;
  subTitle?: string;
}

const Loading = ({ title, subTitle }: ILoadingProps) => {
  return (
    <Wrapper
      variants={loadingBackgroundVariants}
      initial="init"
      animate="animate"
      exit="exit"
    >
      <FontContainer>
        <LoadingBall color="white" />
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </FontContainer>
      <TransparentBackground />
    </Wrapper>
  );
};

export default Loading;
