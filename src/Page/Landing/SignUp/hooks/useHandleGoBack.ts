import React from "react";
import { useNavigate } from "react-router-dom";

const useHandleGoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const confirm = window.confirm(
      "작성 내용이 취소됩니다. 정말 돌아가시겠습니까?"
    );
    if (confirm) navigate("/agreement");
  };

  return { handleGoBack };
};

export default useHandleGoBack;
