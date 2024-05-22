import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/action_types";
import { addProductToCart, removeProductFromCart } from "./reducerUtils";

const initialCartState = {
  cart: [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: addProductToCart(state.cart, action.payload.product),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: removeProductFromCart(state.cart, action.payload.productId),
      };
    default:
      return state;
  }
};

export default cartReducer;
