import axios from "axios";
import React from "react";
import {Helmet} from "react-helmet";
import { useState ,useRef} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import parse from "html-react-parser";
import ReactImageMagnify from "react-image-magnify";
// import ReactImageZoom from 'react-image-zoom';
import ReactDOM from "react-dom";

import {
  addToCart,
  decreaseQuant,
  increseQuant,
  viewCart,
} from "../Actions/cartAction";
import { API } from "../API";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import Popup from "./Popup";

function Producdetails() {
  const { id } = useParams();
  const history = useHistory();
  const myref= useRef(null)
  const [productDetailes, setproductDetailes] = useState({});
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const items = useSelector((state) => state.cart.cartItems);
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const handlePopUp = (type) => {
    setModalShow(true);
    setType(type);
  };
  useEffect(() => {
    async function getProduct() {
      const product = await axios.get(`${API}/api/product/${id}`);
      console.log(product, "PRODUCT");
      setproductDetailes(product.data.product);
      setImage(product.data.product.image);
    }
    getProduct();
  }, []);
  console.log(productDetailes, "PRODUCT DETAILS");

  function addCart(id, quantity) {
    dispatch(addToCart(id, quantity));
    setTimeout(() => {
      history.push("/cart");
    }, 1000);
  }
  function increaseQuntity(id) {
    dispatch(increseQuant(id));
  }
  function decreaseQuntity(id) {
    dispatch(decreaseQuant(id));
  }
  function createMarkup() {
    return { __html: productDetailes.description };
  }
  function handleSmImg(index) {
    let x = index;
    setIndex(x);
    const images=myref.current.children
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  }

  return (
    <div>
      <Helmet>
      <meta charset="UTF-8" />
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{productDetailes?.title}</title>
<meta property="og:title" content={productDetailes?.title} />
<meta property="og:type" content="website" />
<meta property="og:url" content={`/productDetails/${productDetailes?._id}`}></meta>
<meta name="description" content= {<div dangerouslySetInnerHTML={createMarkup()} /> }/>

<meta name="author" content="John Doe" />

            </Helmet>
      <Header />
      <Navigation active={productDetailes?.category} />
      <div id="nt_content">
        <div className="mb__100">
          <div className="pt__20 pb__20 lh__1">
            <div className="container">
              <div className="row al_center">
                <div className="col">
                  <nav className="sp-breadcrumb">
                    <a href="/">Home</a>
                    <i className="facl facl-angle-right"></i>
                    <a href={`/allProducts/${productDetailes?.category}`}>
                      {productDetailes?.category}
                    </a>
                    <i className="facl facl-angle-right"></i>
                    {productDetailes?.subCategory}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="container">

            <div className="fluid">
              <div className="thumb" ref={myref}>
                {image.map((item, index) => (
                  <img
                    src={item.url}
                    alt=""
                    key={index}
                    onMouseOver={() => handleSmImg(index)}
                  />
                ))}
              </div>

              <div className="fluid__image-container">
                <ReactImageMagnify
                  style={{ cursor: "default" }}
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: image[index]?.url,
                      // height:250,
                      sizes:
                        "(max-width: 540px) 100vw, (max-width: 1200px) 30vw, 360px",
                    },
                    largeImage: {
                      src: image[index]?.url,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImageContainerDimensions: {
                      width: "200%",
                      height: "100%",
                      // background:"#fff"
                    },
                    enlargedImageStyle: {
                      position: "absolute",
                      top: 0,
                      right: 0,
                    },
                    enlargedImagePosition: "beside",
                    shouldUsePositiveSpaceLens: true

                  }}
                />
              </div>

              <div className="fluid__instructions">
                <h1 className="product_title entry-title fs__16">
                  {productDetailes?.title}
                </h1>
                <div className="flex wrap fl_between al_center price-review">
                  <p className="price_range" id="price_ppr">
                    <del>Rs. {productDetailes?.price}</del>
                    <ins>Rs. {productDetailes?.sale_price}</ins>
                  </p>
                </div>
                <div>
                  {productDetailes != null && (
                    <div dangerouslySetInnerHTML={createMarkup()}></div>
                  )}
                </div>
                <div className="btn-atc atc-slide btn_des_1 btn_txt_3">
                  <div id="callBackVariant_ppr">
                    <div className="nt_cart_form variations_form variations_form_ppr">
                      <div className="variations_button in_flex column w__100 buy_qv_false">
                        <div className="butn">
                          <div
                            // className="quantity pr mr__10 order-1 qty__true d-inline-block"
                            // id="sp_qty_ppr"
                            className="quantity"
                          >
                            <div>
                              <button
                                onClick={() => {
                                  quantity > 1 && setQuantity(quantity - 1);
                                }}
                                type="button"
                                // className="minus db  pa pd__0 pl__15 tl l__0"
                              >
                                <i className="facl facl-minus"></i>
                              </button>
                            </div>

                            <div>
                              <input
                                value={quantity}
                                type="number"
                                className="input-text qty text tc "
                                name="quantity"
                              />
                            </div>
                            <div>
                              <button
                                onClick={() => {
                                  quantity >= 0 && setQuantity(quantity + 1);
                                }}
                                type="button"
                                // className="plus db cb pa pd__0 pr__15 tr r__0"
                              >
                                <i className="facl facl-plus"></i>
                              </button>
                            </div>

                          </div>
                          {/* <div className="nt_add_w ts__03 pa order-3">
                                    <a
                                      href="#"
                                      className="wishlistadd cb chp ttip_nt tooltip_top_left"
                                    >
                                      <span className="tt_txt">
                                        Add to Wishlist
                                      </span>
                                      <i className="facl facl-heart-o"></i>
                                    </a>
                                  </div> */}
                          <button
                            onClick={() =>
                              addCart(productDetailes._id, quantity)
                            }
                            disabled={quantity === 0}
                            type="submit"
                            data-time="6000"
                            data-ani="shake"
                            className=" button truncate w__100 mt__20  d-inline-block animated addtocart"
                            // single_add_to_cart_button  classname  remove
                          >
                            <span className="txt_add">Add to cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="extra-link mt__10 fwsb">
                  {productDetailes.delievery != undefined && (
                    <a
                      className="ajax_pp_js cd chp mr__20"
                      href="#"
                      data-id="#popup-delivery-and-return"
                      onClick={() => handlePopUp("delivery")}
                    >
                      Delivery &amp; Return
                    </a>
                  )}
                  <a
                    className="ajax_pp_js cd chp"
                    href="#"
                    data-id="#popup-ask-a-question"
                    onClick={() => handlePopUp("question")}
                  >
                    Ask a Question
                  </a>
                  <Popup
                    modelfor={type}
                    delievery={productDetailes.delievery}
                    productName={productDetailes.title}
                    id={productDetailes._id}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>

                <div className="product_meta">
                  <span className="sku_wrapper">
                    <span className="cb">SKU:</span>{" "}
                    <span className="sku value cg d-inline-block">
                      {productDetailes?.sku}
                    </span>
                  </span>
                  <span className="posted_in">
                    <span className="cb">Categories:</span>{" "}
                    <a href="shop-filter-options.html" className="cg">
                      All
                    </a>
                    ,{" "}
                    <a href="shop-filter-options.html" className="cg">
                      Best seller
                    </a>
                    ,{" "}
                    <a href="shop-filter-options.html" className="cg">
                      {productDetailes?.category}
                    </a>
                    {/* <a href="shop-filter-options.html" className="cg">
                              Dress
                            </a>
                            ,{" "}
                            <a href="shop-filter-options.html" className="cg">
                              New Arrival
                            </a>
                            ,{" "}
                            <a href="shop-filter-options.html" className="cg">
                              Women
                            </a> */}
                  </span>
                  <span className="tagged_as">
                    <span className="cb">Tags:</span>{" "}
                    {productDetailes.tags != undefined && (
                      <>
                        {productDetailes.tags.map((i) => (
                          <a href="shop-filter-options.html" className="cg">
                            {i}
                          </a>
                        ))}
                      </>
                    )}
                  </span>
                </div>

                <div className="social-share tc">
                  <div className="at-share-btn-elements kalles-social-media d-block text-left fs__0 lh__1">
                    <a
                      href="https://www.facebook.com/"
                      className="at-icon-wrapper at-share-btn at-svc-facebook bg-white kalles-social-media__btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="at-icon at-icon-facebook"
                      >
                        <g>
                          <path
                            d="M22 5.16c-.406-.054-1.806-.16-3.43-.16-3.4 0-5.733 1.825-5.733 5.17v2.882H9v3.913h3.837V27h4.604V16.965h3.823l.587-3.913h-4.41v-2.5c0-1.123.347-1.903 2.198-1.903H22V5.16z"
                            fill-rule="evenodd"
                          ></path>
                        </g>
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/"
                      className="at-icon-wrapper at-share-btn at-svc-twitter bg-white kalles-social-media__btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="at-icon at-icon-twitter"
                      >
                        <g>
                          <path
                            d="M27.996 10.116c-.81.36-1.68.602-2.592.71a4.526 4.526 0 0 0 1.984-2.496 9.037 9.037 0 0 1-2.866 1.095 4.513 4.513 0 0 0-7.69 4.116 12.81 12.81 0 0 1-9.3-4.715 4.49 4.49 0 0 0-.612 2.27 4.51 4.51 0 0 0 2.008 3.755 4.495 4.495 0 0 1-2.044-.564v.057a4.515 4.515 0 0 0 3.62 4.425 4.52 4.52 0 0 1-2.04.077 4.517 4.517 0 0 0 4.217 3.134 9.055 9.055 0 0 1-5.604 1.93A9.18 9.18 0 0 1 6 23.85a12.773 12.773 0 0 0 6.918 2.027c8.3 0 12.84-6.876 12.84-12.84 0-.195-.005-.39-.014-.583a9.172 9.172 0 0 0 2.252-2.336"
                            fill-rule="evenodd"
                          ></path>
                        </g>
                      </svg>
                    </a>
                    <a
                      href="https://www.google.com/gmail/about"
                      className="at-icon-wrapper at-share-btn at-svc-email bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="at-icon at-icon-email kalles-social-media__btn"
                      >
                        <g>
                          <g fill-rule="evenodd"></g>
                          <path d="M27 22.757c0 1.24-.988 2.243-2.19 2.243H7.19C5.98 25 5 23.994 5 22.757V13.67c0-.556.39-.773.855-.496l8.78 5.238c.782.467 1.95.467 2.73 0l8.78-5.238c.472-.28.855-.063.855.495v9.087z"></path>
                          <path d="M27 9.243C27 8.006 26.02 7 24.81 7H7.19C5.988 7 5 8.004 5 9.243v.465c0 .554.385 1.232.857 1.514l9.61 5.733c.267.16.8.16 1.067 0l9.61-5.733c.473-.283.856-.96.856-1.514v-.465z"></path>
                        </g>
                      </svg>
                    </a>
                    <a
                      href="https://www.pinterest.com/"
                      className="at-icon-wrapper at-share-btn at-svc-pinterest_share bg-white kalles-social-media__btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="at-icon at-icon-pinterest_share"
                      >
                        <g>
                          <path
                            d="M7 13.252c0 1.81.772 4.45 2.895 5.045.074.014.178.04.252.04.49 0 .772-1.27.772-1.63 0-.428-1.174-1.34-1.174-3.123 0-3.705 3.028-6.33 6.947-6.33 3.37 0 5.863 1.782 5.863 5.058 0 2.446-1.054 7.035-4.468 7.035-1.232 0-2.286-.83-2.286-2.018 0-1.742 1.307-3.43 1.307-5.225 0-1.092-.67-1.977-1.916-1.977-1.692 0-2.732 1.77-2.732 3.165 0 .774.104 1.63.476 2.336-.683 2.736-2.08 6.814-2.08 9.633 0 .87.135 1.728.224 2.6l.134.137.207-.07c2.494-3.178 2.405-3.8 3.533-7.96.61 1.077 2.182 1.658 3.43 1.658 5.254 0 7.614-4.77 7.614-9.067C26 7.987 21.755 5 17.094 5 12.017 5 7 8.15 7 13.252z"
                            fill-rule="evenodd"
                          ></path>
                        </g>
                      </svg>
                    </a>
                    <a
                      href="https://www.messenger.com/"
                      className="at-icon-wrapper at-share-btn at-svc-messenger bg-white kalles-social-media__btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="at-icon at-icon-messenger"
                      >
                        <g>
                          <path
                            d="M16 6C9.925 6 5 10.56 5 16.185c0 3.205 1.6 6.065 4.1 7.932V28l3.745-2.056c1 .277 2.058.426 3.155.426 6.075 0 11-4.56 11-10.185C27 10.56 22.075 6 16 6zm1.093 13.716l-2.8-2.988-5.467 2.988 6.013-6.383 2.868 2.988 5.398-2.987-6.013 6.383z"
                            fill-rule="evenodd"
                          ></path>
                        </g>
                      </svg>
                    </a>
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

export default Producdetails;
