import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bottombanner from "./components/Bottombanner";
import Categorybanner from "./components/Categorybanner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Newproducts from "./components/Newproducts";
import Productrow from "./components/Productrow";
import Producdetails from "./components/Producdetails";
import Productdetails from "./components/Productdetails";
import Shop from "./components/Shop";
import Shoppingcart from "./components/Shoppingcart";
import PaymentFailed from "./components/payment-failed"
import Checkout from "./components/Checkout";
import Paymentpage from "./components/Paymentpage";
import Paymentsuccess from "./components/Paymentsuccess";
import WebsitePolicyPage from "./components/websitePolicyPage";
import Allproductlist from "./components/Allproductlist";
import SignIn from "./components/SignIn";
import Comingsoon from "./components/Comingsoon";
import Myorders from "./components/Myorders";
import Mywishlist from "./components/Mywishlist";
import Changepassword from "./components/Changepassword";
import Orderdetails from "./components/Orderdetails";
import Address from "./components/Address";
import Contact from "./components/Contact";
import Blogs from "./components/Blogs"
import BlogPost from "./components/BlogPost";
import CreateAccount from "./components/createAccount";

import Consultation from "./components/Consultation";


import {Redirect} from 'react-router-dom'
import Wallet from "./components/wallet";


function Routes() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact>
          <Comingsoon />
        </Route> */}
        <Route path="/" exact>
      
          <Header />
          <Navigation />
          <Hero />
         <Productrow />
          <Categorybanner />
          <Newproducts />
          <Bottombanner />
          <Footer />
        </Route>

        <Route path="/onlineconsultation" exact component={Consultation}/>
        <Route path="/createAccount" exact component={CreateAccount} />
        <Route path="/login" exact component={SignIn} />

        <Route path="/createAccount" exact render={(props) =>
                !token ? (
                  <CreateAccount/>
                ) : (
                  <Redirect to="/view" />
                )
              } />
        <Route path="/login" exact render={(props) =>
                !token ? (
                  <SignIn />
                ) : (
                  <Redirect to="/view" />
                )
              } />

        <Route path="/blogs" exact component={Blogs} />
        <Route path="/blogpost/:id" exact component={BlogPost} />
        <Route path="/contact-us" exact component={Contact} />
        <Route path="/my-orders" exact component={Myorders}></Route>
        <Route path="/my-wishlist" exact component={Mywishlist}></Route>
        <Route path="/my-address" exact component={Address}></Route>
        <Route path="/order-details/:id" exact component={Orderdetails}></Route>
        <Route path="/change-password" exact component={Changepassword}></Route>
        <Route path="/product/:title/:id" exact component={Productdetails} />
        {/* change  for product page*/}

        <Route path="/allProducts/:category" exact component={Allproductlist} />
        <Route path="/shop/:category/:subCategory" exact component={Shop} />
        <Route path="/cart" exact component={Shoppingcart} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/payment/:id" exact component={Paymentpage} />
        <Route path="/payment-success/:id" exact component={Paymentsuccess} />
        <Route path="/:id" exact component={WebsitePolicyPage} />
        <Route path="/payment-failed" exact component={PaymentFailed} />


      </Switch>
    </Router>
  );
}

export default Routes;
