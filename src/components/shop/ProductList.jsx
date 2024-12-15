import React from "react";
import Product from "./Product-Item";

const ProductList = () => {
  
  return (
    <>
    {/* <Books />
    <StudyMaterials /> */}
    <Product heading="Books" endpoint="book" />
    <Product heading="Study Materials" endpoint="study-tool" />
    {/* <Product /> */}
    </>
  );
};

export default ProductList;
