import axios from 'axios';
import React,{useState, useEffect} from 'react'
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import {API} from "../API"
import { useParams } from "react-router-dom";
import parse from 'html-react-parser'
const BlogPost = () => {
  const { id } = useParams();
 const[blogdetails, setBlogDetails]= useState("")
  useEffect( ()=>{
    getBlogDetails()
  },[])

async function getBlogDetails(){
let res= await axios.get(`${API}/api/blog/view_Blog/${id}`)
setBlogDetails(res.data.Blog)
}

    return (
        <>
        <Header />
        {/* <Navigation /> */}
           <div id="nt_content">
        {/*hero banner*/}
        <div className="kalles-section page_section_heading">
          <div className="page-head tc pr oh cat_bg_img page_head_">
            <div className="parallax-inner nt_parallax_false lazyload nt_bg_lz pa t__0 l__0 r__0 b__0" data-bgset="assets/images/shop/collection-list/bg-heading.jpg" />
            <div className="container pr z_100">
              <h1 className="mb__5 cw">{blogdetails.title}</h1>
            </div>
          </div>
        </div>
        {/*end hero banner*/}
        {/*page content*/}
        <div className="container mt__40 mb__40 cb">
          <div className="kalles-term-exp mb__30">
            <h2 className="fs__22 mt-0">{blogdetails.title}</h2>
            {blogdetails!="" &&
            <p className="mb-2 text-justify">
            {parse(blogdetails.content)}
            </p>
            }
          </div>
        </div>
        {/*end page content*/}
      </div>

      <Footer />
        </>
    )
}

export default BlogPost
