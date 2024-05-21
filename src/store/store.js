import { configureStore } from "@reduxjs/toolkit";

import { thunk } from "redux-thunk";
import rootReducer from "../redux/reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk);
  },
});

export default store;
