import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { DataSlice } from "./DataSlice";

export const store = configureStore({
  reducer: {
    data: DataSlice.reducer,
    // coverImage: CoverImageSlice.reducer,
    // personalInformation: PersonalInformationSlice.reducer,
    // profile: ProfileSlice.reducer,
    // customozedQuestions: CustomisedQuestionsSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
