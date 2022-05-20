import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewWishlist } from "../Actions/wishlishAction";
import { Hidden } from '@material-ui/core'
import { API } from "../API";
import Cartpopup from "./Cartpopup";
import Popform from "./Popform";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "../../node_modules/reactjs-popup/dist/index.css";
import {
  Container,
  Grid,
  makeStyles,
  CircularProgress,
  Card,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Avatar,
} from "@material-ui/core";
const useStyles = makeStyles(() => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    position: "relative",
    width: "100%",
    height: "max-content",
  },

  input: {
    marginLeft: 2,
    flex: 1,
  },

  listbox: {
    width: "100%",
    margin: 0,
    padding: 0,
    zIndex: 100000,
    position: "absolute",
    top: "40px",
    left: 0,
    listStyle: "none",
    backgroundColor: " #fff",
    overflow: "auto",
    maxHeight: 300,
    height: "auto",
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)",
  },
  list: {
    '&:hover': {
      backgroundColor: '#dddfe2'

    },
  }
}));

function Header() {
  const classes = useStyles();
  let [configuration, setConfiguration] = useState([]);
  let [address, setAddress] = useState([]);
  let [featuredProd, setFeaturedProd] = useState([]);
  const [account, setAccount] = useState(false);
  let [logo, setLogo] = useState("");
  let [facebookUrl, setfacebookUrl] = useState("");
  let [instagramUrl, setinstagramUrl] = useState("");
  let [twiiterUrl, settwiiterUrl] = useState("");
  let [linkedinUrl, setlinkedinUrl] = useState("");
  let [category, setCategory] = useState([]);
  const [sub, setSub] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [searchlist, setSearchList] = useState([]);
  const [scrollText, setScrollText] = useState("")

  useEffect(() => {
    dispatch(viewWishlist());
  }, []);
  useEffect(() => {
    async function getCategory() {
      let categories = await axios.get(`${API}/api/category`);
      setCategory(categories?.data);
    }

    getCategory();
  }, []);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  let totalWishListQuantity = 0
  totalWishListQuantity = useSelector(
    (state) => state.wishlist.totalQuantity
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getFeatured() {
      const Product = await axios.get(`${API}/api/product`);
      const featuredProduct = Product.data.data.filter((item) => {
        return item.featured.status;
      });
      localStorage.setItem("Featured", JSON.stringify(featuredProduct));
    }
    async function getConfig() {
      const config = await axios.get(`${API}/api/config`);
      localStorage.setItem(
        "configuration",
        JSON.stringify(config?.data.result[0])
      );
      setLogo(config?.data.result[0].logo);
      setScrollText(config?.data.result[0].scrollText);
      setfacebookUrl(config?.data.result[0].socialMedia[0].facebook);
      setinstagramUrl(config?.data.result[0].socialMedia[0].instagram);
      settwiiterUrl(config?.data.result[0].socialMedia[0].twitter);
      setlinkedinUrl(config?.data.result[0].socialMedia[0].linkedin);

    }
    getConfig();
    getFeatured();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  useEffect(() => {
    getSearchResult();
  }, [keyword]);

  async function getSearchResult() {
    // if (keyword.length > 0) {
    let res = await axios.get(`${API}/api/product/search?keyword=${keyword}`);
    setSearchList(res.data.searchResult);
    // }
  }

  return (
    <>
      {/* <Toplabel /> */}
      <div id="kalles-section-header_top" class="kalles-section">
        <div class="h__top bgbl pt__10 pb__10 fs__12 flex fl_center al_center">
          <marquee behavior="scroll" direction="left">{scrollText}</marquee>
        </div>
      </div>
      <div className="header__mid" >
        <div className="container">
          <div className="row al_center css_h_se">
            <div className="col-lg-3 col-md-3 col-1">
              <a
                href="#"
                data-id="#nt_menu_canvas"
                className="push_side push-menu-btn dn_lg lh__1 flex al_center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="16"
                  viewBox="0 0 30 16"
                >
                  <rect width="30" height="1.5"></rect>
                  <rect y="7" width="20" height="1.5"></rect>
                  <rect y="14" width="30" height="1.5"></rect>
                </svg>
              </a>
              <div className="dn db_lg cus_txt_h">
                <div className="nt-social">
                  <a
                    href={facebookUrl}
                    className="facebook cb ttip_nt tooltip_top_right"
                  >
                    <span className="tt_txt">Follow on Facebook</span>
                    <i className="facl facl-facebook"></i>
                  </a>
                  <a
                    href={twiiterUrl}
                    className="twitter cb ttip_nt tooltip_top_right"
                  >
                    <span className="tt_txt">Follow on Twitter</span>
                    <i className="facl facl-twitter"></i>
                  </a>
                  <a
                    href={instagramUrl}
                    className="instagram cb ttip_nt tooltip_top_right"
                  >
                    <span className="tt_txt">Follow on Instagram</span>
                    <i className="facl facl-instagram"></i>
                  </a>
                  <a
                    href={linkedinUrl}
                    className="linkedin cb ttip_nt tooltip_top_right"
                  >
                    <span className="tt_txt">Follow on Linkedin</span>
                    <i className="facl facl-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    className="pinterest cb ttip_nt tooltip_top_right"
                  >
                    <span className="tt_txt">Follow on Pinterest</span>
                    <i className="facl facl-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-3 tc"
              style={{ textAlign: "right" }}
            >
              <div className="branding ts__05 lh__1">
                <a className="dib" href="/">
                  <img
                    className="w__100 logo_normal dn db_lg max-width__160px"
                    src={logo[0]?.Headerlogo}
                  />
                  <img
                    className="w__100 logo_sticky dn max-width__160px"
                    src={logo[0]?.Headerlogo}
                  />
                  <img
                    className="w__100 logo_mobile dn_lg max-width__50px"
                    src={logo[0]?.Headerlogo}
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-8 tr fl_right">
              <div className="nt_action in_flex al_center cart_des_1 header_right" style={{ padding: "0px" }}>
                {show === true ? (
                  <div
                    class="frm_search_input pr oh col"
                    className={classes.search}
                  >
                    <input
                      class="search_header__input js_iput_search"
                      style={{ borderRadius: "0px", paddingRight: "20px" }}
                      autocomplete="off"
                      type="text"
                      name="q"
                      value={keyword}
                      placeholder="Search for products"
                      onChange={(e) => setKeyword(e.target.value)}
                    // className={classes.input}
                    />
                    <button
                      class="search_header__submit js_btn_search use_jsfull hide_  pe_none"
                      type="submit"
                    >
                      <i class="iccl iccl-search"></i>
                    </button>

                    {searchlist.length > 0 ? (
                      <ul className={classes.listbox}>
                        {searchlist.map((option, index) => (
                          <Link to={`/productdetails/${option._id}`}>
                            <li className={classes.list}>
                              <Container style={{ paddingTop: 20 }}>
                                <Grid container spacing={3}>
                                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <img
                                      src={option.featuredImage}
                                    // width={200}
                                    // height={200}
                                    />
                                  </Grid>
                                  <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                                    <Typography
                                      style={{ fontWeight: "bolder" }}
                                      align="center"
                                      noWrap
                                    >
                                      {option.title}
                                    </Typography>
                                  </Grid>

                                  {/* <Grid item xs={12}>
                                    <hr />
                                    </Grid> */}
                                </Grid>
                              </Container>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <a
                    // className="icon_search push_side cb chp"
                    onClick={() => setShow(true)}
                    data-id="#nt_search_canvas"
                    href="#"
                  >
                    <i className="iccl iccl-search" style={{ paddingRight: "10px" }}></i>
                  </a>
                )}

                {token ? (
                  <>
                    <Popup
                      trigger={
                        <a href="#" data-id="#nt_login_canvas">
                          <i className="iccl iccl-user" style={{ paddingRight: "10px" }}></i>
                        </a>
                      }
                      position="bottom center"
                      on="hover"
                    >
                      <div>
                        <ul
                          className="profilelista"
                          style={{
                            listStyle: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                          }}

                        >
                          <li style={{ marginTop: "1.5rem" }}>
                            <a href="/my-orders"  > My Orders</a>
                          </li>
                          <li style={{ marginTop: "1.5rem" }}>
                            {" "}
                            <a href="/my-wishlist"> My Wishlist</a>
                          </li>
                          <li style={{ marginTop: "1.5rem" }}>
                            {" "}
                            <a href="/my-address">Address</a>
                          </li>

                          <li style={{ marginTop: "1.5rem" }}>
                            {" "}
                            <a href="/change-password">Change Password</a>
                          </li>
                          <li style={{ marginTop: "1.5rem" }}>
                            {" "}
                            <a href="" onClick={handleLogout}>
                              {" "}
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Popup>
                  </>
                ) : (
                  <div className="my-account ts__05 pr dn db_md ">
                    <a
                      className="cb chp db push_side"
                      href="#"
                      data-id="#nt_login_canvas"
                    >
                      <i className="iccl iccl-user"></i>
                    </a>
                  </div>
                )}

                {/* <div className="my-account ts__05 pr dn db_md ">
                  <a
                    className="cb chp db push_side"
                    href="#"
                    data-id="#nt_login_canvas"
                  >
                    <i className="iccl iccl-user" ></i>
                  </a> */}
                {/* {token  ? (

                  ) : null} */}
                {/* </div> */}
                <Hidden only={['sm', 'xs']}>
                  <div className="icon_cart pr">

                    <Link to
                      ="/my-wishlist"
                    >
                      <i className="iccl iccl-heart pr">

                        <span className="op__0 ts_op pa tcount bgb br__50 cw tc">{totalWishListQuantity != null ? totalWishListQuantity : 0}</span>

                      </i>
                    </Link>
                  </div>
                  <div className="icon_cart pr">
                    <Link to="/cart">
                      <i className="iccl iccl-cart pr">
                        <span className="op__0 ts_op pa tcount bgb br__50 cw tc">
                          {totalQuantity != null ? totalQuantity : 0}
                        </span>
                      </i>
                    </Link>
                  </div>
                </Hidden>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popform />
      <Cartpopup />
      <div id="nt_menu_canvas" class="nt_fk_canvas nt_sleft dn lazyload">
        <i class="close_pp pegk pe-7s-close ts__03 cd"></i>
        {/* <div class="mb_nav_tabs flex al_center mb_cat_true"> */}
        <div
          class="mb_nav_title pr mb_nav_ul flex al_center fl_center active"
          data-id="#kalles-section-mb_nav_js"
        >
          <span class="db truncate">Menu</span>
        </div>
        {/* <div class="mb_nav_title pr flex al_center fl_center" data-id="#kalles-section-mb_cat_js">
            <span class="db truncate">Categories</span>
        </div> */}
        {/* </div> */}
        <div id="kalles-section-mb_nav_js" class="mb_nav_tab active">
          <div id="kalles-section-mb_nav" class="kalles-section">
            <ul id="menu_mb_ul" class="nt_mb_menu">
              {category.map((i, index) => (
                <li
                  class="menu-item menu-item-has-children only_icon_false"
                  key={i._id}
                >
                  <a>
                    <a href="shop-filter-sidebar.html">
                      <span class="nav_link_txt flex al_center">
                        {i.category}
                      </span>
                    </a>
                    <span
                      class="nav_link_icon ml__5"
                      onClick={() => setSub(!sub)}
                    ></span>
                  </a>

                  <ul class="sub-menu" style={{ display: "block" }}>
                    {sub && (
                      <>
                        {i.subCategory.map((j) => (
                          <li class="menu-item">
                            <a href={`/shop/${i.category}/${j.category}`}>
                              {j.category}
                            </a>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </li>
              ))}

              <li class="menu-item menu-item-btns menu-item-wishlist">
                <a class="js_link_wis" href="/my-wishlist">
                  <span class="iconbtns">Wishlist</span>
                </a>
              </li>
              {/* <li class="menu-item menu-item-btns menu-item-sea push_side" data-id="#nt_search_canvas">
                    <a href="#"><span class="iconbtns">Search</span></a></li> */}
              {!token ? (
                <li class="menu-item menu-item-btns menu-item-acount">
                  <a href="#" class="push_side" data-id="#nt_login_canvas">
                    <span class="iconbtns">Login / Register</span>
                  </a>
                </li>
              ) : (
                <li class="menu-item menu-item-btns menu-item-acount">
                  <a href="" onClick={handleLogout}>
                    <span class="iconbtns">Logout</span>
                  </a>
                </li>
              )}

              <li class="menu-item menu-item-infos">
                <p class="menu_infos_title">Need help?</p>
                <div class="menu_infos_text">
                  <i class="pegk pe-7s-call fwb mr__10"></i>+91 123 456 7890
                  <br />
                  <i class="pegk pe-7s-mail fwb mr__10"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="kalles-section-toolbar_mobile" class="kalles-section">
        <div class="kalles_toolbar kalles_toolbar_label_true ntpf r__0 l__0 b__0 flex fl_between al_center">
          <div class="type_toolbar_shop kalles_toolbar_item">
            <a href="/">
              <span class="toolbar_icon"></span>
              <span class="kalles_toolbar_label">Shop</span>
            </a>
          </div>
          {/* <div class="type_toolbar_filter kalles_toolbar_item dn">
            <a class="dt_trigger_cl" href="#" data-trigger=".btn_filter">
                <span class="toolbar_icon"></span>
                <span class="kalles_toolbar_label">Filter</span>
            </a>
        </div> */}
          <div class="type_toolbar_wish kalles_toolbar_item">
            <a class="js_link_wis" href="/my-wishlist">
              <span class="toolbar_icon">
                <span class="jswcount toolbar_count">{totalWishListQuantity != null ? totalWishListQuantity : 0}</span>
              </span>
              <span class="kalles_toolbar_label">Wishlist</span>
            </a>
          </div>
          <div class="type_toolbar_cart kalles_toolbar_item">
            <Link to="/cart">
              <span class="toolbar_icon">
                <span class="jsccount toolbar_count">{totalQuantity != null ? totalQuantity : 0}</span>
              </span>
              <span class="kalles_toolbar_label">Cart</span>
            </Link>
          </div>
          {/* <div class="type_toolbar_account kalles_toolbar_item">
            <a href="#" class="push_side" data-id="#nt_login_canvas">
              <span class="toolbar_icon"></span>
              <span class="kalles_toolbar_label">Account</span>
            </a>
          </div> */}
          {/* <div class="type_toolbar_search kalles_toolbar_item">
            <a href="#" class="push_side" data-id="#nt_search_canvas">
                <span class="toolbar_icon"></span>
                <span class="kalles_toolbar_label">Search</span>
            </a>
        </div> */}
        </div>
        {/* <div id="nt_search_canvas" class="nt_fk_full dn tl tc_lg">
    <div class="nt_mini_cart flex column h__100">
        <div class="mini_cart_wrap">
            <form method="get" class="search_header mini_search_frm js_frm_search pr" role="search">
                <div class="row">
                    <div class="frm_search_input pr oh col">
                        <input class="search_header__input js_iput_search" autocomplete="off" type="text" name="q" placeholder="Search for products" />
                        <button class="search_header__submit js_btn_search use_jsfull hide_  pe_none" type="submit">
                            <i class="iccl iccl-search"></i></button>
                    </div>
                </div>
                <i class="close_pp pegk pe-7s-close ts__03 cd pa r__0"></i>
                <div class="ld_bar_search"></div>
            </form>
        </div>
    </div>
</div> */}
      </div>
    </>
  );
}

export default Header;
