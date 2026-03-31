import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from  "./connectionsSlice";
import requestsReducer from "./requestsSlice";
import sentReducer from "./sentSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        requests: requestsReducer,
        sent: sentReducer,
    }
});

export default appStore;