import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import uuid from "react-uuid";

export interface State {
  isLoading: boolean;
  error: boolean;
  data: Data;
}
export interface Data {
  coverImage: string;
  personalInformation: Personal;
  profile: {
    education: ProfileOptions;
    experience: ProfileOptions;
    resume: ProfileOptions;
    profileQuestions: Question[];
  };
  customisedQuestions: Question[];
}
export interface Personal {
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
export interface Question {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: Number;
  disqualify: boolean;
  other: boolean;
}
export interface Options {
  mandatory: boolean;
  show: boolean;
}
export interface ProfileOptions {
  mandatory: boolean;
  show: boolean;
}
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
const initialState: State = {
  isLoading: true,
  error: false,
  data: {
    coverImage: "",
    personalInformation: {
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
    },
    profile: {
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
    },
    customisedQuestions: [],
  },
};
export const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCoverImageUrl: (state: State, action: PayloadAction<string>) => {
      return { ...state, data: { ...state.data, coverImage: action.payload } };
    },
    setPersonalInformation: (state: State, action: PayloadAction<{ propName: keyof PersonalInformation; options: PersonalInformationPropertyOptions }>) => {
      return { ...state, data: { ...state.data, personalInformation: { ...state.data.personalInformation, [action.payload.propName]: action.payload.options } } };
    },
    setPersonalInformationQuestions: (state: State, action: PayloadAction<{ question: Question; delete: boolean }>) => {
      let filteredData = state.data.personalInformation.personalQuestions.filter((q) => q.id != action.payload.question.id);
      if (!action.payload.delete) {
        return { ...state, data: { ...state.data, personalInformation: { ...state.data.personalInformation, personalQuestions: [...filteredData, action.payload.question] } } };
      } else {
        return { ...state, data: { ...state.data, personalInformation: { ...state.data.personalInformation, personalQuestions: [...filteredData] } } };
      }
    },
    setProfileOptions: (state: State, action: PayloadAction<{ edu: ProfileOptions; exp: ProfileOptions; res: ProfileOptions }>) => {
      return { ...state, data: { ...state.data, profile: { ...state.data.profile, education: action.payload.edu, experience: action.payload.exp, resume: action.payload.res } } };
    },
    setProfileQuestions: (state: State, action: PayloadAction<{ question: Question; delete: boolean }>) => {
      let filteredData = state.data.profile.profileQuestions.filter((q) => q.id != action.payload.question.id);
      if (!action.payload.delete) {
        return { ...state, data: { ...state.data, profile: { ...state.data.profile, profileQuestions: [...filteredData, action.payload.question] } } };
      } else {
        return { ...state, data: { ...state.data, profile: { ...state.data.profile, profileQuestions: [...filteredData] } } };
      }
    },
    setCustomizedQuestions: (state: State, action: PayloadAction<{ question: Question; delete: boolean }>) => {
      let filteredData = state.data.customisedQuestions.filter((q) => q.id != action.payload.question.id);
      if (!action.payload.delete) {
        return { ...state, data: { ...state.data, customisedQuestions: [...filteredData, action.payload.question] } };
      } else {
        return { ...state, data: { ...state.data, customisedQuestions: [...filteredData] } };
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state: State) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state: State, action: PayloadAction<Data>) => {
      const { coverImage, personalInformation, profile, customisedQuestions } = action.payload;
      // fetching available data
      state.data.coverImage = coverImage || "";
      state.data.personalInformation.firstName = { ...state.data.personalInformation.firstName, ...personalInformation.firstName };
      state.data.personalInformation.lastName = { ...state.data.personalInformation.lastName, ...personalInformation.lastName };
      state.data.personalInformation.emailId = { ...state.data.personalInformation.emailId, ...personalInformation.emailId };
      state.data.personalInformation.phoneNumber = { ...state.data.personalInformation.phoneNumber, ...personalInformation.phoneNumber };
      state.data.personalInformation.nationality = { ...state.data.personalInformation.nationality, ...personalInformation.nationality };
      state.data.personalInformation.currentResidence = { ...state.data.personalInformation.currentResidence, ...personalInformation.currentResidence };
      state.data.personalInformation.idNumber = { ...state.data.personalInformation.idNumber, ...personalInformation.idNumber };
      state.data.personalInformation.dateOfBirth = { ...state.data.personalInformation.dateOfBirth, ...personalInformation.dateOfBirth };
      state.data.personalInformation.gender = { ...state.data.personalInformation.gender, ...personalInformation.gender };
      state.data.personalInformation.personalQuestions = [...state.data.personalInformation.personalQuestions, ...personalInformation.personalQuestions];
      state.data.profile.education = { ...state.data.profile.education, ...profile.education };
      state.data.profile.experience = { ...state.data.profile.experience, ...profile.experience };
      state.data.profile.resume = { ...state.data.profile.resume, ...profile.resume };
      state.data.profile.profileQuestions = [...state.data.profile.profileQuestions, ...profile.profileQuestions];
      state.data.customisedQuestions = [...state.data.customisedQuestions, ...customisedQuestions];
      state.isLoading = false;

      // console.log("Data fetched but I think there are some errors with the server fetched data so I will continue with inital state === NULL");
      // Object.assign(state.data, action.payload);
      // return { ...state, isLoading: false, data: { ...state.data, ...action.payload } };
      // return { isLoading: false, error: false, data: action.payload };
    });
    builder.addCase(fetchData.rejected, (state: State) => {
      state.error = true;
      console.log(Error("Error With Fetching Data"));
    });
    builder.addCase(sendData.pending, (_state: State) => {
      console.log("Pending Sending Data....");
    });
    builder.addCase(sendData.fulfilled, (_state: State) => {
      console.log("Finished Sending Data....");
    });
    builder.addCase(sendData.rejected, (_state: State) => {
      console.log(Error("Error With Sending Data"));
    });
  },
});

export const { setCoverImageUrl, setProfileOptions, setCustomizedQuestions, setPersonalInformation, setPersonalInformationQuestions, setProfileQuestions } = DataSlice.actions;
export default DataSlice.reducer;

interface RootState {
  data: {
    isLoading: boolean;
    error: boolean;
    data: Data;
  };
}

export const sendData = createAsyncThunk("State/sendData", async (_arg, { getState }) => {
  try {
    const data = (getState() as RootState).data.data;

    const response = await axios.put(
      "http://127.0.0.1:4010/api/386.70804606338396/programs/eos/application-form",
      {
        data: { id: uuid(), type: "applicationForm", attributes: data },
      },
      { headers: { Accept: "application/json", "Content-Type": "application/json" } }
    );
    console.log(response);
  } catch {
    console.log(Error("Error with Sending State"));
  }
});

export const fetchData = createAsyncThunk("State/fetchData", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:4010/api/39.93939846974685/programs/at/application-form");
    const data = await response.data.data.attributes;
    return data;
  } catch {
    console.log(Error("Error Fetching Data Reseting All Data..."));
  }
});
