import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  LOAD_MORE_DATA_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "./action_types";

export const fetchOrLoadMoreProducts = (loadMore = false) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const state = getState();
      const currentPage = state.currentPage;
      const offset = (currentPage - 1) * 10;
      const endpoint = "https://dummyjson.com/products";
      fetch(endpoint, {
        limit: 10,
        offset: offset,
      })
        .then((res) => res.json())
        .then((json) => {
          if (loadMore) {
            dispatch({
              type: LOAD_MORE_DATA_SUCCESS,
              payload: json?.products,
            });
          } else {
            dispatch({
              type: FETCH_DATA_SUCCESS,
              payload: json?.products,
            });
          }
        });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
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
