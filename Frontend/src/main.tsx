import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "Ubuntu",
        fontSizes: {
          xs: "0.6rem",
          sm: "0.75rem",
          md: "0.9rem",
          lg: "1rem",
          xl: "1.2rem",
        },
      }}
    >      
      <Notifications position="top-center" zIndex={1000} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
