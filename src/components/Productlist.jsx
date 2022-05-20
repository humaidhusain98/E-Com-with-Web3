import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../API";
import Wishlist from "./wishlist"

function Productlist({products, setProducts}) {
  const { subCategory,category } = useParams();


  useEffect(() => {


    getProduct();
  }, []);
  async function getProduct() {
    const productList = await axios.get(`${API}/api/product/subcategory/${category}/${subCategory}`);
    const list = productList.data.product
    setProducts(list);
  }
  return (
    <div class="col-lg-9 col-12">
      <div class="kalles-section tp_se_cdt">
        {/* <!--filter result--> */}
        <div class="result_clear mt__30 mb__20 dn">
          <div class="sp_result_html dib cb clear_filter">
            <span class="cp">20</span> Products Found
          </div>
          <a class="clear_filter dib" href="#">
            Clear All Filter
          </a>
          <a
            href="#"
            class="clear_filter dib bf_icons"
            aria-label="Remove tag Size  M"
          >
            Size M
          </a>
          <a
            href="#"
            class="clear_filter dib bf_icons"
            aria-label="Remove tag Color  Cyan"
          >
            Color Cyan
          </a>
          <a
            href="#"
            class="clear_filter dib bf_icons"
            aria-label="Remove tag Vendor  Kalles"
          >
            Vendor Kalles
          </a>
        </div>
        {/* <!--end filter result--> */}

        {/* <!--products list--> */}
        <div class="on_list_view_false products nt_products_holder row fl_center row_pr_1 cdt_des_1 round_cd_false nt_cover ratio_nt position_8 space_30 nt_default">
          {products===null?
           <h3 style={{ marginTop: "5rem" }}>Loading...</h3>
          :
          <>
          {products.length > 0 ? (
            products.map((item, index) => {
              return (
                <div
                  key={index}
                  class="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1"
                >
                  <div class="product-inner pr">
                    <div class="product-image pr oh lazyload">
                      <span class="tc nt_labels pa pe_none cw">
                        <span class="nt_label new">New</span>
                      </span>
                      <a class="d-block" href={`/productDetails/${item._id}`}>
                        <div
                          class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_571"
                          data-bgset={item.featuredImage}
                        ></div>
                      </a>
                      <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                        <div
                          class="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__127_571"
                          data-bgset={item.featuredImage}
                        ></div>
                      </div>
                      <Wishlist id={item._id} />
                      {/* <div class="hover_button op__0 tc pa flex column ts__03"> */}
                        {/* <a
                          class="pr nt_add_qv js_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left"
                          href="#"
                        >
                          <span class="tt_txt">Quick view</span>
                          <i class="iccl iccl-eye"></i>
                          <span>Quick view</span>
                        </a> */}
                        {/* <a
                          href="#"
                          class="pr pr_atc cd br__40 bgw tc dib js__qs cb chp ttip_nt tooltip_top_left"
                        >
                          <span class="tt_txt">Quick Shop</span>
                          <i class="iccl iccl-cart"></i>
                          <span>Quick Shop</span>
                        </a>
                      </div> */}
                    </div>
                    <div class="product-info mt__15">
                      <h3 class="product-title pr fs__14 mg__0 fwm">
                        <a class="cd chp" href={`/product/${item.title.replace(/\s+/g, '-').toLowerCase()}/${item._id}`}>
                          {item.title}
                        </a>
                      </h3>
                      <span class="price dib mb__5">Rs. {item.sale_price}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )
           : (
            <h1 style={{ marginTop: "5rem" }}>No Product Found</h1>
          )}
          </>
          }
        </div>
      </div>
      <div class="products-footer tc mt__40">
        {/* <nav class="nt-pagination w__100 tc paginate_ajax">
          <ul class="pagination-page page-numbers">
            <li>
              <span class="page-numbers current">1</span>
            </li>
            <li>
              <a class="page-numbers" href="#">
                2
              </a>
            </li>
            <li>
              <a class="page-numbers" href="#">
                3
              </a>
            </li>
            <li>
              <a class="page-numbers" href="#">
                4
              </a>
            </li>
            <li>
              <a class="next page-numbers" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
}

export default Productlist;
