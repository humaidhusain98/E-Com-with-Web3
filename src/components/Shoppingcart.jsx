import React from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addToCart,
  decreaseQuant,
  increseQuant,
  removeFromCart,
} from "../Actions/cartAction";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import Shopbanner from "./Shopbanner";

function Shoppingcart() {
  const [checked, setChecked] = useState(false);
  const items = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  let cartItem = null;
  if (Array.isArray(items)) {
    cartItem = items;
  } else {
    cartItem = items?.cartItems;
  }

  function increaseQuntity(id) {
    dispatch(increseQuant(id));
  }

  function decreaseQuntity(id) {
    dispatch(decreaseQuant(id));
  }
  function handleDelete(id) {
    dispatch(removeFromCart(id));
  }

  function handleCheckout() {
    if (!checked) {
      alert.show("Please Accept Terms & Conditions", { type: "error" });
    }
    else if(!token){

        alert.show("Please Login To Proceed", { type: "error" });
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      }

    else {
      history.push("/checkout");
    }
  }
  return (
    <div>
      <Header />
      <Navigation />
      <Shopbanner />
      <div id="nt_content">
        {cartItem!=null?
        <>
      {cartItem.length>0 ?
        <div class="kalles-section cart_page_section container mt__60">
          <form
            action="#"
            method="post"
            class="frm_cart_ajax_true frm_cart_page nt_js_cart pr oh "
          >
            <div class="cart_header" style={{marginBottom:20}}>
              <div class="row al_center">
                <div class="col-5">Product</div>
                <div class="col-3 tc">Price</div>
                <div class="col-2 tc">Quantity</div>
                <div class="col-2 tc tr_md">Total</div>
              </div>
            </div>

            {cartItem.map((item, index) => {
              return (
                <div key={index} class="cart_items js_cat_items" style={{marginBottom:20}}>
                  <div class="cart_item js_cart_item">
                    <div class="ld_cart_bar"></div>
                    <div class="row al_center">
                      <div class="col-12 col-md-12 col-lg-5">
                        <div class="page_cart_info flex al_center">
                          <a href={ item.product ? `/${item.title}/${item.product?._id}`:
                          `/${item.title}/${item._id}`
                        }>
                            <img
                               class="lazyload w__100 lz_op_ef"
                               style={{width:150,height:150}}
                              src={
                                item.product ? item.product?.featuredImage : item.featuredImage
                              }
                              data-src={
                                item.product ? item.product?.featuredImage : item.featuredImage
                              }
                            />
                          </a>
                          <div class="mini_cart_body ml__15">
                            <h5 class="mini_cart_title mg__0 mb__5">
                            <a href={ item.product ? `/product/${item.product?.title.replace(/\s+/g, '-').toLowerCase()}/${item.product?._id}`:
                          `/product/${item.title.replace(/\s+/g, '-').toLowerCase()}/${item._id}`
                        }>
                                {item.product
                                  ? item.product?.title
                                  : item.title}
                              </a>
                            </h5>
                            <div class="mini_cart_meta">
                              <p class="cart_selling_plan"></p>
                            </div>
                            <div class="mini_cart_tool mt__10">
                              <a
                              style={{cursor:'pointer'}}
                                onClick={() => handleDelete( item.product ? item.product?._id : item._id)}
                                class="cart_ac_remove js_cart_rem ttip_nt tooltip_top_right"
                              >
                                <span class="tt_txt">Remove this item</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 col-lg-3 tc__ tc_lg">
                        <div class="cart_meta_prices price">
                          <div class="cart_price">
                            RS.{" "}
                            {item.product
                              ? item.product?.sale_price
                              : item.sale_price}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 col-lg-2 tc mini_cart_actions">
                        <div class="quantity pr mr__10 qty__true">
                          <input
                            type="number"
                            class="input-text qty text tc"
                            name="updates[]"
                            value={item.quantity}
                          />
                          <div class="qty tc fs__14">
                            <button
                              onClick={() =>

                                increaseQuntity(
                                  item.product ? item.product?._id : item._id
                                )
                              }
                              type="button"
                              class="plus db cb pa pd__0 pr__15 tr r__0"
                            >
                              <i class="facl facl-plus"></i>
                            </button>
                            <button
                              onClick={() =>
                                decreaseQuntity(
                                  item.product ? item.product?._id : item._id
                                )
                              }
                              type="button"
                              class="minus db cb pa pd__0 pl__15 tl l__0 qty_1"
                            >
                              <i class="facl facl-minus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 col-lg-2 tc__ tr_lg">
                        <span class="cart-item-price fwm cd js_tt_price_it">
                          Rs.{" "}
                          {item.product
                            ? item.product?.sale_price * item.quantity
                            : item.sale_price * 1 * item.quantity * 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}



            <div class="cart__footer mt__60">
              <div class="row">
                <div class="col-12 col-md-6 cart_actions tl_md tc order-md-2 order-2 mb__50">
                  <label
                    for="CartSpecialInstructions_2"
                    class="cart-note__label dib cd mb__10"
                  >
                    <span class="txt_add_note ">Add Order Note</span>
                    <span class="txt_edit_note dn">Edit Order Note</span>
                  </label>
                  <textarea
                    name="note"
                    id="CartSpecialInstructions_2"
                    class="cart-note__input"
                    placeholder="How can we help you?"
                  ></textarea>
                  {/* <label
                    for="couponcode"
                    class="cart-couponcode__label db cd mt__20 mb__10"
                  >
                    Coupon:
                  </label>
                  <p>Coupon code will work on checkout page</p>
                  <input
                    type="text"
                    name="discount"
                    id="couponcode"
                    placeholder="Coupon Code"
                    class="w-50"
                  /> */}
                </div>
                <div class="col-12 tr_md tc order-md-4 order-4 col-md-6">
                  <div class="total row in_flex fl_between al_center cd fs__18 tu">
                    <div class="col-auto">
                      <strong>Subtotal:</strong>
                    </div>
                    <div class="col-auto tr js_cat_ttprice fs__20 fwm">
                      <div class="cart_tot_price">Rs. {totalPrice ?totalPrice :""}</div>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                  <p class="db txt_tax_ship mb__5">
                    Taxes, shipping and discounts codes calculated at checkout
                  </p>
                  <p class="pr dib mb__5">
                    <input
                      type="checkbox"
                      id="cart_agree_2"
                      class="js_agree_ck mr__5"
                      name="ck_lumise"
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                    <label for="cart_agree_2">
                      I agree with the terms and conditions.
                    </label>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 20l-7-7 3-3 4 4L19 4l3 3z"></path>
                    </svg>
                  </p>
                  <div class="clearfix"></div>

                  <button
                    onClick={handleCheckout}
                    style={{
                      backgroundColor: "#56cfe1",
                      border: "1px solid #56cfe1",
                      width: "50%",
                      marginTop: "2rem",
                      color: "white",
                    }}
                    type="button"
                    // className="button button_primary btn checkout-payment__btn-place-order"
                  >
                    Check Out
                  </button>

                  <div class="clearfix"></div>
                  {/* <div class="cat_img_trust mt__10">
                    <img
                      class="lz_op_ef lazyload w-50"
                      src="data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20476%2052%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3C%2Fsvg%3E"
                      data-src="assets/images/shopping-cart/cart_image.png"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </form>
          {/* <div
            class="shipping_calculator shipping_calc_page row al_center fl_center mt__60 mt-md-0"
            style={{
              position: "relative",
              border: "1px solid #e3e3e3",
              padding: "50px 10px",
            }}
          >

            <h2
              class="mg__0 tc mt__20 mb__20 col-auto truncate"
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                margin: 0,
                padding: "0 14px 0 18px",
                transform: "translate(-50%, -50%)",
                background: "#fff",
                whiteSpace: "nowrap",
                display: "inlineBlock",
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              Estimate Shipping
            </h2>
            <p class="field col-lg-3 col-md-4 col-12">
              <label for="address_country_ship_2">Country</label>
              <select id="address_country_ship_2">
                <option value="">---</option>
                <option value="United States" selected="">
                  United States
                </option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Italy">Italy</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Australia">Australia</option>
                <option value="Finland">Finland</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
                <option value="Brazil">Brazil</option>
                <option value="Canada">Canada</option>
                <option value="Chile">Chile</option>
                <option value="Cuba">Cuba</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Japan">Japan</option>
              </select>
            </p>
            <p
              class="field col-lg-3 col-md-4 col-12"
              id="address_province_container_ship"
            >
              <label for="address_province_ship" id="address_province_label">
                Province
              </label>
              <select id="address_province_ship">
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="Armed Forces Americas">
                  Armed Forces Americas
                </option>
                <option value="Armed Forces Europe">Armed Forces Europe</option>
                <option value="Armed Forces Pacific">
                  Armed Forces Pacific
                </option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="District of Columbia">Washington DC</option>
                <option value="Federated States of Micronesia">
                  Micronesia
                </option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Guam">Guam</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Northern Mariana Islands">
                  Northern Mariana Islands
                </option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Palau">Palau</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas" selected="">
                  Texas
                </option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virgin Islands">U.S. Virgin Islands</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </select>
            </p>
            <p class="field col-lg-3 col-md-4 col-12">
              <label for="address_zip_ship_2">Postal/Zip Code</label>
              <input type="text" id="address_zip_ship_2" />
            </p>
            <p class="field col-lg-3 col-md-6 col-12 mg__0">
              <input
                type="button"
                class="get_rates button"
                value="Calculate Shipping"
                style={{
                  backgroundColor: "#56cfe1",
                  border: "1px solid #56cfe1",
                }}
              />
            </p>
          </div> */}
        </div>
        :<div className="text-center p-3 m-3">
            <h3>No product added in cart</h3>
            </div>
            }
            </>
            :""
          }

      </div>
      <Footer />
    </div>
  );
}

export default Shoppingcart;
