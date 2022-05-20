import React from "react";
import { useState } from "react";
import Login from "./Login";
import Recoverpassword from "./Recoverpassword";
import Signup from "./Signup";

function Popform() {
  
  return (
    <div>
      <div id="nt_login_canvas" class="nt_fk_canvas dn lazyload">
        <Login/>
       
      </div>
    </div>
  );
}

export default Popform;
