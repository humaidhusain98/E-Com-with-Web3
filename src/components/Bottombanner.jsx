import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../API";

function Bottombanner() {
  let [featuredCategory, setFeaturedCategory] = useState([]);
  let featuredCategoryList = [];
  useEffect(() => {
    async function getCategory() {
      let category = await axios.get(`${API}/api/category`);
      // if (category) {
      //   category.data.map((cate) => {
      //     if (cate.featured) {
      //       featuredCategoryList.push(cate);
      //     }
      //   });
        setFeaturedCategory(category.data);

    }
    getCategory();
  }, []);
  return (
    <div>
      <div className="kalles-section nt_section type_instagram_feed type_pin_owl bg-white">
        <div className="kalles-cosmetics__instagram nt_full pr ins_loaded">
          <div
           style={{display:'flex',justifyContent:'center'}}
            className="ins_shop_wrap row equal_nt ins_spaces_0 ins_rounded_0 nt_cover ratio1_1 position_8 se_instagram js_carousel nt_slider prev_next_0 btn_owl_1 dot_owl_1 dot_color_1 btn_vi_1"
            data-flickity='{"imagesLoaded": 0,"adaptiveHeight": 1, "contain": 1, "groupCells": "100%", "dragThreshold" : 5, "cellAlign": "left","wrapAround": false,"prevNextButtons": false,"percentPosition": 1,"pageDots": false, "autoPlay" : 0, "pauseAutoPlayOnHover" : true, "rightToLeft": false }'
          >
            {featuredCategory.slice(0,6).map((item, index) => {
              return (
                <div
                  // style={{margin:5}}
                  key={index}
                  className="pin__wr_js col_ins col-lg-2 col-md-3 col-6 item pr oh"
                >
                  <div className="wrap_ins_img db pr oh">
                    <a href={`/allProducts/${item.category}`}>
                      <div
                        className="lazyload nt_bg_lz pr_lazy_img"
                        data-bgset={item.image}
                      ></div>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bottombanner;
