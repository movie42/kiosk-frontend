import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { theme, GlobalStyle } from "./lib/styles";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextAPI } from "./lib/state";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextAPI>
        <RecoilRoot>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </BrowserRouter>
        </RecoilRoot>
      </UserContextAPI>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
