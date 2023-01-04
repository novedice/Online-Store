import React from "react";

import { Categories } from "../components/Categories";
import { ShowProduct } from "../components/ShowProduct";
import { useProducts } from "../hooks/products";
// import { SearchParams } from "../components/SearchParams";

export function ShopPage() {
  const { allProd, loading, error } = useProducts();

  return (
    <div className="w-auto">
      <Categories/>
      
      <div className="container mx-auto flex w-3/4 flex-wrap pt-5">
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {allProd.map((product) => (
          <ShowProduct product={product} key={product.id} />
        ))}
        {/* filter((elem) => elem.props.product.category === "smartphones") */}
      </div>
    </div>
  );
}