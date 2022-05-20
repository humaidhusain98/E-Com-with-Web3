import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../API";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import Shopbanner from "./Shopbanner";

function Myorders() {
  const token = localStorage.getItem("token");
  const [userOrder, setUserorder] = useState([]);


  let status = [];
  let orderIds = [];
  useEffect(() => {
    async function getuserOrders() {
      const order = await axios.get(`${API}/api/order/user_order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(order, "ORDERS");
      setUserorder(order.data.userOrder);
    }
    getuserOrders();
  }, []);

  let product = [];
  console.log(userOrder);

  userOrder?.map((item, index) => {
    product.push(item.product);
    status.push(item.status);
    orderIds.push(item._id);
  });

  // product.map((item) => {
  //   item.map((el) => {
  //     return console.log(el.title);
  //   });
  // });
  return (
    <div>
      <Header />
      <Navigation />
      <Shopbanner heading="MY ORDERS" />
      <div class="table-responsive mt-5 mb-5 container">
        <table class="table">
          {product.map((item, index) => {
            return item.map((el) => {
              return (
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <a href={`/order-details/${orderIds[index]}`}>
                        <img
                          style={{ width: "100px" }}
                          src={el.image}
                          alt="product"
                        />
                      </a>
                      <div style={{ marginLeft: "2rem" }}>
                        <a href="#">
                          <p>{el.title}</p>
                        </a>
                        <a href="#">
                          <p>Qty: {el.quantity}</p>
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>{el.price}</td>
                  <td>{status[index]}</td>
                </tr>
              );
            });
          })}
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Myorders;
