import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../API";

function Shopbanner(props) {
  const { subCategory } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const productList = await axios.get(`${API}/api/product/all`);
      const list = productList.data.product.filter((prod) => {
        return prod.subCategory === subCategory && prod.status;
      });
      setProducts(list);
    }
    getProduct();
  }, []);

  return (
    <div id="nt_content">
      <div class="kalles-section page_section_heading">
        <div class="page-head tc pr oh cat_bg_img page_head_">
          <div
            class="parallax-inner nt_parallax_false lazyload nt_bg_lz pa t__0 l__0 r__0 b__0"
            data-bgset="assets/images/shop/shop-banner.jpg"
          ></div>
          <div class="container pr z_100">
            <h1 class="mb__5 cw">{props.category}</h1>
            {props.heading ? (
              <h3 style={{ color: "white" }}>{props.heading}</h3>
            ) : (
              <p class="mg__0">
                "Shop through our latest selection of Products"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopbanner;
