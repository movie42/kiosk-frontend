import { useNavigate } from "react-router-dom";
import { ButtonContainer, CancelButton, ConfirmButton } from "./styles";

const ManageProductStatusBar = () => {
  const navigate = useNavigate();
  const handleCancelAddProduct = () => {
    navigate(-1);
  };

  return (
    <ButtonContainer>
      <h3>상품 입력이 끝나면 등록하기 버튼을 눌러주세요.</h3>
      <div>
        <CancelButton type="button" onClick={handleCancelAddProduct}>
          등록 취소
        </CancelButton>
        <ConfirmButton>상품 등록</ConfirmButton>
      </div>
    </ButtonContainer>
  );
};

export default ManageProductStatusBar;
