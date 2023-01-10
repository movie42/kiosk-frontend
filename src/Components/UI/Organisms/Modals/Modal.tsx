import {
  ModalContainer,
  ModalDefaultWrapper,
  TransparentBackground
} from "./styles";

export interface IModalProps {
  strach?: boolean;
  fullBox?: boolean;
  children: React.ReactNode;
}

/**
 * FIXME: 모달 컴포넌트 이름 정하기,
 * HOC 패턴 공부하고 모달에 메시지, 데이터, 버튼 영역으로 뷰를 정한다음에 일정한 형태로 사용할 수 있도록 리펙토링 하기
 * */

const Modal = ({ strach, fullBox, children }: IModalProps) => {
  return (
    <ModalDefaultWrapper>
      <ModalContainer strach={strach} fullBox={fullBox}>
        {children}
      </ModalContainer>
      <TransparentBackground />
    </ModalDefaultWrapper>
  );
};

export default Modal;
