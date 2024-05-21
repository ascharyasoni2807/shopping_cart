import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/action_types";

const initialCartState = {
  cart: [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { product } = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        return {
          ...state,
          cart: state.cart.map((item, index) => {
            if (index === existingProductIndex) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      const productIndex = state.cart.findIndex(
        (item) => item.id === action.payload.productId
      );
      if (productIndex !== -1) {
        const updatedCart = [...state.cart];
        if (updatedCart[productIndex].quantity > 1) {
          updatedCart[productIndex] = {
            ...updatedCart[productIndex],
            quantity: updatedCart[productIndex].quantity - 1,
          };
        } else {
          updatedCart.splice(productIndex, 1);
        }
        return {
          ...state,
          cart: updatedCart,
        };
      }
      break;
    default:
      return state;
  }
};

export default cartReducer;
