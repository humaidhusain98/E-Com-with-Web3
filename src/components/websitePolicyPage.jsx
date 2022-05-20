import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import Shopbanner from "./Shopbanner";
import {useParams} from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../API";
import parse from 'html-react-parser'
import axios from 'axios'
const Page = ()=> {
const[data,setData]=useState(null)
const {id}=useParams()
useEffect(()=>
getPageByUrl()
,[])
const getPageByUrl=async()=>{
    const res=await axios.post(`${API}/api/page/view_pageByUrl`, {
            url: `/${id}`,
          })
    setData(res.data.Page)
}

    return (
        <div>
          <Header />
      <Navigation />
      {data===null?
      <>
      ""
      </>
      :
        <div id="nt_content">


            <div class="kalles-section page_section_heading">
                <div class="page-head tc pr oh cat_bg_img page_head_">
                    <div class="parallax-inner nt_parallax_false lazyload nt_bg_lz pa t__0 l__0 r__0 b__0" data-bgset="assets/images/shop/collection-list/bg-heading.jpg"></div>
                    <div class="container pr z_100">
                        <h1 class="mb__5 cw">{data.title}</h1>
                    </div>
                </div>
            </div>


            <div class="container mt__40 mb__40 cb">
                <div class="kalles-term-exp mb__30">
                   {parse(data.content)}
                </div>
            </div>


        </div>
}
        <Footer />
        </div>
    )
}
    export default Page