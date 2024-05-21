import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  categoriesReducer,
});

export default rootReducer;
