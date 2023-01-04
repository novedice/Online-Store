import React from "react";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="h-11 w-[100%] bg-gray-600 text-center flex justify-between">
      <div className="ml-5 mr-5 flex items-center">
        <Link className="mb-2 mr-8" to="/">Shop</Link>
      </div>
      <div className="ml-5 mr-5 flex items-center">
        <Link to="/cart">ShopCart</Link>
      </div>
    </nav>
  );
}
