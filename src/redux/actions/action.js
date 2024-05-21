import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
} from "./action_types";

// defining these here only , more to focus on functionality
const productListEndPoint = "https://dummyjson.com/products";
const categoryProductListEndPoint = (category) =>
  `https://dummyjson.com/products/category/${category}`;

export const fetchProductList = (category) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const endpoint = category
        ? categoryProductListEndPoint(category)
        : productListEndPoint;
      fetch(endpoint)
        .then((res) => res.json())
        .then((json) => {
          dispatch({
            type: FETCH_DATA_SUCCESS,
            payload: json?.products,
          });
        });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
      const endpoint = "https://dummyjson.com/products/categories";
      console.log("enene", endpoint);
      fetch(endpoint)
        .then((res) => res.json())
        .then((json) => {
          dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: json,
          });
        });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
    }
  };
};

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: { product },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: { productId },
});
