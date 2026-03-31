import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers : {
        addFeed : (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            return null;
        },
        removeSingleUserFeed: (state, action) => {
            const newArr = state.filter((r) => r._id !== action.payload);
            return newArr;
        }
    }
});

export const {addFeed, removeFeed, removeSingleUserFeed} = feedSlice.actions;
export default feedSlice.reducer;