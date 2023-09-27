import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PersonalInformation from "../components/PersonalInformation";

export interface PersonalInformation {
  firstName: PersonalInformationPropertyOptions;
  lastName: PersonalInformationPropertyOptions;
  emailId: PersonalInformationPropertyOptions;
  phoneNumber: PersonalInformationPropertyOptions;
  nationality: PersonalInformationPropertyOptions;
  currentResidence: PersonalInformationPropertyOptions;
  idNumber: PersonalInformationPropertyOptions;
  dateOfBirth: PersonalInformationPropertyOptions;
  gender: PersonalInformationPropertyOptions;
  personalQuestions: Question[];
}
export interface PersonalInformationPropertyOptions {
  value: string;
  internalUse: boolean;
  show: boolean;
}
export interface Question {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: Number;
  disqualify: boolean;
  other: boolean;
}
const PERSONAL_INFORMATION_INITAIL_STATE: PersonalInformation = {
  firstName: {
    value: "",
    internalUse: false,
    show: true,
  },
  lastName: {
    value: "",
    internalUse: false,
    show: true,
  },
  emailId: {
    value: "",
    internalUse: false,
    show: true,
  },
  phoneNumber: {
    value: "",
    internalUse: false,
    show: false,
  },
  nationality: {
    value: "",
    internalUse: false,
    show: false,
  },
  currentResidence: {
    value: "",
    internalUse: false,
    show: false,
  },
  idNumber: {
    value: "",
    internalUse: false,
    show: false,
  },
  dateOfBirth: {
    value: "",
    internalUse: false,
    show: false,
  },
  gender: {
    value: "",
    internalUse: false,
    show: false,
  },
  personalQuestions: [],
};

export const PersonalInformationSlice = createSlice({
  name: "personalInformation",
  initialState: PERSONAL_INFORMATION_INITAIL_STATE,
  reducers: {
    setPersonalInformation: (state: PersonalInformation, action: PayloadAction<{ propName: keyof PersonalInformation; options: PersonalInformationPropertyOptions }>) => {
      return { ...state, [action.payload.propName]: action.payload.options };
    },
    fetchPersonalInformation: (_state: PersonalInformation, action: PayloadAction<PersonalInformation>) => {
      return action.payload;
    },
    setPersonalInformationQuestions: (state: PersonalInformation, action: PayloadAction<{ question: Question; delete: boolean }>) => {
      let filteredData = state.personalQuestions.filter((q) => q.id != action.payload.question.id);
      if (!action.payload.delete) {
        return { ...state, personalQuestions: [...filteredData, action.payload.question] };
      } else {
        return { ...state, personalQuestions: [...filteredData] };
      }
    },
  },
});

export const { setPersonalInformation, fetchPersonalInformation, setPersonalInformationQuestions } = PersonalInformationSlice.actions;
