import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Login from './components/Login.jsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from './components/Index.jsx'
import ProtectedRoute from "./utils/protectedRoute.jsx"
import Logout from "./utils/logout.jsx"
import SystemPermissionApply from "./components/SystemPermissionApply.jsx"

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="">
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Navigate to="/index" />
        </ProtectedRoute>
      } />
      <Route path="login" element={
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      } />
      <Route path="logout" element={
        <ProtectedRoute>
          <Logout />
        </ProtectedRoute>
      } />
      <Route path="index" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      }>
        <Route path="forms/system-permission-apply" element={
          <ProtectedRoute>
            <SystemPermissionApply />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
    </BrowserRouter>
    {
      //<App />
    }
    </GoogleOAuthProvider>
  </StrictMode>
)
