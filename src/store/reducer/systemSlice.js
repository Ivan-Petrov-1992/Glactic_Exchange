import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gala_price: 0,
  eth_price: 2,
  btc_price: 3,
  bnb_price: 4,
  gala_locked: 0,
  eth_locked: 0,
  bnb_locked: 0,
  btc_locked: 0,
  initial_ratio: 0,
};

export const systemSlice = createSlice({
  name: "sys",
  initialState,
  reducers: {
    setGalaPrice: (state, action) => {
      state.gala_price = action.payload;
    },
    setEthPrice: (state, action) => {
      state.eth_price = action.payload;
    },
    setBNBPrice: (state, action) => {
      state.bnb_price = action.payload;
    },
    setBTCPrice: (state, action) => {
      state.btc_price = action.payload;
    },
    setGalaLocked: (state, action) => {
      state.gala_locked = action.payload;
    },
    setEthLocked: (state, action) => {
      state.eth_locked = action.payload;
    },
    setBnbLocked: (state, action) => {
      state.bnb_locked = action.payload;
    },
    setBtcLocked: (state, action) => {
      state.btc_locked = action.payload;
    },
  },
});

export const {
  setGalaPrice,
  setEthPrice,
  setBNBPrice,
  setBTCPrice,
  setGalaLocked,
  setBnbLocked,
  setBtcLocked,
  setEthLocked,
} = systemSlice.actions;

export default systemSlice.reducer;
