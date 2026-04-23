import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import sentRequestReducer from "./sentRequestSlice";

const appStore = configureStore(
  {
    reducer: {
      user: userReducer,
      feed: feedReducer,
      connections: connectionReducer,
      requests: requestReducer,
      sentRequest: sentRequestReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default appStore;
