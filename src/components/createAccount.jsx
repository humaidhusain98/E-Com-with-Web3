import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useAlert } from "react-alert";
import Navigation from "./Navigation";
import { API } from "../API";
import axios from "axios";
import Signup from "./Signup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Actions/cartAction";

function SignIn() {

  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();


  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    if (!email || !password||!firstName||!lastName) {
      alert.show("Required Fields Missing", { type: "error" });
      setLoading(false);
      return

    }

    try {
      const response = await axios.post(`${API}/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      console.log(response);

      if (response.data.status==="ok") {
        setLoading(false);

            alert.show("Registered Successfully.Redirecting to login page.", { type: "success" });

            setTimeout(() => {
                history.push("/login");
              }, 2000);


                // history.push("/login")


      }
      else
      alert.show(response.data.message, { type: "error" });

    } catch (error) {
      alert.show(error.message, { type: "error" });
      setLoading(false);
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

        <div class="container cb" >
          <div class="row">
          <div class="col-12 col-md-12 login-form mt__60 mb__60" >
              <div id="CustomerRegisterForm">
                <h2>Register</h2>
                <form method="post" action="#">
                  <p class="form-row">
                    <label for="rgs-f_name">First Name</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFisrtName(e.target.value)}
                      type="text"
                      name="customer[first_name]"
                      id="rgs-f_name"
                      autocomplete="given-name"
                    />
                  </p>
                  <p class="form-row">
                    <label for="reg-l_name">Last Name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      name="customer[last_name]"
                      id="reg-l_name"
                      autocomplete="family-name"
                    />
                  </p>
                  <p class="form-row">
                    <label for="reg-email">
                      Email <span class="required">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="customer[email]"
                      id="reg-email"
                      autocomplete="email"
                      aria-required="true"
                    />
                  </p>
                  <p class="form-row">
                    <label for="reg-pw">
                      Password <span class="required">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="customer[password]"
                      id="reg-pw"
                      aria-required="true"
                    />
                  </p>
                  <p class="mb__10 mt__20">
                Already have an account?
                <a

                  data-id="#customer_login"
                  class="link_acc"
                  style={{ cursor: "pointer" }}
                  onClick={()=>history.push("/login")}
                >
                  Login here
                </a>
              </p>
                  <input
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    type="submit"
                    value="Register"
                    class="btn js_add_ld"
                  />
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
