import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../redux/reducers/reducers";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    // Use getDefaultMiddleware to return the default array of middleware,
    // and then you can add additional middleware such as thunk.
    return getDefaultMiddleware().concat(thunk);
  },
});

export default store;
