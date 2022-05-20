import axios from "axios";
import React from "react";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { API } from "../API";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";

function Checkout() {
  const items = useSelector((state) => state.cart.cartItems);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [appartment, setAppartment] = useState("");
  const [city, setCity] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [total, setTotal] = useState("");
  const [checked, setChecked] = useState(false);
  const [country, setCountry] = useState("India");
  const[discount,setDiscount]=useState(null)
  const[code,setCoupon]=useState("")
  const[amountOff,setAmountOff]=useState(0)
  const[freeShipping,setFreeShipping]=useState(false)




  const [shipping, setShipping] = useState(0)

 useEffect(()=>{
   if(country.length>0&&state.length>0)
   getShipmentPrice()
 },[country,state])
 const getShipmentPrice=async()=>{
  const res = await axios.post(`${API}/api/shipment/get_shipping_price`,
    {
      country,
      state
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    }
  )
!freeShipping &&
  setShipping(res.data.data)

 }
  let cartItem = [];
  let totalPrice = 0;
  let totalQuantity = 0;
  let product = [];
  const token = localStorage.getItem("token");
  const history = useHistory();
  const alert = useAlert();
  if (Array.isArray(items)) {
    cartItem = items;
  } else {
    cartItem = items?.cartItems;
  }
  console.log("cartItem", cartItem)
  cartItem?.map((item) => {
    item.product
      ? (totalPrice += item.quantity * 1 * item.product.sale_price + ((item.product.sale_price) * (item.product.tax.tax) / 100))
      : (totalPrice += item.quantity * 1 * item.sale_price + ((item.sale_price) * (item.tax.tax) / 100));

    totalQuantity += item.quantity * 1;

    product.push({
      title: item.product ? item.product?.title : item.title,
      quantity: item.quantity,
      price: item.product ? item.product?.sale_price : item.sale_price,
      image: item.product ? item.product?.featuredImage : item.featuredImage,
      totalPrice:
        item.quantity * 1 * item.product
          ? item.product?.sale_price
          : item.sale_price * 1,
      tax: item.product ? item.product?.tax : item.tax,
      id:item.product?item.product?._id:item._id,
      category:item.product?item.product?.category:item.category
    });
  });
  const applyCoupon=async()=>{
    const res=await axios.post(`${API}/api/coupons/applyCoupon`,
      {
        totalPrice,product,code
      },
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
    if(res.data.status=="success")
    {
     alert.show(res.data.message, { type: "success" });

    if(res.data.message!="Free shipping applied")
    {
    setDiscount(res.data.data)
    setAmountOff(res.data.data)
    }
    else
    {
    setFreeShipping(true)
    setDiscount(null)
    setAmountOff(0)
    setShipping(0)
    }

    }
    else
    {
    alert.show(res.data.message, { type: "error" });
    setCoupon("")
    setDiscount(null)
    setAmountOff(0)
    }
  }

  let data = {

    firstName,
    lastName,
    email,
    phone,
    pinCode,
    company,
    state,
    country,
    address,
    appartment,
    city,
    orderNote,
    product,
    shipping,
    amountOff,
    couponCode:code,
    Amount: totalPrice,
    totalQuantity: totalQuantity,

  };


  async function handleOrder() {


    if (
      !firstName ||
      !email ||
      !address ||
      !phone ||
      !city ||
      !state ||
      !pinCode ||
      !country
    ) {
      return alert.show("please fill all the fields", { type: "error" });
    }
    if (phone.length < 10 || phone.length > 10)
    return alert.show("Please Fill Valid Mobile No", { type: "error" });
    if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    )
      return alert.show("Please Fill Valid Email Address", { type: "error" });
    else {
      if (!checked) {
        alert.show("Please Accept Terms & Conditions", { type: "error" });
      } else {
        if (!token) {
          alert.show("Please Login To Proceed", { type: "error" });
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        } else {
          const order = await axios.post(`${API}/api/order/add_order`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const orderID = order.data.orderId;
          history.push(`/payment/${orderID}`);
        }
      }
    }
  }

  return (
    <div>
      <Header />
      <Navigation />
      <div id="nt_content">
        <div className="kalles-section page_section_heading">
          <div className="page-head tc pr oh page_bg_img page_head_cart_heading">
            <div
              className="parallax-inner nt_parallax_false nt_bg_lz pa t__0 l__0 r__0 b__0 lazyload"
              data-bgset="assets/images/shopping-cart/shopping-cart-head.jpg"
            ></div>
            <div className="container pr z_100">
              <h1 className="tu mb__10 cw">Checkout</h1>
            </div>
          </div>
        </div>

        <div className="kalles-section cart_page_section container mt__60">
          <div className="frm_cart_page check-out_calculator">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-7">
                <div className="checkout-section">
                  <h3 className="checkout-section__title">Billing details</h3>
                  <div className="row">
                    <p className="checkout-section__field col-lg-6 col-12">
                      <label for="f-name">First name*</label>
                      <input
                        type="text"
                        id="f-name"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                      />
                    </p>
                    <p className="checkout-section__field col-lg-6 col-12">
                      <label for="l-name">Last name</label>
                      <input
                        type="text"
                        id="l-name"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                      />
                    </p>
                    <p className="checkout-section__field col-12">
                      <label for="company">Company name (optional)</label>
                      <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </p>
                    <p className="checkout-section__field col-12">
                      <label for="address_country_ship_2">
                        Country / Region*
                      </label>
                      <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)}
                      />
                    </p>
                    <p className="checkout-section__field col-12">
                      <label for="address_01">Street address *</label>
                      <input
                        type="text"
                        id="address_01"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mb__20"
                        placeholder="House number and street name"
                      />
                      <input
                        value={appartment}
                        onChange={(e) => setAppartment(e.target.value)}
                        type="text"
                        id="address_02"
                        placeholder="Apartment, suite, unit, etc. (optional)"
                      />
                    </p>
                    <p className="checkout-section__field col-12">
                      <label for="address_03">Town / City*</label>
                      <input
                        type="text"
                        id="address_03"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </p>
                    <p className="checkout-section__field col-12">
                      <label
                        for="address_province_ship"
                        id="address_province_label"
                      >
                        State*
                      </label>
                      <RegionDropdown
                        country={country}
                        value={state}
                        onChange={(val) => setState(val)}
                      />
                    </p>
                    <p className="checkout-section__field col-12">
                      <label for="address_zip_ship_2">Postal/Zip Code*</label>
                      <input
                        type="text"
                        id="address_zip_ship_2"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </p>
                    <p className="checkout-section__field col-12">
                      <label for="address_phone">Phone*</label>
                      <input
                      placeholder="Enter Mobile Number"
                        type="text"
                        id="address_phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </p>
                    <p className="checkout-section__field col-12">
                      <label for="address_amail">Email*</label>
                      <input
                      placeholder="Enter Email"
                        type="text"
                        id="address_amail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </p>
                  </div>
                </div>
                {/* <div className="checkout-section">
                  <h3 className="checkout-section__title">Shipping Details</h3>
                  <div className="row">
                    <p className="checkout-section__field col-12">
                      <label for="order_comments" className="">
                        Order notes (optional)
                      </label>
                      <textarea
                        id="order_comments"
                        name="order_comments"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        rows="2"
                        cols="5"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                      ></textarea>
                    </p>
                  </div>
                </div> */}
              </div>
              <div className="col-12 col-md-6 col-lg-5 mt__50 mb__80 mt-md-0 mb-md-0">
                <div className="order-review__wrapper">
                  <h3 className="order-review__title">Your order</h3>
                  <div className="checkout-order-review">
                    <table className="checkout-review-order-table">
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItem?.map((item, index) => {
                          return (
                            <tr key={index} className="cart_item">
                              <td className="product-name">
                                {item.product
                                  ? item.product?.title
                                  : item.title}
                                <strong className="product-quantity">
                               ({item.product? item.product?.sale_price
                                  : item.sale_price} × {item.quantity})
                                </strong>
                              </td>
                              <td className="product-total">
                                <span className="cart_price">
                                  Rs.{" "}
                                  {item.product
                                    ? item.product?.sale_price*item.quantity
                                    : item.sale_price*item.quantity}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <label
                          for="couponcode"
                          className="cart-couponcode__label db cd mt__20 mb__10"
                        >
                          Coupon:
                        </label>
                        <div style={{width:50}}>
                          <input
                            type="text"
                            name="discount"
                            id="couponcode"
                            value={code}
                            placeholder="Coupon Code"
                            class="w-50"
                            onChange={(e)=>setCoupon(e.target.value)}
                          />
                          </div>
                          <button
                            style={{marginTop:10}}
                            onClick={applyCoupon}
                            type="button"

                          >
                            Apply
                          </button>

                        <tr className="cart-subtotal cart_item">
                          <th>Subtotal <strong>(Inclusive of Taxes)</strong></th>
                          <td>
                            <span className="cart_price">Rs. {totalPrice.toFixed(2)}</span>
                          </td>
                        </tr>
                        {/* {discount!=null || freeShipping ?
                        <tr className="cart-subtotal cart_item">
                          <th>Coupon Code</th>
                          <td>
                            <span className="cart_price">{code}</span>
                          </td>
                        </tr>:""} */}
                        {discount!=null?
                        <tr className="cart-subtotal cart_item">
                          <th>Discount</th>
                          <td>
                            <span className="cart_price">Rs. {amountOff.toFixed(2)}</span>
                          </td>
                        </tr>:""}

                        <tr className="cart_item">
                          <th>Shipping</th>
                          <td>
                            <span className="cart_price">Rs. {shipping}.00</span>
                          </td>
                        </tr>


                        <tr className="order-total cart_item">
                          <th>Total</th>
                          <td>
                            <strong>
                              <span className="cart_price amount">
                                Rs. {(totalPrice-amountOff+shipping).toFixed(2)}
                              </span>
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="checkout-payment">
                      <p className="checkout-payment__policy-text">
                        Your personal data will be used to process your order,
                        support your experience throughout this website, and for
                        other purposes described in our
                        <a href="#">privacy policy</a>.
                      </p>
                      <label className="checkout-payment__confirm-terms-and-conditions">
                        <input
                          type="checkbox"
                          name="terms"
                          id="terms"
                          onChange={(e) => setChecked(e.target.checked)}
                        />
                        <span>
                          I have read and agree to the website{" "}
                          <a href="#" className="terms-and-conditions-link">
                            terms and conditions
                          </a>
                        </span>
                        &nbsp;<span className="required">*</span>
                      </label>

                      <button
                        onClick={handleOrder}
                        type="button"
                        className="button button_primary btn checkout-payment__btn-place-order"
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
