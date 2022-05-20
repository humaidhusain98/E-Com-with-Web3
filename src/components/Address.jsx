import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import axios from "axios";
import { API } from "../API";
import Popup from "./Popup";

function Address() {
  const token = localStorage.getItem("token");
  const [userOrders, setuserOrders] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [address, setAddress] = useState([]);
  const [edit, setEdit] = useState("");
  let orders = [];

  useEffect(() => {
    async function getAddress() {
      let Addresses = await axios.get(`${API}/api/address/view_Address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(Addresses.data.Address);
      setAddress(Addresses.data.Address.addresses);
    }
    async function getuserOrders() {
      const order = await axios.get(`${API}/api/order/user_order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuserOrders(order.data.userOrder);
    }
    getuserOrders();
    getAddress();
  }, []);

  async function removeAddress(id) {
    let delResponse = await axios.delete(
      `${API}/api/address/delete_Address/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (delResponse.data.message) {
      window.location.reload();
    }
  }
  async function setDefault(id) {
    let delResponse = await axios.put(
      `${API}/api/address/update_default_Address/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (delResponse.data.message) {
      window.location.reload();
    }
  }

  async function handleEdit(id) {
    setModalShow(true);
    setEdit(id);
  }
  userOrders.map((el) => {
    return orders.push(el.orders);
  });
  console.log(address);
  return (
    <div>
      <Header />
      <Navigation />
      <div className="conatiner">
        <div className="mt-5 mb-5 container">
          <h3 className="mt-3 ml-3 mb-2">Your Addresses</h3>
          <button className="mb-5 ml-3" onClick={() => setModalShow(true)}>
            Add New
          </button>
          <Popup
            show={modalShow}
            onHide={() => setModalShow(false)}
            modelfor="address"
            edit={edit}
          />
          {address!=null?
          <div className="row mr-3 ml-3">

            {address?.map((el) => {
              return (
                <div className="col-4 w-25 bg-light border p-2" style={{margin:20}}>
                  <h6>{el.name}</h6>
                  <p>{`${el.address} ${el.state} ${el.pin} ${el.country}`}</p>
                  <p>
                    <span className="font-weight-bold">
                      Phone: {el.phoneNo}
                    </span>
                  </p>
                  <button
                    className="border-0 p-4"
                    style={{ backgroundColor: "transparent", color: "black" }}
                    onClick={() => setDefault(el._id)}
                  >
                    Set Default
                  </button>
                  {/* <button
                    onClick={() => handleEdit(el._id)}
                    className="border-0 p-4"
                    style={{ backgroundColor: "transparent", color: "black" }}
                  >
                    Edit
                  </button> */}
                  <button
                    className="border-0 p-4 "
                    onClick={() => removeAddress(el._id)}
                    style={{ backgroundColor: "transparent", color: "black" }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            {/* <div className="col-3 w-25 bg-light border p-2">
              <h6>Name</h6>
              <p>Address</p>
              <p>Phone</p>
              <button className="border-0">Edit</button>
              <button className="border-0">Remove</button>
              <button className="border-0">Set Default</button>
            </div>
            <div className="col-3 w-25 bg-light border p-2">
              <h6>Name</h6>
              <p>Address</p>
              <p>Phone</p>
              <button className="border-0">Edit</button>
              <button className="border-0">Remove</button>
              <button className="border-0">Set Default</button>
            </div>
            <div className="col-3 w-25 bg-light border p-2">
              <h6>Name</h6>
              <p>Address</p>
              <p>Phone</p>

            </div>
            <div className="col-3 w-25 bg-light border p-2">
              <h6>Name</h6>
              <p>Address</p>
              <p>Phone</p>
              <button className="border-0">Edit</button>
              <button className="border-0">Remove</button>
              <button className="border-0">Set Default</button>
            </div> */}
          </div>
           :
           <h3 style={{display:'flex',justifyContent:'center'}}>
           No address added
           </h3>
           }
        </div>


      </div>
      <Footer />
    </div>
  );
}

export default Address;
