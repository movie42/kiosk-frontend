import React from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "./styles";

interface IStoreCreateStatusBarProps {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

const StoreCreateStatusBar = ({ onSubmit }: IStoreCreateStatusBarProps) => {
  const navigate = useNavigate();

  return (
    <StatusBar>
      <div className="status-bar-item-container">
        <div className="status-message-container">
          <h3>입력이 끝나면 등록하기 버튼을 눌러주세요.</h3>
        </div>
        <div className="status-button-container">
          <button onClick={() => navigate(-1)} className="cancel-button">
            돌아가기
          </button>
          <button onClick={onSubmit} className="confirm-button">
            등록하기
          </button>
        </div>
      </div>
    </StatusBar>
  );
};

export default StoreCreateStatusBar;
