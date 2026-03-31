import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state, action) => {return action.payload;},
        removeRequests: (state, action) => {return null;},
        removeSingleRequest: (state, action) => {
            const newArr = state.filter((r) => r._id !== action.payload);
            return newArr; 
        }
    }
});

export const {addRequests, removeRequests, removeSingleRequest} = requestsSlice.actions;
export default requestsSlice.reducer;