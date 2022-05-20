import React from "react";
import {useState} from 'react'
import axios from "axios";
import { API } from "../API";
import swal from "sweetalert";

function Recoverpassword({recover,setloginSelect,setRecover}) {
  const [email,setEmail] =useState("")
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
        }).then(()=>{
          setRecover(false)
          setloginSelect(true)
        })
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
      <form id="RecoverForm"
       class={`nt_mini_cart flex column h__100 ${
        recover ? "is_selected" : ""
      } `}
      >
        <div class="mini_cart_header flex fl_between al_center">
          <div class="h3 widget-title tu fs__16 mg__0">Recover password</div>
          <i class="close_pp pegk pe-7s-close ts__03 cd"></i>
        </div>
        <div class="mini_cart_wrap">
          <div class="mini_cart_content fixcl-scroll">
            <div class="fixcl-scroll-content">
              <p class="form-row">
                <label for="RecoverEmail">Email address*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  name="email"
                  id="RecoverEmail"
                  class="input-full"
                  autocomplete="email"
                  autocapitalize="off"
                />
              </p>
              <input
                type="submit"
                onClick={handleSubmit}
                class="button button_primary w__100 tu js_add_ld"
                value="Reset Password"
              />
              <br />
              <p class="mb__10 mt__20">
                Remembered your password?
                <a href="#" onClick={()=>{setRecover(false);setloginSelect(true)}} data-id="#customer_login" class="link_acc">
                  Back to login
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Recoverpassword;
