import { createSlice } from "@reduxjs/toolkit";

const sentRequestSlice = createSlice({
  name: "sentRequest",
  initialState: null,
  reducers: {
    addSentRequests: (state, action) => action.payload,
    removeSentRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addSentRequests, removeSentRequest } = sentRequestSlice.actions;
export default sentRequestSlice.reducer;
