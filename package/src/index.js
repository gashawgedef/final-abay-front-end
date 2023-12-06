import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Spinner from "./views/Spinner/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {Toaster} from 'react-hot-toast'
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Suspense fallback={<div>loading</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
      <Toaster position=" top-center"  gutter={12} containerStyle={{margin:"8px"}} toastOptions={{
        success:{
          duration:3000,
        },
        error:{
          duration:3000,
        },
        style:{
          fontSize:'16px',
          maxWidth:'500px',
          padding:'16px 24px',
          backgroundColor:"#e5e7eb",
        

        }
      }}/>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
