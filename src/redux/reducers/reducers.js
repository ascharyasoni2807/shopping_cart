import { combineReducers } from "redux";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
} from "../actions/action_types";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const categoryInitialState = {
  categories: [],
  loading: false,
};
const categoriesReducer = (state = categoryInitialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

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
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  categoriesReducer,
});

export default rootReducer;
