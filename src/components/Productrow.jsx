import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../API";
import Wishlist from "./wishlist"

function Productrow() {
    const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(`${API}/api/product/getLatestSold`);

      setProducts(response.data.data);
    }
    getProduct();
  }, []);
  return (
    <div className="container">
      <div class="kalles-section nt_section type_carousel type_featured_collection_owl tp_se_cdt">
        <div class="kalles-cosmetics__trending-products container">
          <div class="wrap_title des_title_7">
            <h3 class="section-title tc pr flex fl_center al_center fs__24 title_7">
              <span class="mr__10 ml__10">Now Trending</span>
            </h3>
            <span class="dn tt_divider">
              <span></span>
              <i class="dn clprfalse la la-spa"></i>
              <span></span>
            </span>
            <span class="section-subtitle db tc"></span>
          </div>
          <div
           style={{display:'flex',justifyContent:'center'}}
            class="products nt_products_holder row row_pr_1 cdt_des_1 round_cd_false js_carousel nt_slider nt_cover ratio_nt position_8 space_30 prev_next_3 btn_owl_1 dot_owl_1 dot_color_1 btn_vi_2"
            data-flickity='{"imagesLoaded": 0,"adaptiveHeight": 0, "contain": 1, "groupCells": "100%", "dragThreshold" : 5, "cellAlign": "left","wrapAround": true,"prevNextButtons": true,"percentPosition": 1,"pageDots": false, "autoPlay" : 0, "pauseAutoPlayOnHover" : true, "rightToLeft": false }'
          >
          {/* <div style={{display:'flex',justifyContent:'space-between'}}> */}
          {products?.slice(0,4).map(i=>

            <div
            style={{display:'flex',justifyContent:'center'}}
            class="col-lg-3 col-md-6 col-sm-6 col-xs-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1" >
              <div class="product-inner pr">
                <div class="product-image pr oh lazyload">
                  <span class="tc nt_labels pa pe_none cw">
                    <span class="nt_label new">New</span>
                  </span>
                  <a class="db" href={`/product/${i.title.replace(/\s+/g, '-').toLowerCase()}/${i._id}`}>
                    <div
                      class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__100"
                      data-bgset={i?.featuredImage}
                      style={{height:320,width:265}}
                    ></div>
                  </a>
                  <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                    <div
                      class="pr_lazy_img back-img pa nt_bg_lz lazyload"
                      data-bgset={i?.featuredImage}
                      style={{height:320,width:265}}
                    ></div>
                  </div>
                <Wishlist id={i?._id}/>
                  {/* <div class="hover_button op__0 tc pa flex column ts__03">
                    {/* <a
                      href="#"
                      class="pr pr_atc cd br__40 bgw tc dib js_addtc cb chp ttip_nt tooltip_top_left"
                    >
                      <span class="tt_txt">Add to cart</span>
                      <i class="iccl iccl-cart"></i>
                      <span>Add to cart</span>
                    </a>
                  </div> */}
                </div>
                <div class="product-info mt__15">

                  <h3 class="product-title pr fs__14 mg__0 fwm">
                  <a
                          className="cd chp"
                          href={`/productDetails/${i._id}`}
                        >

                      {i?.title}
                      </a>

                  </h3>

                  <span className="price dib mb__5">
                        <del>
                          <span className="money">{i?.price}</span>
                        </del>
                        <ins>
                          <span className="money">{i?.sale_price}</span>
                        </ins>
                      </span>
                </div>
              </div>
            </div>

          )}
          </div>
            {/* <div class="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
              <div class="product-inner pr">
                <div class="product-image pr oh lazyload">
                  <a class="db" href="product-detail.html">
                    <div
                      class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__100"
                      data-bgset="assets/images/home-cosmetics/pr-05.jpg"
                    ></div>
                  </a>
                  <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                    <div
                      class="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__100"
                      data-bgset="assets/images/home-cosmetics/pr-06.jpg"
                    ></div>
                  </div>
                  <div class="nt_add_w ts__03 pa">
                    <a
                      href="#"
                      class="wishlistadd cb chp ttip_nt tooltip_right"
                    >
                      <span class="tt_txt">Add to Wishlist</span>
                      <i class="facl facl-heart-o"></i>
                    </a>
                  </div>
                  <div class="hover_button op__0 tc pa flex column ts__03">
                    <a
                      href="#"
                      class="pr pr_atc cd br__40 bgw tc dib js_addtc cb chp ttip_nt tooltip_top_left"
                    >
                      <span class="tt_txt">Add to cart</span>
                      <i class="iccl iccl-cart"></i>
                      <span>Add to cart</span>
                    </a>
                  </div>
                </div>
                <div class="product-info mt__15">
                  <h3 class="product-title pr fs__14 mg__0 fwm">
                    <a class="cd chp" href="product-detail.html">
                      Skin Fit Glow Cushion
                    </a>
                  </h3>
                  <span class="price dib mb__5">
                    <span class="money">Rs. 49.00</span>{" "}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
              <div class="product-inner pr">
                <div class="product-image pr oh lazyload">
                  <span class="tc nt_labels pa pe_none cw">
                    <span class="onsale nt_label">
                      <span>-34%</span>
                    </span>
                  </span>
                  <a class="db" href="product-detail.html">
                    <div
                      class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__100"
                      data-bgset="assets/images/home-cosmetics/pr-15.jpg"
                    ></div>
                  </a>
                  <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                    <div
                      class="pr_lazy_img back-img pa nt_bg_lz lazyload"
                      data-bgset="assets/images/home-cosmetics/pr-16.jpg"
                    ></div>
                  </div>
                  <div class="nt_add_w ts__03 pa">
                    <a
                      href="#"
                      class="wishlistadd cb chp ttip_nt tooltip_right"
                    >
                      <span class="tt_txt">Add to Wishlist</span>
                      <i class="facl facl-heart-o"></i>
                    </a>
                  </div>
                  <div class="hover_button op__0 tc pa flex column ts__03">
                    <a
                      href="#"
                      class="pr pr_atc cd br__40 bgw tc dib js_addtc cb chp ttip_nt tooltip_top_left"
                    >
                      <span class="tt_txt">Add to cart</span>
                      <i class="iccl iccl-cart"></i>
                      <span>Add to cart</span>
                    </a>
                  </div>
                </div>
                <div class="product-info mt__15">
                  <h3 class="product-title pr fs__14 mg__0 fwm">
                    <a class="cd chp" href="product-detail.html">
                      White Dew Milky Cleanser
                    </a>
                  </h3>
                  <span class="price dib mb__5">
                    <del>
                      <span class="money">Rs. 98.00</span>
                    </del>
                    <ins>
                      <span class="money">Rs. 65.00</span>
                    </ins>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
              <div class="product-inner pr">
                <div class="product-image pr oh lazyload">
                  <a class="db" href="product-detail.html">
                    <div
                      class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__100"
                      data-bgset="assets/images/home-cosmetics/pr-17.jpg"
                    ></div>
                  </a>
                  <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                    <div
                      class="pr_lazy_img back-img pa nt_bg_lz lazyload"
                      data-bgset="assets/images/home-cosmetics/pr-18.jpg"
                    ></div>
                  </div>
                  <div class="nt_add_w ts__03 pa">
                    <a
                      href="#"
                      class="wishlistadd cb chp ttip_nt tooltip_right"
                    >
                      <span class="tt_txt">Add to Wishlist</span>
                      <i class="facl facl-heart-o"></i>
                    </a>
                  </div>
                  <div class="hover_button op__0 tc pa flex column ts__03">
                    <a
                      href="#"
                      class="pr pr_atc cd br__40 bgw tc dib js_addtc cb chp ttip_nt tooltip_top_left"
                    >
                      <span class="tt_txt">Add to cart</span>
                      <i class="iccl iccl-cart"></i>
                      <span>Add to cart</span>
                    </a>
                  </div>
                </div>
                <div class="product-info mt__15">
                  <h3 class="product-title pr fs__14 mg__0 fwm">
                    <a class="cd chp" href="product-detail.html">
                      Water Bank Hydro Essence
                    </a>
                  </h3>
                  <span class="price dib mb__5">
                    <span class="money">Rs. 65.00</span>{" "}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
              <div class="product-inner pr">
                <div class="product-image pr oh lazyload">
                  <a class="db" href="product-detail.html">
                    <div
                      class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__100"
                      data-bgset="assets/images/home-cosmetics/pr-19.jpg"
                    ></div>
                  </a>
                  <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                    <div
                      class="pr_lazy_img back-img pa nt_bg_lz lazyload"
                      data-bgset="assets/images/home-cosmetics/pr-20.jpg"
                    ></div>
                  </div>
                  <div class="nt_add_w ts__03 pa">
                    <a
                      href="#"
                      class="wishlistadd cb chp ttip_nt tooltip_right"
                    >
                      <span class="tt_txt">Add to Wishlist</span>
                      <i class="facl facl-heart-o"></i>
                    </a>
                  </div>
                  <div class="hover_button op__0 tc pa flex column ts__03">
                    <a
                      href="#"
                      class="pr pr_atc cd br__40 bgw tc dib js_addtc cb chp ttip_nt tooltip_top_left"
                    >
                      <span class="tt_txt">Add to cart</span>
                      <i class="iccl iccl-cart"></i>
                      <span>Add to cart</span>
                    </a>
                  </div>
                </div>
                <div class="product-info mt__15">
                  <h3 class="product-title pr fs__14 mg__0 fwm">
                    <a class="cd chp" href="product-detail.html">
                      My Foundation All Day Long Wear
                    </a>
                  </h3>
                  <span class="price dib mb__5">
                    <span class="money">Rs. 45.00</span>{" "}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
              <div class="product-inner pr">
                <div class="product-image pr oh lazyload">
                  <span class="tc nt_labels pa pe_none cw">
                    <span class="nt_label hot">Hot</span>
                  </span>
                  <a class="db" href="product-detail.html">
                    <div
                      class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__100"
                      data-bgset="assets/images/home-cosmetics/pr-01.jpg"
                    ></div>
                  </a>
                  <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                    <div
                      class="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__100"
                      data-bgset="assets/images/home-cosmetics/pr-02.jpg"
                    ></div>
                  </div>
                  <div class="nt_add_w ts__03 pa">
                    <a
                      href="#"
                      class="wishlistadd cb chp ttip_nt tooltip_right"
                    >
                      <span class="tt_txt">Add to Wishlist</span>
                      <i class="facl facl-heart-o"></i>
                    </a>
                  </div>
                  <div class="hover_button op__0 tc pa flex column ts__03">
                    <a
                      href="#"
                      class="pr pr_atc cd br__40 bgw tc dib js_addtc cb chp ttip_nt tooltip_top_left"
                    >
                      <span class="tt_txt">Add to cart</span>
                      <i class="iccl iccl-cart"></i>
                      <span>Add to cart</span>
                    </a>
                  </div>
                </div>
                <div class="product-info mt__15">
                  <h3 class="product-title pr fs__14 mg__0 fwm">
                    <a class="cd chp" href="product-detail.html">
                      Laneige White Dew Emulsion
                    </a>
                  </h3>
                  <span class="price dib mb__5">
                    <span class="money">Rs. 55.00</span>{" "}
                  </span>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Productrow;
