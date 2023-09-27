import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PersonalInformationSlice } from "./PersonalInformationSlice";
import { ProfileSlice } from "./ProfileSlice";
import { CustomisedQuestionsSlice } from "./CustomizedQuestions";
import { CoverImageSlice } from "./CoverImageSlice";

export const store = configureStore({
  reducer: {
    coverImage: CoverImageSlice.reducer,
    personalInformation: PersonalInformationSlice.reducer,
    profile: ProfileSlice.reducer,
    customozedQuestions: CustomisedQuestionsSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
