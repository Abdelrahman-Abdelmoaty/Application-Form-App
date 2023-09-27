import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Question } from "./PersonalInformationSlice";

interface Profile {
  education: {
    mandatory: boolean;
    show: boolean;
  };
  experience: {
    mandatory: boolean;
    show: boolean;
  };
  resume: {
    mandatory: boolean;
    show: boolean;
  };
  profileQuestions: Question[];
}

const PROFILE_INITAL_STATE: Profile = {
  education: {
    mandatory: false,
    show: false,
  },
  experience: {
    mandatory: false,
    show: false,
  },
  resume: {
    mandatory: false,
    show: false,
  },
  profileQuestions: [],
};
interface ProfileOptions {
  mandatory: boolean;
  show: boolean;
}

export const ProfileSlice = createSlice({
  name: "profileSlice",
  initialState: PROFILE_INITAL_STATE,
  reducers: {
    setProfileOptions: (state, action: PayloadAction<{ edu: ProfileOptions; exp: ProfileOptions; res: ProfileOptions }>) => {
      return { ...state, education: action.payload.edu, experience: action.payload.exp, resume: action.payload.res };
    },
    fetchProfile: (_state: Profile, action: PayloadAction<Profile>) => {
      return action.payload;
    },
    setProfileQuestions: (state: Profile, action: PayloadAction<{ question: Question; delete: boolean }>) => {
      let filteredData = state.profileQuestions.filter((q) => q.id != action.payload.question.id);
      if (!action.payload.delete) {
        return { ...state, profileQuestions: [...filteredData, action.payload.question] };
      } else {
        return { ...state, profileQuestions: [...filteredData] };
      }
    },
  },
});

export const { setProfileOptions, setProfileQuestions, fetchProfile } = ProfileSlice.actions;
