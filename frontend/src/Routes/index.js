import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "../components/Products";
import AddProduct from "../components/AddProduct";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default AllRoutes;
