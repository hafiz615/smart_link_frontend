"use client";
import { Provider } from "react-redux";
import store from "../redux";
import Layout from "../components/Layout/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { useEffect, useState } from "react";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <html lang="en">
        <body>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <GlobalStyle />
          <ToastProvider>
            <Layout>{children}</Layout>
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
