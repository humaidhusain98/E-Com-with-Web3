import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../API";

function Categorybanner() {
  let [featuredCategory, setFeaturedCategory] = useState([]);
  let featuredCategoryList = [];

  useEffect(() => {
    async function getCategory() {
      let category = await axios.get(`${API}/api/category`);

      if (category) {
        category.data.map((cate) => {
          if (cate.featured) {
            featuredCategoryList.push(cate);
          }
        });
        setFeaturedCategory(featuredCategoryList);
      }
    }
    getCategory();
  }, []);

  return (
    <div classNameName="container" style={{ marginTop: "5rem" }}>
      <div className="kalles-section nt_section type_collection_list">
        <div className="kalles-cosmetics__category-banner container">
          <div className="wrap_title des_title_7">
            <h3 className="section-title tc pr flex fl_center al_center fs__24 title_7">
              <span className="mr__10 ml__10">
                Welcome to Shop India
              </span>
            </h3>
            <span className="dn tt_divider">
              <span></span>
              <i className="dn clprfalse la la-spa"></i>
              <span></span>
            </span>
            <span className="section-subtitle db tc sub-title"></span>
          </div>
          <div className="mt__30 nt_cats_holder row equal_nt hoverz_true cat_size_4 cat_lay4_2 cat_lay5_1 cat_space_30 cat_design_1">
            {featuredCategory.map((item, index) => {
              return (
                <div className="col-md-6 col-12" key={index}>
                  <div className="row">
                    <div
                      className={`cat_grid_item cat_space_item cat_grid_item_1 col-12`}
                    >
                      <div className="cat_grid_item__content pr oh">
                        <a
                          href={`/allProducts/${item.category}`}
                          className="db cat_grid_item__link"
                        >
                          <div
                            className="cat_grid_item__overlay item__position nt_bg_lz lazyload center"
                            data-bgset={item.image}
                          ></div>
                        </a>
                        <div className={`cat_grid_item__wrapper pe_none`}>
                          <div className="cat_grid_item__title">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="col-md-6 col-12">
              <div className="row">
                <div className="cat_grid_item cat_space_item cat_grid_item_1 col-12">
                  <div className="cat_grid_item__content pr oh">
                    <a
                      href="shop-left-sidebar.html"
                      className="db cat_grid_item__link"
                    >
                      <div
                        className="cat_grid_item__overlay item__position nt_bg_lz lazyload center"
                        data-bgset="assets/images/home-cosmetics/cat-banner-01.jpg"
                      ></div>
                    </a>
                    <div className="cat_grid_item__wrapper pe_none">
                      <div className="cat_grid_item__title">Makeup</div>
                    </div>
                  </div>
                </div>
                <div className="cat_grid_item cat_space_item cat_grid_item_3 col-12">
                  <div className="cat_grid_item__content pr oh">
                    <a
                      href="shop-left-sidebar.html"
                      className="db cat_grid_item__link"
                    >
                      <div
                        className="cat_grid_item__overlay item__position nt_bg_lz lazyload center"
                        data-bgset="assets/images/home-cosmetics/cat-banner-02.jpg"
                      ></div>
                    </a>
                    <div className="cat_grid_item__wrapper pe_none">
                      <div className="cat_grid_item__title">Skincare</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6 col-12">
              <div className="row">
                <div className="cat_grid_item cat_space_item cat_grid_item_2 col-12">
                  <div className="cat_grid_item__content pr oh">
                    <a
                      href="shop-left-sidebar.html"
                      className="db cat_grid_item__link"
                    >
                      <div
                        className="cat_grid_item__overlay item__position nt_bg_lz lazyload center"
                        data-bgset="assets/images/home-cosmetics/cat-banner-03.jpg"
                      ></div>
                    </a>
                    <div className="cat_grid_item__wrapper pe_none">
                      <div className="cat_grid_item__title">Bath & Body</div>
                    </div>
                  </div>
                </div>
                <div className="cat_grid_item cat_space_item cat_grid_item_4 col-12">
                  <div className="cat_grid_item__content pr oh">
                    <a
                      href="shop-left-sidebar.html"
                      className="db cat_grid_item__link"
                    >
                      <div
                        className="cat_grid_item__overlay item__position nt_bg_lz lazyload center"
                        data-bgset="assets/images/home-cosmetics/cat-banner-04.jpg"
                      ></div>
                    </a>
                    <div className="cat_grid_item__wrapper pe_none">
                      <div className="cat_grid_item__title">Makeup Brushes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorybanner;
