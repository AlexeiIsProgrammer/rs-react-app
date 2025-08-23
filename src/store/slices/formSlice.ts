import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FormData, FormState} from "../../types";

const initialState: FormState = {
  submissions: [],
  countries: ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Brazil", "India", "China"],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormData>) => {
      state.submissions.push(action.payload);
    },
    clearSubmissions: (state) => {
      state.submissions = [];
    },
  },
});

export const {addSubmission, clearSubmissions} = formSlice.actions;
export default formSlice.reducer;
