import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  VIEW_WISHLIST,
} from "../ActionTypes/wishlishActiontype";

const initialState = {
  wishlistItems: [],
  message: "",
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_WISHLIST:
      return {
        ...state,
        wishlistItems: action.payload,
        totalQuantity: action.totalQuantity
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlistItems: action.payload,
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems,
        message: action.payload,
      };
    default:
      return state;
  }
};
export default wishlistReducer;
