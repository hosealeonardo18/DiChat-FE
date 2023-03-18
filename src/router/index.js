import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/404NotFound';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Home from '../pages/Home';
import Message from '../pages/Message';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/message/:id" element={<Message />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default Router