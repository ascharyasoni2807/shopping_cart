import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actions/action_types";

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

export default categoriesReducer;
