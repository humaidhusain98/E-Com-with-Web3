import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_USER_CART,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
  VIEW_CART,
} from "../ActionTypes/cartActiontype";

const initialState = {
  loading: false,
  cartItems: [],
  error: "",
  message: "",
  totalPrice: 0,
  totalQuantity: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_CART:
      return {
        ...state,
        loading: true,
        cartItems: action.payload,
        totalPrice: action.totalPrice,
        totalQuantity: action.totalQuantity,
      };

    case ADD_TO_CART:
      return {
        ...state,
        loading: true,
        cartItems: action.payload,
        totalPrice: action.totalPrice,
        totalQuantity: action.totalQuantity,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        loading: true,
        message: action.payload,
        totalPrice: action.totalPrice,
        totalQuantity: action.totalQuantity,
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        loading: true,
        message: action.payload,
        totalPrice: action.totalPrice,
        totalQuantity: action.totalQuantity,
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        loading: true,
        message: action.payload,
        totalPrice: action.totalPrice,
        totalQuantity: action.totalQuantity,
      };

    case DELETE_USER_CART:
      return {
        ...state,
        loading: true,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
