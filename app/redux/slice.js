"use client"

const { createSlice, nanoid, current } = require("@reduxjs/toolkit");

const initialState = {
  cartData:JSON.parse(localStorage.getItem("newCartData")) ? JSON.parse(localStorage.getItem("newCartData")) : []
};
 
const Slice = createSlice({
  name: "addCartData",
  initialState,
  reducers: {
    addCartData: (state, action) => {
      console.log(action);
      const data = {
        id: nanoid(),
        name: action.payload,
      };
      state.cartData.push(data)

      let userData = JSON.stringify(current(state.cartData));
      localStorage.setItem("newCartData", userData)
    },

    removeData: (state, action) => {
      const updatedData = [...state.cartData];
      updatedData.splice(action.payload, 1);
      state.cartData = updatedData
      localStorage.setItem("newCartData", JSON.stringify(updatedData));
    }
  },
});

export const { addCartData, removeData } = Slice.actions;
export default Slice.reducer;
