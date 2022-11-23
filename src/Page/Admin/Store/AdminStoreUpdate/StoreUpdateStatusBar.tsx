import React from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "../styles";

interface IStoreUpdateStatusBarProps {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

const StoreUpdateStatusBar = ({ onSubmit }: IStoreUpdateStatusBarProps) => {
  const navigate = useNavigate();
  return (
    <StatusBar>
      <div className="status-bar-item-container">
        <div className="status-message-container">
          <h2>입력이 끝나면 수정하기 버튼을 눌러주세요.</h2>
        </div>
        <div className="status-button-container">
          <button onClick={() => navigate(-1)} className="cancel-button">
            돌아가기
          </button>
          <button onClick={onSubmit} className="confirm-button">
            수정하기
          </button>
        </div>
      </div>
    </StatusBar>
  );
};

export default StoreUpdateStatusBar;
