import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Button } from "react-bootstrap";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { API } from "../API";
import { useAlert } from "react-alert";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { delteUserCart } from "../Actions/cartAction";
import Wallet from "./wallet";

function Paymentpage() {
  const alert = useAlert();
  const history = useHistory();
  const search = useLocation().search;
  const[loading,setLoading]=useState(false)

  // const amount = new URLSearchParams(search).get("amount");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [amount, setAmount] = useState("");
  const [orderData, setOrderData] = useState("");
  useEffect(() => handlePayment(), []);

  async function handlePayment() {
    const response = await axios.get(`${API}/api/order/${id}`);

    setOrderData(response.data.order);
    setAmount(response.data.order.Amount+response.data.order.shipping-response.data.order.amountOff)

    const res = await axios.post(
      `${API}/api/user/payment_gateway/payumoney`,
      {
        txnid: id,
        amount: amount,
        productinfo: "Shopping",
        // firstname: "Nirnay",
        // email: "nirnayrockjain@gmail.com",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setData(res.data);
    // const payment = await axios.patch(`${API}/api/order/update_order/${id}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // if (payment) {
    //   dispatch(delteUserCart());
    //   history.push("/payment-success");
    // }
  }
  const loadScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;

			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	};
  const makePayment = async () => {
		const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

		if (!res) {
      alert.show("Razor Pay SDK failed.", { type: "error" });


			return;
		}

    // const response = await axios.post(
    //   `${API}/razorpay`,
    //   {

    //     amount: amount,

    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

		const options = {
			key:"rzp_test_QZl686NiTx6lhk",
			amount: amount * 100,

			currency: "INR",
			name: "POP",
			description: "Order",
			image: "https://www.potionsofparadise.com/assets/images/k_favicon_32x.png",
			handler: function (response) {
				_paymentVerified(response.razorpay_payment_id);
			},
			prefill: {
				name: `${orderData.firstName} ${orderData.lastName}`,
				email: orderData.email,
				contact: orderData.phone,
			},
			theme: {
				color: "#00d4c6",
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};
  const _paymentVerified = async(paymentRefId) => {
    setLoading(true)
const res=	await axios.post( `${API}/api/razorpay/confirmPayment`,{
    orderId:id,
    amount:amount,
    paymentRefId:paymentRefId,
    email:orderData.email,
    userId:orderData.user
  })
  if(res.data.status=="Success")
  history.push(`/payment-success/${id}`)
  else
  history.push(`/payment-failed`)
};

  return (
    <div>
      {loading ?
       <Loader
       style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20%",
          marginTop: "10%",
        }}
       type="Circles"
       color="#0029ff"
       height={100}
       width={100}
       // timeout={3000} //3 secs
     />
      :
      <>
      <Header />
      <div
        className="container "
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20%",
          marginTop: "10%",
        }}
      >
        {data === null && amount === null ? (
          ""
        ) : (
          // <form action=" https://test.payu.in/_payment" method="POST">
          //   <input class="key" type="hidden" name="key" value={data.key} />
          //   <input class="txnid" type="hidden" name="txnid" value={id} />
          //   <input class="hash" type="hidden" name="hash" value={data.hash} />
          //   <input
          //     type="hidden"
          //     id="surl"
          //     value={`${API}/payment-success`}
          //     name="surl"
          //   />
          //   <input
          //     type="hidden"
          //     id="furl"
          //     value={`${API}/payment-failure`}
          //     name="furl"
          //   />
          //   <input class="amount" type="hidden" name="amount" value={amount} />
          //   <input
          //     class="con"
          //     type="hidden"
          //     name="phone"
          //     value={orderData.phone}
          //   />
          //   <input type="hidden" name="service_provider" value="payu_paisa" />
          //   <input
          //     type="hidden"
          //     class="product"
          //     name="productinfo"
          //     value="Shopping"
          //   />
          //   <input type="hidden" class="udf1" name="udf1" value={data.userId} />
          //   <input
          //     class="firstname"
          //     type="hidden"
          //     name="firstname"
          //     value={data.firstName}
          //   />
          //   <input
          //     class="email"
          //     type="hidden"
          //     name="email"
          //     value={data.email}
          //   />

            <div className="row">
              <Wallet />

              <a href="/">
                <Button variant="warning" size="lg">
                  Cancel
                </Button>
              </a>
            </div>
          // </form>
        )}
      </div>
      <Footer />
      </>
      }
    </div>
  );
}

export default Paymentpage;
