import React, { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import Recoverpassword from "./Recoverpassword";
import Signup from "./Signup";
import { API } from "../API";
import { useDispatch } from "react-redux";
import { addToCart } from "../Actions/cartAction";
function Login() {
  const [loginSelect, setloginSelect] = useState(true);
  const [signupSelect, setsignupSelect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const[recover,setRecover]=useState(false)
  const alert = useAlert();
  let prodIds = [];
  const dispatch = useDispatch();
  function showRegistration() {
    setloginSelect(false);
    setsignupSelect(true);
  }
  function handleRecover(){
    setloginSelect(false);
    setRecover(true)
  }
  async function handleLogin(e) {
    setLoading(true);
    e.preventDefault();

    if (!email || !password) {
      alert.show("Email and Password are required.", { type: "error" });
    }
    try{
    const response = await axios.post(`${API}/signin`, {
      email,
      password,
    });
    console.log(response.data);
    if (response.data.status==="ok") {
      setLoading(false);
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
        window.location.reload();
      }, 2000);
      // setTimeout(() => {
      //   window.stop();
      // }, 2000);
    }
    else{
      alert.show(response.data.message, { type: "error" });
      setLoading(false);
    }
  }
    catch(error){
      alert.show(error.message, { type: "error" });
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        id="customer_login"
        class={`nt_mini_cart flex column h__100 ${
          loginSelect ? "is_selected" : ""
        }`}
      >
        <div class="mini_cart_header flex fl_between al_center">
          <div class="h3 widget-title tu fs__16 mg__0">Login</div>
          <i class="close_pp pegk pe-7s-close ts__03 cd"></i>
        </div>
        <div class="mini_cart_wrap">
          <div class="mini_cart_content fixcl-scroll">
            <div class="fixcl-scroll-content">
              <p class="form-row">
                <label for="CustomerEmail">
                  Email <span class="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="CustomerEmail"
                  autocomplete="email"
                  autocapitalize="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p class="form-row">
                <label for="CustomerPassword">
                  Password <span class="required">*</span>
                </label>
                <input
                  type="password"
                  value=""
                  name="password"
                  autocomplete="current-password"
                  id="CustomerPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <input
                type="submit"
                class="button button_primary w__100 tu js_add_ld"
                value={loading ? "Logging In ..." : "Log In"}
                onClick={(e) => handleLogin(e)}
              />
              <br />
              <p class="mb__10 mt__20">
                New customer?
                <a
                  href="#"
                  data-id="#RegisterForm"
                  class="link_acc"
                  onClick={showRegistration}
                >
                  Create your account
                </a>
              </p>
              <p>
                Lost password?
                <a href="#" data-id="#RecoverForm" class="link_acc" onClick={handleRecover}>
                  Recover password
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>

      <Recoverpassword recover={recover} setloginSelect={setloginSelect} setRecover={setRecover}/>
      <Signup signupSelect={signupSelect} setsignupSelect={setsignupSelect} setloginSelect={setloginSelect}/>
    </div>
  );
}

export default Login;
