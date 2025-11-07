import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import Router from './Component/Router/Router.jsx';

import { ToastContainer } from 'react-toastify';
import AuthProvider from './Component/AuthProvider/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
      <ToastContainer position="top-center" autoClose={2000} />
    </AuthProvider>
  // </StrictMode>,
)
