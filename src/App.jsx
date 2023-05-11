import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigator from './components/Navigator';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Layout from './pages/Layout';
import Book from './pages/Book';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

export default function App() {
  const [isLogin, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <Navigator isLogin={isLogin} setLogin={setLogin} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/rooms/" element={<Rooms />}></Route>
        <Route path="/rooms/:room" element={<Layout />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route
          path="/register"
          element={<Register setLogin={setLogin} />}
        ></Route>
        <Route path="/login" element={<Login setLogin={setLogin} />}></Route>
        <Route
          path="/profile"
          element={<Profile setLogin={setLogin} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
