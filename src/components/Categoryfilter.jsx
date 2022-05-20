import React from "react";
import Pdata from "./Pdata"
import { useParams } from "react-router-dom";
import { API } from "../API";
import axios from "axios";

function Categoryfilter({setProducts,isCategory}) {
  const { subCategory,category } = useParams();

  const handleCheckBox =  async (min, max)=>{
    if(!isCategory)
   {
      const res = await axios.post(`${API}/api/product/applyFilter/${category}/${subCategory}`,{lowValue:min, highValue:max});
     setProducts(res.data.product)
     }
     else
     {
      const res = await axios.post(`${API}/api/product/applyFilter/${category}`,{lowValue:min, highValue:max});
      setProducts(res.data.product)
     }

  }
  return (
    <div class="js_sidebar sidebar sidebar_nt col-lg-3 col-12 space_30 hidden_false lazyload">
      <div
        id="kalles-section-sidebar_shop"
        class="kalles-section nt_ajaxFilter section_sidebar_shop type_instagram"
      >
        <div class="h3 mg__0 tu bgb cw visible-sm fs__16 pr">
          Sidebar<i class="close_pp pegk pe-7s-close fs__40 ml__5"></i>
        </div>
        <div class="cat_shop_wrap">
          <div class="cat_fixcl-scroll">
            <div class="cat_fixcl-scroll-content css_ntbar">
              <div class="row no-gutters wrap_filter">
                <div class="col-12 col-md-12 widget widget_product_categories cat_count_false">
                  <div class="col-12 col-md-12 widget">
                    <h5 class="widget-title">Filter by price</h5>
                    <div class="loke_scroll">
                      <ul class="nt_filter_block nt_filter_styleck css_ntbar">
                         
                      {Pdata.map((item)=>
                        <li style={{display:"flex", alignItems:"center", textAlign:"left"}}>
                          <input type="radio" id={item._id} name="50-100" value={item._id}
                            aria-label="Narrow selection to products matching tag price Rs. 50-Rs. 100" onChange={e => handleCheckBox(item.min, item.max)} style={{border:"none", textDecoration:"none"}}
                          />
                          <label for={item._id} style={{paddingLeft:"13px" , color:"black" , "hover":{color: "#efefef"}}}> {item.text===undefined ?<> Rs. {item.min}- {item.max!=undefined ?<>Rs. {item.max}</>:<>above</>}</>:<>{item.text}</>}</label>
                        </li>
                      )}

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categoryfilter;
