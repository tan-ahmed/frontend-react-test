import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.baseURL = "http://localhost:3002";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ToastContainer
                        position="top-center"
                        autoClose={1500}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover={false}
                        theme="light"
                        limit={3}
                        transition={Slide}
                    />
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </NextUIProvider>
    </React.StrictMode>
);
