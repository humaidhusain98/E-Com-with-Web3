import React, { useEffect } from "react";
import axios from "axios";
import { API } from "../API";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Navigation({ active }) {
  let [category, setCategory] = useState([]);

  useEffect(() => {
    async function getCategory() {
      let categories = await axios.get(`${API}/api/category`);
      localStorage.setItem("category", JSON.stringify(categories?.data));
      setCategory(categories?.data);
    }

    getCategory();
  }, []);

  return (
    <div id="ntheader" className="ntheader header_4 h_icon_iccl">
      <div className="ntheader_wrapper pr z_200">
        <div className="container">
          <div className="header__bot border_true dn db_lg">
            <nav className="nt_navigation tc hover_side_up nav_arrow_false">
              <ul id="nt_menu_id" className="nt_menu in_flex wrap al_center">
                {category.map((cate, index) => {
                  return (
                    <li
                      key={index}
                      className="type_mega menu_wid_cus menu-item has-children menu_has_offsets menu_center pos_center"
                    >
                      <div class="dropdown type_mn_link menu-item sub-column-item col-3">
                        <a
                          href={`/allProducts/${cate.category.replace(/\s+/g, '-')}`}
                          style={{ color: "black", whiteSpace: "nowrap" }}
                        >
                          {cate.category === active ? (
                            <strong>{cate.category}</strong>
                          ) : (
                            cate.category
                          )}
                        </a>

                        <div class="dropdown-content">
                          {cate.subCategory.map((subcate) => {
                            return (
                              <a
                                href={`/shop/${cate.category.replace(/\s+/g, '-')}/${subcate.category.replace(/\s+/g, '-')}`}

                              >
                                {subcate.category}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}
                {/* {category !=undefined &&
                <>
                 <li

                      className="type_mega menu_wid_cus menu-item has-children menu_has_offsets menu_center pos_center"
                    >
                      <a
                          href={`/onlineconsultation`}
                          // className="lh__1 flex al_center pr kalles-lbl__nav-sale"

                        >

                         <strong>   Online Consultation </strong>

                        </a>

                    </li>
                    <li

                      className="type_mega menu_wid_cus menu-item has-children menu_has_offsets menu_center pos_center"
                    >
                      <a
                          href={`/blogs`}
                          // className="lh__1 flex al_center pr kalles-lbl__nav-sale"

                        >

                         <strong>Blogs</strong>

                        </a>

                    </li>
                    </>
                    } */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
