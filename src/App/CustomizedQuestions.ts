import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Question } from "./PersonalInformationSlice";

const CUSTOMIZED_QUESTIONS_INITAL_STATE: Question[] = [];
export const CustomisedQuestionsSlice = createSlice({
  name: "customizedQuestions",
  initialState: CUSTOMIZED_QUESTIONS_INITAL_STATE,
  reducers: {
    fetchCustomizedQuestions: (_state: Question[], action: PayloadAction<Question[]>) => {
      return action.payload;
    },
    setCustomizedQuestions: (state: Question[], action: PayloadAction<{ question: Question; delete: boolean }>) => {
      let filteredData = state.filter((q) => q.id != action.payload.question.id);
      if (!action.payload.delete) {
        return [...filteredData, action.payload.question];
      } else {
        return [...filteredData];
      }
    },
  },
});

export const { setCustomizedQuestions, fetchCustomizedQuestions } = CustomisedQuestionsSlice.actions;
