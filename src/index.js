import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
