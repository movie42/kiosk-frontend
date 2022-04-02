import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IFetchProps {
  responseData?: any;
  success?: boolean;
}

function App() {
  const [responseData, setResponseData] = useState<IFetchProps>({});

  const testFetcu = async () => {
    const response = await fetch("http://localhost:5500");
    const { data } = await response.json();
    setResponseData(data);
  };

  useEffect(() => {
    testFetcu();
  }, []);

  return <div className="App">{responseData?.success ? "성공" : "실패"}</div>;
}

export default App;
