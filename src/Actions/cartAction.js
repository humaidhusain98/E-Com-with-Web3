import axios from "axios";
import { useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_USER_CART,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
  VIEW_CART,
} from "../ActionTypes/cartActiontype";
import { API } from "../API";

const token = localStorage.getItem("token");

export const viewCart = () => {
  let totalPrice = 0;
  let totalQuantity = 0;
  const token = localStorage.getItem("token");

  if (!token) {
    return function (dispatch) {
      const cartItems = JSON.parse(localStorage.getItem("cartData"));
      console.log(cartItems);
      cartItems?.map((item) => {
        totalPrice += item.sale_price * 1 * item.quantity * 1;

      });
      totalQuantity =cartItems?.length;
      dispatch(viewCartSuccess(cartItems, totalPrice, totalQuantity));
    };
  }
  return function (dispatch) {
    axios
      .get(`${API}/api/cart/view_cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("carts",response.data);
        response.data?.cartItems.map((item) => {
          totalPrice += item.product?.sale_price * 1 * item.quantity * 1;

        });
        totalQuantity =response.data?.cartItems.length
        const cartItems = response.data;
        dispatch(viewCartSuccess(cartItems, totalPrice, totalQuantity));
      });
  };
};

export const viewCartSuccess = (dataItems, totalPrice, totalQuantity) => {
  console.log(dataItems);
  return {
    type: VIEW_CART,
    payload: dataItems,
    totalPrice,
    totalQuantity,
  };
};

export const addToCart = (id,productQuantity) => {
  let totalPrice = 0;
  let totalQuantity = 0;
  let cartProduct;
  const cartData = JSON.parse(localStorage.getItem("cartData"));
  const token = localStorage.getItem("token");
  if (cartData) {
    cartProduct = cartData;
  } else {
    cartProduct = [];
  }

  if (!token) {

    return function (dispatch) {
      axios.get(`${API}/api/product/${id}`).then((product) => {
        let cartItemDetail = {
          _id: product.data.product._id,
          title: product.data.product.title,
          price: product.data.product.price,
          sale_price: product.data.product.sale_price,
          image: product.data.product.image,
          featuredImage:product.data.product.featuredImage,
          tax:product.data.product.tax,
          quantity: productQuantity,
        };

        if (cartProduct.length > 0) {
          let cartItem = cartProduct.filter((item) => {
            return item._id === cartItemDetail._id;
          });

          if (cartItem.length > 0) {
            let updatecartItemDetail = {
              _id: cartItem[0]._id,
              title: cartItem[0].title,
              price: cartItem[0].price,
              sale_price: cartItem[0].sale_price,
              image: cartItem[0].image,
              featuredImage:cartItem[0].featuredImage,
              quantity: cartItem[0].quantity + productQuantity,
            };
            let index = cartProduct.findIndex((item) => {
              return item._id == cartItem[0]._id;
            });
            cartProduct.splice(index, 1, updatecartItemDetail);
          } else {
            cartProduct.push(cartItemDetail);
          }
        } else {
          cartProduct.push(cartItemDetail);
        }
        cartProduct.map((item) => {
          totalPrice += item.sale_price * 1 * item.quantity * 1;

        });
        totalQuantity = cartProduct.length;

        localStorage.setItem("cartData", JSON.stringify(cartProduct));
        let cart = localStorage.getItem("cartData");
        dispatch(addToCartSuccess(cart, totalPrice, totalQuantity));
      });
    };
  } else {
    console.log(id);
    return function (dispatch) {
      axios
        .post(
          `${API}/api/cart/add_product`,
          {
            product: id,
            quantity:productQuantity
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          response.data.data.cartItems.map((item) => {
            totalPrice += item.product.sale_price * 1 * item.quantity * 1;

          });
          totalQuantity = response.data.data.cartItems.length;
          dispatch(
            addToCartSuccess(response.data.message, totalPrice, totalQuantity)
          );
        });
    };
  }
};

export const addToCartSuccess = (message, totalPrice, totalQuantity) => {
  return {
    type: ADD_TO_CART,
    payload: message,
    totalPrice,
    totalQuantity,
  };
};

export const removeFromCart = (id) => {
  let totalPrice = 0;
  let totalQuantity = 0;
  const token = localStorage.getItem("token");

  if (!token) {
    return function (dispatch) {
      const cartItems = JSON.parse(localStorage.getItem("cartData"));
      const product = cartItems.filter((item) => {
        return item._id === id;
      });

      let index = cartItems.findIndex((item) => {
        return item._id == product[0]._id;
      });
      cartItems.splice(index, 1);
      localStorage.setItem("cartData", JSON.stringify(cartItems));
      dispatch(
        removeFromCartSuccess(
          "ITEM REMOVED FROM CART",
          totalPrice,
          totalQuantity
        )
      );
    };
  }
  return function (dispatch) {
    axios
      .delete(`${API}/api/cart/remove_product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        response.data.cart?.cartItems.map((item) => {
          totalPrice += item.product.sale_price * 1 * item.quantity * 1;

        });
        totalQuantity= response.data.cart?.cartItems.length
        dispatch(
          removeFromCartSuccess(
            response.data.message,
            totalPrice,
            totalQuantity
          )
        );
      });
  };
};

export const removeFromCartSuccess = (message, totalPrice, totalQuantity) => {
  return {
    type: REMOVE_FROM_CART,
    payload: message,
    totalPrice,
    totalQuantity,
  };
};

export const increseQuant = (id) => {
  let totalPrice = 0;
  let totalQuantity = 0;
  const token = localStorage.getItem("token");

  if (!token) {
    return function (dispatch) {
      let cart = JSON.parse(localStorage.getItem("cartData"));
      let product = cart.filter((item) => {
        return item._id === id;
      });
      console.log(product)
      let cartItemDetail = {
        _id: product[0]._id,
        title: product[0].title,
        price: product[0].price,
        sale_price: product[0].sale_price,
        image: product[0].image,
        featuredImage:product[0].featuredImage,
        quantity: product[0].quantity + 1,
      };
      let index = cart.findIndex((item) => {
        return item._id == product[0]._id;
      });
      cart.splice(index, 1, cartItemDetail);

      localStorage.setItem("cartData", JSON.stringify(cart));
      dispatch(
        increseQuantSuccess("INCREASED QUANTITY", totalPrice, totalQuantity)
      );
    };
  } else {
    return function (dispatch) {
      axios
        .post(
          `${API}/api/cart/update_product`,
          {
            update: "add",
            product: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          response.data.cart.cartItems.map((item) => {
            console.log(item);
            totalPrice += item.product.sale_price * 1 * item.quantity * 1;

          });
          totalQuantity= response.data.cart?.cartItems.length
          dispatch(
            increseQuantSuccess(
              response.data.message,
              totalPrice,
              totalQuantity
            )
          );
        });
    };
  }
};

export const increseQuantSuccess = (message, totalPrice, totalQuantity) => {
  return {
    type: INCREASE_QUANTITY,
    payload: message,
    totalPrice,
    totalQuantity,
  };
};

export const decreaseQuant = (id) => {
  let totalPrice = 0;
  let totalQuantity = 0;
  const token = localStorage.getItem("token");

  if (!token) {
    return function (dispatch) {
      let cart = JSON.parse(localStorage.getItem("cartData"));
      let product = cart.filter((item) => {
        return item._id === id;

      });
      if(product[0].quantity===1){
        let index = cart.findIndex((item) => {
          return item._id == product[0]._id;
        });

        cart.splice(index, 1);
        localStorage.setItem("cartData", JSON.stringify(cart));

      }
else{
  let cartItemDetail = {
    _id: product[0]._id,
    title: product[0].title,
    price: product[0].price,
    sale_price: product[0].sale_price,
    image: product[0].image,
    featuredImage:product[0].featuredImage,
    quantity: product[0].quantity - 1,
  };
  let index = cart.findIndex((item) => {
    return item._id == product[0]._id;
  });
  cart.splice(index, 1, cartItemDetail);

  localStorage.setItem("cartData", JSON.stringify(cart));
}

      dispatch(
        decreaseQuantSuccess("Decreased Quantity", totalPrice, totalQuantity)
      );
    };
  } else {
    return function (dispatch) {
      axios
        .post(
          `${API}/api/cart/update_product`,
          {
            update: "delete",
            product: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch(
            decreaseQuantSuccess(
              response.data.message,
              totalPrice,
              totalQuantity
            )
          );
        });
    };
  }
};

export const decreaseQuantSuccess = (message, totalPrice, totalQuantity) => {
  return {
    type: DECREASE_QUANTITY,
    payload: message,
    totalPrice,
    totalQuantity,
  };
};

export const delteUserCart = () => {
  return {
    type: DELETE_USER_CART,
    payload: "",
  };
};
