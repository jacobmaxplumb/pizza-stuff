import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/Home";
import { Order } from "./components/Order";
import './App.css';

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Lambda Eats</h1>
      <ul>
        <li onClick={() => navigate('')}>Home</li>
        <li id="order-pizza" onClick={() => navigate('/pizza')}>Pizza</li>
      </ul>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/pizza" element={<Order />} />
      </Routes>
    </>
  );
};
export default App;
