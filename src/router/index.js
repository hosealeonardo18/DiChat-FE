import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from '../components/PrivateRoute';
import NotFound from '../pages/404NotFound';
import AddUsers from '../pages/AddUsers';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ChatMessage from '../pages/ChatMessage';
import Home from '../pages/Home';
import Message from '../pages/Message';
import Template from '../pages/Template';
import Test from '../pages/Test';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={
            <RequireAuth>
              {/* <Home /> */}
              <Template />
            </RequireAuth>}
          />
          <Route path="/adduser" element={
            <RequireAuth>
              <AddUsers />
            </RequireAuth>}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/message/:id" element={
            <RequireAuth>
              {/* <Message /> */}
              <ChatMessage />
            </RequireAuth>
          }
          />
          <Route path="/test" element={<Test />} />
          <Route path="/template" element={<Template />} />
          <Route path="/template/chat/:id" element={<ChatMessage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default Router