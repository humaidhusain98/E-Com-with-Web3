import axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import { API } from "../API";
import { converttimestamp } from "../Utils";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);
  const [postperpage, setPostPerPage] = useState(1);
  const [totalRes, setTotalRes] = useState(0);
  const [blogdetails, setBlogDetails] = useState(null);
  const [recentBlog, setRecentBlog] = useState(null);
  const [blogcategories, setBlogCategories] = useState([]);
  useEffect(() => {
    getBlogDetails();
    getBlogCategory();
  }, [currentPage, postperpage]);

  const paginate = async (page) => {
    setActive(Number(page));
    setCurrentPage(page * 1);
  };


  async function getBlogDetails() {
    let res = await axios.get(
      `${API}/api/blog/view_Blog?page=${currentPage}&limit=${postperpage}`
    );
    setBlogDetails(res.data.Blog);
    setRecentBlog(res.data.Blog);
    setTotalRes(res.data.totalRecords);
  }

  async function getBlogCategory() {
    let res = await axios.get(
      `${API}/api/blog/view_BlogCategory?page=${currentPage}&limit=${postperpage}`
    );

    setBlogCategories(res.data.BlogCategory);
  }
  async function handleCategory(id) {
    let res = await axios.post(
      `${API}/api/blog/view_BlogByCategory?page=${currentPage}&limit=${postperpage}`,
      { category: id }
    );
    setBlogDetails(res.data.Blog);
  }
  return (
    <div>
      <Header />
      <Navigation />
      <div id="nt_content">
        {/*main content*/}
        <div className="container container_cat cat_default mt__60 mb__20">
          <div className="row nt_single_blog">
            <div className="col-lg-3 order-12 col-xs-12 sidebar">
              <div className="kalles-section type_instagram">
                <div className="cat_shop_wrap mb__60">
                  <div className="cat_fixcl-scroll">
                    <div className="cat_fixcl-scroll-content css_ntbar">
                      <div className="row wrap_filter">
                        <div className="col-12 col-md-12 widget widget_product_categories cat_count_true nt_filter_block">
                          <h5 className="widget-title">Blog Categories</h5>
                          <ul className="product-categories">
                            {blogcategories.length > 0
                              ? blogcategories.map((item) => (
                                  <li className="cat-item">
                                    <h6
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleCategory(item._id)}
                                    >
                                      {item.name}
                                    </h6>
                                  </li>
                                ))
                              : null}

                            {/* <li className="cat-item current-cat">
                              <a href="#">Life Style</a>
                            </li>
                            <li className="cat-item">
                              <a href="#">Skin</a>
                            </li> */}
                          </ul>
                        </div>
                        <div className="col-12 col-md-12 widget widget_post_list">
                          <h5 className="widget-title">Recent Post</h5>
                          {recentBlog != null && (
                            <div className="post_list_widget">
                              {recentBlog.slice(0, 3).map((i) => (
                                <Link
                                  className="mb__20 db pr oh"
                                  to={`/blogpost/${i._id}`}
                                >
                                  <div className="row mb__10 pb__10">
                                    <div className="col-auto widget_img_ar">
                                      <a
                                        className="db pr oh"
                                        href="product-detail-layout-01.html"
                                      >
                                        <img
                                          src={i.image}
                                          className="w__100 lz_op_ef lazyload"
                                          alt={i.title}
                                          data-srcset={i.image}
                                        />
                                      </a>
                                    </div>
                                    <div className="col widget_if_ar">
                                      <a
                                        className="article-title db"
                                        href="blog-post-with-instagram-shop.html"
                                      >
                                        {i.title}
                                      </a>
                                      <time dateTime="2020-04-06T02:22:00Z">
                                        {converttimestamp(i.updatedAt)}
                                      </time>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 order-1 col-xs-12">
              <div className="kalles-section nt_section type_isotope">
                {blogdetails != null ? (
                  <div className="articles products art_des2 nt_products_holder row des_cnt_1 nt_cover ratio4_3 position_8 equal_nt">
                    {blogdetails.length > 0
                      ? blogdetails.map((item) => (
                          <article className="post_nt_loop post_1 col-lg-6 col-md-6 col-12 mb__40">
                            <Link
                              className="mb__20 db pr oh"
                              to={`/blogpost/${item._id}`}
                            >
                              <div
                                className="lazyload nt_bg_lz pr_lazy_img"
                                data-bgset={item.image}
                              />
                            </Link>
                            <div className="post-info mb__5">
                              <span className="post-author mr__5">
                                By <span className="cd">Admin</span>
                              </span>
                              <span className="post-time">
                                on{" "}
                                <span className="cd">
                                  <time dateTime="2020-04-06T02:22:00Z">
                                    {converttimestamp(item.createdAt)}
                                  </time>
                                </span>
                              </span>
                              <h4 className="mg__0 fs__16 mt__15 ls__0">
                                <Link
                                  className="cd chp open"
                                  to={`/blogpost/${item._id}`}
                                >
                                  {item.title}
                                </Link>
                              </h4>
                            </div>
                          </article>
                        ))
                      : null}
                    {/*articles*/}

                    {/* <article className="post_nt_loop post_1 col-lg-6 col-md-6 col-12 mb__40">
                    <a className="mb__20 db pr oh" href="blog-post.html">
                      <div className="lazyload nt_bg_lz pr_lazy_img" data-bgset="assets/images/blog-page/blog-slide-02.jpg" />
                    </a>
                    <div className="post-info mb__5">
                      <span className="post-author mr__5">By <span className="cd">admin</span></span><span className="post-time">on <span className="cd"><time dateTime="2020-04-06T02:22:00Z">April 6, 2020</time></span></span>
                      <h4 className="mg__0 fs__16 mt__15 ls__0">
                        <a className="cd chp open" href="blog-post.html">The Easiest Way to Break Out on Top</a>
                      </h4>
                    </div>
                  </article>
                  <article className="post_nt_loop post_1 col-lg-6 col-md-6 col-12 mb__40">
                    <a className="mb__20 db pr oh" href="blog-post.html">
                      <div className="lazyload nt_bg_lz pr_lazy_img" data-bgset="assets/images/blog-page/blog-slide-03.jpg" />
                    </a>
                    <div className="post-info mb__5">
                      <span className="post-author mr__5">By <span className="cd">admin</span></span><span className="post-time">on <span className="cd"><time dateTime="2020-04-06T02:17:00Z">April 6, 2020</time></span></span>
                      <h4 className="mg__0 fs__16 mt__15 ls__0">
                        <a className="cd chp open" href="blog-post.html">Style for couple in Weeding season</a>
                      </h4>
                    </div>
                  </article>
                  <article className="post_nt_loop post_1 col-lg-6 col-md-6 col-12 mb__40">
                    <a className="mb__20 db pr oh" href="blog-post.html">
                      <div className="lazyload nt_bg_lz pr_lazy_img" data-bgset="assets/images/blog-page/blog-slide-04.jpg" />
                    </a>
                    <div className="post-info mb__5">
                      <span className="post-author mr__5">By <span className="cd">admin</span></span><span className="post-time">on <span className="cd"><time dateTime="2020-04-06T02:14:00Z">April 6, 2020</time></span></span>
                      <h4 className="mg__0 fs__16 mt__15 ls__0">
                        <a className="cd chp open" href="blog-post.html">Cool Spring Street Style Looks</a>
                      </h4>
                    </div>
                  </article>
                  <article className="post_nt_loop post_1 col-lg-6 col-md-6 col-12 mb__40">
                    <a className="mb__20 db pr oh" href="blog-post.html">
                      <div className="lazyload nt_bg_lz pr_lazy_img" data-bgset="assets/images/blog-page/blog-slide-05.jpg" />
                    </a>
                    <div className="post-info mb__5">
                      <span className="post-author mr__5">By <span className="cd">admin</span></span><span className="post-time">on <span className="cd"><time dateTime="2020-04-06T02:17:00Z">April 6, 2020</time></span></span>
                      <h4 className="mg__0 fs__16 mt__15 ls__0">
                        <a className="cd chp open" href="blog-post.html">Style for couple in Weeding season</a>
                      </h4>
                    </div>
                  </article>
                  <article className="post_nt_loop post_1 col-lg-6 col-md-6 col-12 mb__40">
                    <a className="mb__20 db pr oh" href="blog-post.html">
                      <div className="lazyload nt_bg_lz pr_lazy_img" data-bgset="assets/images/blog-page/blog-slide-06.jpg" />
                    </a>
                    <div className="post-info mb__5">
                      <span className="post-author mr__5">By <span className="cd">admin</span></span><span className="post-time">on <span className="cd"><time dateTime="2020-04-06T02:14:00Z">April 6, 2020</time></span></span>
                      <h4 className="mg__0 fs__16 mt__15 ls__0">
                        <a className="cd chp open" href="blog-post.html">Cool Spring Street Style Looks</a>
                      </h4>
                    </div>
                  </article>
                  <article className="post_nt_loop post_1 col-lg-6 col-md-6 col-12 mb__40">
                    <a className="mb__20 db pr oh" href="blog-post.html">
                      <div className="lazyload nt_bg_lz pr_lazy_img" data-bgset="assets/images/blog-page/blog-slide-01.jpg" />
                    </a>
                    <div className="post-info mb__5">
                      <span className="post-author mr__5">By <span className="cd">admin</span></span><span className="post-time">on <span className="cd"><time dateTime="2020-04-06T02:22:00Z">April 6, 2020</time></span></span>
                      <h4 className="mg__0 fs__16 mt__15 ls__0">
                        <a className="cd chp open" href="blog-post.html">Spring – Summer Trending 2020</a>
                      </h4>
                    </div>
                  </article>
                  <article className="post_nt_loop post_1 col-lg-6 col-md-6 col-12 mb__40">
                    <a className="mb__20 db pr oh" href="blog-post.html">
                      <div className="lazyload nt_bg_lz pr_lazy_img" data-bgset="assets/images/blog-page/blog-slide-02.jpg" />
                    </a>
                    <div className="post-info mb__5">
                      <span className="post-author mr__5">By <span className="cd">admin</span></span><span className="post-time">on <span className="cd"><time dateTime="2020-04-06T02:22:00Z">April 6, 2020</time></span></span>
                      <h4 className="mg__0 fs__16 mt__15 ls__0">
                        <a className="cd chp open" href="blog-post.html">The Easiest Way to Break Out on Top</a>
                      </h4>
                    </div>
                  </article>*/}
                  </div>
                ) : (
                  ""
                )}
                {/*end articles*/}
                {/*navigation*/}
                <div
                  className="products-footer tc"
                  style={{ position: "relative" }}
                >
                  {/* <nav className="nt-pagination w__100 tc paginate_ajax">
                    <ul className="pagination-page page-numbers">

                      <li><a className="page-numbers" href="#">2</a></li>


                    </ul>
                  </nav> */}
                  <Pagination
                    postsPerPage={postperpage}
                    page={currentPage}
                    setPage={setCurrentPage}
                    totalPosts={totalRes}
                    paginate={paginate}
                    active={active}
                  />
                </div>
                {/*end navigation*/}
              </div>
            </div>
          </div>
        </div>
        {/*end main content*/}
      </div>

      <Footer />

      {/* <ScrollTop/> */}
    </div>
  );
};

export default Blogs;
