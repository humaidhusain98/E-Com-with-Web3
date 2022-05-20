import React, { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { API } from "../API";

function Signup({signupSelect,setloginSelect,setsignupSelect}) {
  // const [loginSelect, setloginSelect] = useState(false);
  // const [signupSelect, setsignupSelect] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  function showLogin() {
    setloginSelect(true);
    setsignupSelect(false);
  }
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

        alert.show("Registered Successfully", { type: "success" });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setTimeout(() => {
          window.stop();
        }, 2000);
      }
      else
      {
      alert.show(response.data.message, { type: "error" });
      setLoading(false);
      }

    } catch (error) {
      alert.show(error.message, { type: "error" });
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        id="RegisterForm"
        class={`nt_mini_cart flex column h__100 ${
          signupSelect ? "is_selected" : ""
        } `}
      >
        <div class="mini_cart_header flex fl_between al_center">
          <div class="h3 widget-title tu fs__16 mg__0">Register</div>
          <i class="close_pp pegk pe-7s-close ts__03 cd"></i>
        </div>
        <div class="mini_cart_wrap">
          <div class="mini_cart_content fixcl-scroll">
            <div class="fixcl-scroll-content">
              <p class="form-row">
                <label for="-FirstName">First Name <span class="required">*</span></label>
                <input
                  type="text"
                  name="f-name"
                  value={firstName}
                  id="-FirstName"
                  aria-required="true"
                  autocomplete="given-name"
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </p>
              <p class="form-row">
                <label for="-LastName">Last Name <span class="required">*</span></label>
                <input
                aria-required="true"
                  type="text"
                  name="last_name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  id="-LastName"
                  autocomplete="family-name"
                />
              </p>
              <p class="form-row">
                <label for="-email">
                  Email <span class="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="-email"
                  class=""
                  value={email}
                  autocapitalize="off"
                  autocomplete="email"
                  aria-required="true"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p class="form-row">
                <label for="-password">
                  Password <span class="required">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  id="-password"
                  class=""
                  autocomplete="current-password"
                  aria-required="true"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>

              <input
                type="submit"
                value={loading ? "Wait..." : "Register"}
                class="button button_primary w__100 tu js_add_ld"
                onClick={(e) => handleSubmit(e)}
              />

              <br />
              <p class="mb__10 mt__20">
                Already have an account?
                <a
                  href="#"
                  data-id="#customer_login"
                  class="link_acc"
                  style={{ cursor: "pointer" }}
                  onClick={showLogin}
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
