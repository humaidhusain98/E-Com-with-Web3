import React from "react";
import Confetti from "react-confetti";
import axios from "axios";
import { API } from "../API";
import { useHistory, useParams, useLocation } from "react-router-dom";
function Paymentsuccess() {


  return (
    <div>

          <div
            style={{ display: "grid", placeItems: "center", marginTop: "5%" }}
          >
            <h2>Payment Failed.Please try again later</h2>
            </div>

    </div>
  );
}

export default Paymentsuccess;
