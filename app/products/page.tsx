import ProductFilterBar from "@/components/ProductFilterBar";
import React from "react";
import ProductGrid from "@/components/ProductGrid";
const page = () => {
  return (
    <div>
      <ProductFilterBar
        categories={[]}
        selectedCategory={""}
        priceFilter={"default"}
      />
      <ProductGrid />
    </div>
  );
};

export default page;
