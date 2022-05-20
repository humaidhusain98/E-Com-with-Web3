import React,{useState} from "react";
import {useParams} from 'react-router-dom'
import Categoryfilter from "./Categoryfilter";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import Productlist from "./Productlist";
import Shopbanner from "./Shopbanner";

function Shop() {
  const{category}=useParams()
  const [products, setProducts] = useState(null);
  return (
    <div>
      <Header />
      <Navigation active={category}/>
      <Shopbanner category={category}/>
      <div className="container">
        <div className="row">
          <Categoryfilter setProducts={setProducts}  isCategory={false}/>
          <Productlist setProducts={setProducts} products={products}/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
