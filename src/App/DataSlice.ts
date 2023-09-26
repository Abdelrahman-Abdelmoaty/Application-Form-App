import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import uuid from "react-uuid";

export interface State {
  coverImage: string;
  personalInformation: {
    firstName: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    lastName: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    emailId: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    phoneNumber: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    nationality: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    currentResidence: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    idNumber: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    dateOfBirth: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    gender: {
      value: string;
      internalUse: boolean;
      show: boolean;
    };
    personalQuestions: any[];
  };
  profile: {
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
    profileQuestions: any[];
  };
  customisedQuestions: any[];
}

const initialState: State = {
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
};

interface PayloadType {
  propName: keyof State["personalInformation"];
  value: string;
  internalUse?: boolean;
  show?: boolean;
}

export const DataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    setCoverImageUrl: (state, action) => {
      state.coverImage = action.payload;
    },
    setPersonalProp: (state, action: PayloadAction<PayloadType>) => {
      const { propName, value, internalUse, show } = action.payload;
      (state.personalInformation[propName] as { value: string; internalUse?: boolean; show?: boolean }).value = value;
      (state.personalInformation[propName] as { value: string; internalUse?: boolean; show?: boolean }).internalUse = internalUse;
      (state.personalInformation[propName] as { value: string; internalUse?: boolean; show?: boolean }).show = show;
    },
    setQuestions: (state, action) => {
      switch (action.payload.type) {
        case "personal": {
          let filteredData = state.personalInformation.personalQuestions.filter((q) => q.id !== action.payload.newQuestion.id);
          state.personalInformation.personalQuestions = [...filteredData, action.payload.newQuestion];
          break;
        }
        case "profile": {
          let filteredData = state.profile.profileQuestions.filter((q) => q.id !== action.payload.newQuestion.id);
          state.profile.profileQuestions = [...filteredData, action.payload.newQuestion];
          break;
        }
        case "customized": {
          let filteredData = state.customisedQuestions.filter((q) => q.id !== action.payload.newQuestion.id);
          state.customisedQuestions = [...filteredData, action.payload.newQuestion];
          break;
        }
      }
    },
    deleteQuestion: (state, action) => {
      switch (action.payload.type) {
        case "personal": {
          let filteredData = state.personalInformation.personalQuestions.filter((q) => q.id !== action.payload.questionId);
          state.personalInformation.personalQuestions = filteredData;
          break;
        }
        case "profile": {
          let filteredData = state.profile.profileQuestions.filter((q) => q.id !== action.payload.questionId);
          state.profile.profileQuestions = filteredData;
          break;
        }
        case "customized": {
          let filteredData = state.customisedQuestions.filter((q) => q.id !== action.payload.questionId);
          state.customisedQuestions = filteredData;
        }
      }
    },
    setProfileOptions: (state, action) => {
      state.profile.education = action.payload.edu;
      state.profile.experience = action.payload.exp;
      state.profile.resume = action.payload.res;
    },
    sendDataDisaptch: (state) => {
      sendData(state);
    },
  },
});

export const { sendDataDisaptch, setCoverImageUrl, setPersonalProp, setProfileOptions, setQuestions, deleteQuestion } = DataSlice.actions;
export default DataSlice.reducer;

async function sendData(data: State) {
  try {
    const response = await axios.put("http://127.0.0.1:4010/api/222.93876273079638/programs/ut/application-form", {
      data: { id: uuid(), type: "applicationForm", attributes: data },
    });
    console.log(response);
  } catch {
    console.log(Error("Error with Sending Data"));
  }
}
