import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useAlert } from "react-alert";
import Navigation from "./Navigation";
import { API } from "../API";
import axios from "axios";
import swal from "sweetalert";
import Signup from "./Signup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Actions/cartAction";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSelect, setsignupSelect] = useState(false);
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  function showRegistration() {

   history.push("/createAccount")
  }
  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert.show("Email and Password are required.", { type: "error" });
    }
    const response = await axios.post(`${API}/signin`, {
      email,
      password,
    });

    if (response.data.status==="ok") {
      localStorage.setItem("token", response.data.token);
      alert.show("Logged In Successfully", { type: "success" });

      const cart = JSON.parse(localStorage.getItem("cartData"));

      if(cart!=null)
      {
       cart.map((item) => {
         const token = localStorage.getItem("token");
         if (token) {
           return dispatch(addToCart(item._id,item.quantity));
         }
       });
       localStorage.removeItem("cartData");


     }
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
    else
    {
      alert.show(response.data.message, { type: "error" });

    }
  }

  async function handleSignup(e) {
    e.preventDefault();
  }
  async function handleSubmit(event){
    event.preventDefault();
    if(!(
     email
    )){
      // alert("please fill all the fields")
      swal("Oops!", "Please fill all the required fields", "error");
      return
    }else{
      let response = await axios.put(`${API}/generatePassword`,
      {email}


      )
      if (response.data.status==="success") {
       return  swal({
          title: "Send Successsfully!",
          text: response.data.message,
          icon: "success",
          button: "Done",
          type: "success",
        }).then(()=>
        window.location.href = "/login")
      }else{
        swal({
          title: "Error!",
          text: response.data.message,
          icon: "error",
          button: "Ok",
          type: "error",
        })
      }

    }
  }
  return (
    <div>
      <Header />
      <Navigation />
      <div id="nt_content">
        <div class="kalles-section page_section_heading">
          <div class="page-head tc pr oh cat_bg_img page_head_">
            <div
              class="parallax-inner nt_parallax_false lazyload nt_bg_lz pa t__0 l__0 r__0 b__0"
              data-bgset="assets/images/shop/collection-list/bg-heading.jpg"
            ></div>
            <div class="container pr z_100">
              <h1 class="mb__5 cw">My Account</h1>
            </div>
          </div>
        </div>

        <div class="container cb">
          <div class="row">
            <div class="col-12 col-md-12 login-form mt__60 mb-0 mb-md-5">
              <div id="CustomerLoginForm" class="kalles-wrap-form">
                <h2>Login</h2>
                <form method="post" action="#">
                  <p class="form-row">
                    <label for="lg-email">
                      Email <span class="required">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="customer[email]"
                      id="lg-email"
                      autocomplete="email"
                    />
                  </p>
                  <p class="form-row">
                    <label for="lg-pw">
                      Password <span class="required">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="customer[password]"
                      id="lg-pw"
                    />
                  </p>
                  <p>
                Lost password?
                <a  href="#RecoverPasswordForm"
                      class="btn-change-login-form">
                  Recover password
                </a>
              </p>

                  <p >
                New customer?
                <a

                 data-id="#customer_login"
                 class="link_acc"
                 style={{ cursor: "pointer" }}
                  onClick={showRegistration}
                >
                  Create your account
                </a>
              </p>
                  <input
                    onClick={(e) => handleLogin(e)}
                    type="submit"
                    class="btn js_add_ld"
                    value="Sign In"
                  />
                </form>
              </div>
              <div id="RecoverPasswordForm" class="kalles-wrap-form dn">
                <h2>Reset your password</h2>
                <p>
                  Lost your password? Please enter your email address. You will
                  receive a link to create a new password via email.
                </p>
                <form method="post" action="#">
                  <p class="form-row">
                    <label for="rs-email">Email address*</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      id="rs-email"
                      class="input-full"
                    />
                  </p>
                  <input
                    type="submit"
                    onClick={handleSubmit}
                    class="btn js_add_ld"
                    value="Reset Password"
                  />
                  <a
                    href="#CustomerLoginForm"
                    class="button ml__15 btn-change-login-form"
                  >
                    Cancel
                  </a>
                </form>
              </div>
            </div>
      </div>
        </div>
      </div>
      {/* <Signup show={signupSelect} /> */}
      <Footer />
    </div>
  );
}

export default SignIn;
