import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {},
};


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.order = action.payload;
        },

        removeOrder: (state) => {
            state.order = {};
        },
    },
});


export const { addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
