import { createSlice } from "@reduxjs/toolkit";

const sentSlice = createSlice({
    name: 'sent',
    initialState: null,
    reducers: {
        addSentRequests: (state, action) => {return action.payload;},
        removeSentRequests: (state, action) => {return null;}
    }
});

export const {addSentRequests, removeSentRequests} = sentSlice.actions;
export default sentSlice.reducer;