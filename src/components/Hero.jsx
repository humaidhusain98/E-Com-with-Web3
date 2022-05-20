import React from "react";
import { useEffect } from "react";

let featured = JSON.parse(localStorage.getItem("Featured"));
console.log(featured);
function Hero() {
  return (
    <div className="kalles-section nt_section type_slideshow type_carousel kalles-cosmetics__main-slide">
      <div className="kalles-cosmetics__main-slide nt_full se_height_cus_h nt_first">
        <div
          className="fade_flick_1 slideshow row no-gutters equal_nt nt_slider js_carousel prev_next_0 btn_owl_1 dot_owl_2 dot_color_3 btn_vi_2"
          data-flickity='{ "fade":0,"cellAlign": "center","imagesLoaded": 0,"lazyLoad": 0,"freeScroll": 0,"wrapAround": true,"autoPlay" :true ,"pauseAutoPlayOnHover" : true, "rightToLeft": false, "prevNextButtons": true,"pageDots": true, "contain" : 1,"adaptiveHeight" : 1,"dragThreshold" : 5,"percentPosition": 1 }'
        >
          {featured?.map((item, index) => {
            return (
              <div
                key={index}
                className="col-12 slideshow__slide kalles-cosmetics__main-slide__layout-01"
              >
                <div className="oh pr nt_img_txt bg-transparent">
                  <div className="js_full_ht4 img_slider_block dek_img_slide">
                    <div
                      className="bg_rp_norepeat bg_sz_cover lazyload item__position center center img_tran_ef pa l__0 t__0 r__0 b__0"
                      data-bgset={item?.featured?.image}
                    ></div>
                  </div>
                  <div className="js_full_ht4 img_slider_block mb_img_slide">
                    <div
                      className="bg_rp_norepeat bg_sz_cover lazyload item__position center center img_tran_ef pa l__0 t__0 r__0 b__0"
                      data-bgset={item?.featured?.image}
                    ></div>
                  </div>
                  <div className="caption-wrap caption-w-1 pe_none z_100 tl_md tc">
                    <div className="pa_txts caption">
                      <div className="left_right">

                        <div className="slt4_space kalles-cosmetics__main-slide-01__br-02"></div>
                        <h3 className="slt4_h3 lh__1 mg__0 kalles-cosmetics__main-slide-01__title">
                          {item?.featured?.name}
                        </h3>
                        <div className="slt4_space kalles-cosmetics__main-slide-01__br-02"></div>
                        <a
                          className="slt4_btn button pe_auto round_false btn_icon_false kalles-cosmetics__main-slide-01__btn"
                          href={`/product/${item.title.replace(/\s+/g, '-').toLowerCase()}/${item?._id}`}
                        >
                          SHOP NOW
                        </a>
                      </div>
                    </div>
                  </div>
                  <a
                    href="shop.html"
                    className="pa t__0 l__0 b__0 r__0 pe_none"
                  ></a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Hero;
