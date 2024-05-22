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
const categoriesEndPoint = "https://dummyjson.com/products/categories";

//So i am writing here only , we can have separate folder for services. Utility function for making API calls
const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const fetchProductList = (category) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const endpoint = category
        ? categoryProductListEndPoint(category)
        : productListEndPoint;
      const data = await fetchData(endpoint);
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: data?.products,
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
      const data = await fetchData(categoriesEndPoint);
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: data,
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
