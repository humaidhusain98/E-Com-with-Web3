import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../API";
import { useAlert } from "react-alert";
import validator from "email-validator";

function Footer() {
  const [configuration, setConfiguration] = useState("");
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(null);
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function getCategory() {
      let categories = await axios.get(`${API}/api/category`);
      setCategory(categories?.data);
    }
    async function getConfiguration() {
      const configuration = await axios.get(`${API}/api/config`);
      setConfiguration(configuration.data.result);
    }
    getConfiguration();
    getCategory();
    getPages();
  }, []);
  const getPages = async () => {
    const res = await axios.get(`${API}/api/page/view_page`);
    console.log(res);
    setPage(res.data.Page);
  };

  async function subscribe(e) {
    e.preventDefault();

    if (!validator.validate(email)) {
      alert.show("Please Enter Valid Email Address", { type: "error" });
    } else {
      let subscribeNews = await axios.post(
        `${API}/api/user/subscribeNewsLetter`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (subscribeNews.data.message === "success") {
        alert.show("Thanks For Subscribing To Our NewsLetter", {
          type: "success",
        });
        setEmail("");
      }
    }
  }

  return (
    <div id="nt_wrapper">
      <footer id="nt_footer" className="bgbl footer-1">
        <div
          id="kalles-section-footer_top"
          className="kalles-section footer__top type_instagram"
        >
          <div className="footer__top_wrap footer_sticky_false footer_collapse_true nt_bg_overlay pr oh pb__30 pt__80">
            <div className="container pr z_100">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 mb__50 order-lg-1 order-1">
                  <div className="widget widget_text widget_logo">
                    <h3 className="widget-title fwsb flex al_center fl_between fs__16 mg__0 mb__30 dn_md">
                      <span className="txt_title">Get in touch</span>
                      <span className="nav_link_icon ml__5"></span>
                    </h3>
                    <div className="widget_footer">
                      <div className="footer-contact" >
                        <p>
                          <a className="db" href="/">
                            <img
                              className="w__100 mb__15 lz_op_ef lazyload max-width__95px"
                              src={configuration[0]?.logo[0].Footerlogo}
                              data-src={configuration[0]?.logo[0].Footerlogo}
                            />
                          </a>
                        </p>
                        <p >
                          <i className="pegk pe-7s-map-marker"> </i>
                          <span>
                            {configuration[0]?.address[0].address}
                            <br />
                            <span className="pl__30">
                              {" "}
                              {`${configuration[0]?.address[0].city} , ${configuration[0]?.address[0].country}`}
                            </span>
                          </span>
                        </p>
                        <p>
                          <i className="pegk pe-7s-call"></i>{" "}
                          <span>{configuration[0]?.address[0].contact} </span>
                        </p>
                        <div className="nt-social">
                          <a
                            href={configuration[0]?.socialMedia[0].facebook}
                            className="facebook cb ttip_nt tooltip_top"
                          >
                            <span className="tt_txt">Follow on Facebook</span>
                            <i className="facl facl-facebook"></i>
                          </a>
                          <a
                            href={configuration[0]?.socialMedia[0].twitter}
                            className="twitter cb ttip_nt tooltip_top"
                          >
                            <span className="tt_txt">Follow on Twitter</span>
                            <i className="facl facl-twitter"></i>
                          </a>
                          <a
                            href={configuration[0]?.socialMedia[0].instagram}
                            className="instagram cb ttip_nt tooltip_top"
                          >
                            <span className="tt_txt">Follow on Instagram</span>
                            <i className="facl facl-instagram"></i>
                          </a>
                          <a
                            href={configuration[0]?.socialMedia[0].linkedin}
                            className="linkedin cb ttip_nt tooltip_top"
                          >
                            <span className="tt_txt">Follow on Linkedin</span>
                            <i className="facl facl-linkedin"></i>
                          </a>
                          <a
                            href="https://www.pinterest.com/"
                            className="pinterest cb ttip_nt tooltip_top"
                          >
                            <span className="tt_txt">Follow on Pinterest</span>
                            <i className="facl facl-pinterest"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 mb__50 order-lg-2 order-1">
                  <div className="widget widget_nav_menu">
                    <h3 className="widget-title fwsb flex al_center fl_between fs__16 mg__0 mb__30">
                      <h2 className="txt_title">Categories</h2>
                      <span className="nav_link_icon ml__5"></span>
                    </h3>
                    <div className="menu_footer widget_footer">
                      <ul className="menu" style={{display:'flex',gap:20}}>
                        {category.map((item, index) => {
                          return (
                            <li className="menu-item" key={index}>
                              <a href={`/allProducts/${item.category.replace(/\s+/g, '-')}`}>{item.category}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-2 col-md-6 col-12 mb__50 order-lg-3 order-1">
                  <div className="widget widget_nav_menu">
                    <h3 className="widget-title fwsb flex al_center fl_between fs__16 mg__0 mb__30">
                      <span className="txt_title">Infomation</span>
                      <span className="nav_link_icon ml__5"></span>
                    </h3>
                    {page === null ? (
                      <></>
                    ) : (
                      <>
                        {page.map((i) => (
                          <div className="menu_footer widget_footer">
                            <ul className="menu">
                              <li className="menu-item">
                                <a href={i.url}>{i.title}</a>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div> */}
                {/* <div className="col-lg-2 col-md-6 col-12 mb__50 order-lg-4 order-1">
                  <div className="widget widget_nav_menu">
                    <h3 className="widget-title fwsb flex al_center fl_between fs__16 mg__0 mb__30">
                      <span className="txt_title">Useful links</span>
                      <span className="nav_link_icon ml__5"></span>
                    </h3>
                    <div className="menu_footer widget_footer">
                      <ul className="menu">
                      <li className="menu-item">
                          <a href="/onlineconsultation">Online consultation</a>
                        </li>
                      <li className="menu-item">
                          <a href="/blogs">Blog</a>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-lg-3 col-md-6 col-12 mb__50 order-lg-5 order-1">
                  <div className="widget widget_text">
                    <h3 className="widget-title fwsb flex al_center fl_between fs__16 mg__0 mb__30">
                      <span className="txt_title">Newsletter Signup</span>
                      <span className="nav_link_icon ml__5"></span>
                    </h3>
                    <div className="widget_footer newl_des_1">
                      <p>
                        Subscribe to our newsletter and  get latest updates
                      </p>
                      <form
                        method="post"
                        action="#"
                        className="mc4wp-form pr z_100"
                      >
                        <div className="mc4wp-form-fields">
                          <div className="signup-newsletter-form row no-gutters pr oh">
                            <div className="col col_email">
                              <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                placeholder="Your email address"
                                className="tc tl_md input-text"
                                required="required"
                              />
                            </div>
                            <div className="col-auto">
                              <button
                                onClick={(e) => subscribe(e)}
                                type="submit"
                                className="btn_new_icon_false w__100 submit-btn truncate"
                              >
                                <span>Subscribe</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div
          id="kalles-section-footer_bot"
          className="kalles-section footer__bot"
        >
          <div className="footer__bot_wrap pt__20 pb__20">
            <div className="container pr tc">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12 col_1">
                  Copyright © 2022 &nbsp;
                  <span className="cp">Shop India</span> All rights
                  reserved.
                </div>
                <div className="col-lg-6 col-md-12 col-12 col_2">
                  {/* <ul id="footer-menu" className="clearfix">
                    <li className="menu-item">
                      <a href="/">Shop</a>
                    </li>
                    <li className="menu-item">
                      <a href="/About-Us">About Us</a>
                    </li>
                    <li className="menu-item">
                      <a href="/Contact-Us">Contact Us</a>
                    </li>
                    <li className="menu-item">
                      <a href="/blogs">Blog</a>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
