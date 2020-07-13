import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    base: "small",
    crust: "classic_thin",
    sauce: "no_sauce",
    cheese: "no_cheese",
  },
  reducers: {
    chooseBase: (state, action) => {
      state.base = action.payload;
    },
    chooseCrust: (state, action) => {
      state.crust = action.payload;
    },
    chooseSauce: (state, action) => {
      state.sauce = action.payload;
    },
    chooseCheese: (state, action) => {
      state.cheese = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const selectBase = (state: { order: any }) => state.order.base;
export const selectCrust = (state: { order: any }) => state.order.crust;
export const selectSauce = (state: { order: any }) => state.order.sauce;
export const selectCheese = (state: { order: any }) => state.order.cheese;
export const selectOrder = (state: { order: any }) => state.order;
export const {
  chooseBase,
  chooseCheese,
  chooseCrust,
  chooseSauce,
} = orderSlice.actions;
