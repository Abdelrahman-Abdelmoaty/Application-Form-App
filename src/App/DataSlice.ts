// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import uuid from "react-uuid";

// export interface State {
//   isLoading: boolean;
//   error: boolean;
//   data: Data;
// }
// export interface Data {
//   coverImage: string;
//   personalInformation: Personal;
//   profile: {
//     education: {
//       mandatory: boolean;
//       show: boolean;
//     };
//     experience: {
//       mandatory: boolean;
//       show: boolean;
//     };
//     resume: {
//       mandatory: boolean;
//       show: boolean;
//     };
//     profileQuestions: Question[];
//   };
//   customisedQuestions: Question[];
// }
// export interface Personal {
//   firstName: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   lastName: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   emailId: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   phoneNumber: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   nationality: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   currentResidence: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   idNumber: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   dateOfBirth: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   gender: {
//     value: string;
//     internalUse: boolean;
//     show: boolean;
//   };
//   personalQuestions: Question[];
// }
// export interface Question {
//   id: string;
//   type: string;
//   question: string;
//   choices: string[];
//   maxChoice: Number;
//   disqualify: boolean;
//   other: boolean;
// }
// export interface Options {
//   mandatory: boolean;
//   show: boolean;
// }
// const initialState: State = {
//   isLoading: true,
//   error: false,
//   data: {
//     coverImage: "",
//     personalInformation: {
//       firstName: {
//         value: "",
//         internalUse: false,
//         show: true,
//       },
//       lastName: {
//         value: "",
//         internalUse: false,
//         show: true,
//       },
//       emailId: {
//         value: "",
//         internalUse: false,
//         show: true,
//       },
//       phoneNumber: {
//         value: "",
//         internalUse: false,
//         show: false,
//       },
//       nationality: {
//         value: "",
//         internalUse: false,
//         show: false,
//       },
//       currentResidence: {
//         value: "",
//         internalUse: false,
//         show: false,
//       },
//       idNumber: {
//         value: "",
//         internalUse: false,
//         show: false,
//       },
//       dateOfBirth: {
//         value: "",
//         internalUse: false,
//         show: false,
//       },
//       gender: {
//         value: "",
//         internalUse: false,
//         show: false,
//       },
//       personalQuestions: [],
//     },
//     profile: {
//       education: {
//         mandatory: false,
//         show: false,
//       },
//       experience: {
//         mandatory: false,
//         show: false,
//       },
//       resume: {
//         mandatory: false,
//         show: false,
//       },
//       profileQuestions: [],
//     },
//     customisedQuestions: [],
//   },
// };

// export const DataSlice = createSlice({
//   name: "Data",
//   initialState,
//   reducers: {
//     setCoverImageUrl: (state: State, action: PayloadAction<string>) => {
//       state.data.coverImage = action.payload;
//     },
//     setPersonalProp: (state: State, action: PayloadAction<{ propName: keyof Data["personalInformation"]; value: string; internalUse?: boolean; show?: boolean }>) => {
//       const { propName, value, internalUse, show } = action.payload;
//       (state.data.personalInformation[propName] as { value: string; internalUse?: boolean; show?: boolean }).value = value;
//       (state.data.personalInformation[propName] as { value: string; internalUse?: boolean; show?: boolean }).internalUse = internalUse;
//       (state.data.personalInformation[propName] as { value: string; internalUse?: boolean; show?: boolean }).show = show;
//     },
//     setQuestions: (state: State, action: PayloadAction<{ type: string; newQuestion: Question }>) => {
//       switch (action.payload.type) {
//         case "personal": {
//           let filteredData = state.data.personalInformation.personalQuestions.filter((q) => q.id !== action.payload.newQuestion.id);
//           state.data.personalInformation.personalQuestions = [...filteredData, action.payload.newQuestion];
//           break;
//         }
//         case "profile": {
//           let filteredData = state.data.profile.profileQuestions.filter((q) => q.id !== action.payload.newQuestion.id);
//           state.data.profile.profileQuestions = [...filteredData, action.payload.newQuestion];
//           break;
//         }
//         case "customized": {
//           let filteredData = state.data.customisedQuestions.filter((q) => q.id !== action.payload.newQuestion.id);
//           state.data.customisedQuestions = [...filteredData, action.payload.newQuestion];
//           break;
//         }
//       }
//     },
//     deleteQuestion: (state: State, action: PayloadAction<{ type: string; questionId: string }>) => {
//       switch (action.payload.type) {
//         case "personal": {
//           let filteredData = state.data.personalInformation.personalQuestions.filter((q) => q.id !== action.payload.questionId);
//           state.data.personalInformation.personalQuestions = filteredData;
//           break;
//         }
//         case "profile": {
//           let filteredData = state.data.profile.profileQuestions.filter((q) => q.id !== action.payload.questionId);
//           state.data.profile.profileQuestions = filteredData;
//           break;
//         }
//         case "customized": {
//           let filteredData = state.data.customisedQuestions.filter((q) => q.id !== action.payload.questionId);
//           state.data.customisedQuestions = filteredData;
//         }
//       }
//     },
//     setProfileOptions: (state, action: PayloadAction<{ edu: Options; exp: Options; res: Options }>) => {
//       state.data.profile.education = action.payload.edu;
//       state.data.profile.experience = action.payload.exp;
//       state.data.profile.resume = action.payload.res;
//     },
//     sendData: (state: State) => {
//       sendDataToApi(state.data);
//     },
//   },

//   extraReducers: (builder) => {
//     builder.addCase(fetchData.pending, (state: State) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchData.fulfilled, (state: State, action: PayloadAction<Data>) => {
//       state.isLoading = false;
//       const { coverImage, personalInformation, profile, customisedQuestions } = action.payload;
//       // fetching available data
//       // Object.assign(state.data, action.payload);
//       state.data.coverImage = coverImage || "";
//       state.data.personalInformation.firstName = { ...state.data.personalInformation.firstName, ...personalInformation.firstName };
//       state.data.personalInformation.lastName = { ...state.data.personalInformation.lastName, ...personalInformation.lastName };
//       state.data.personalInformation.emailId = { ...state.data.personalInformation.emailId, ...personalInformation.emailId };
//       state.data.personalInformation.phoneNumber = { ...state.data.personalInformation.phoneNumber, ...personalInformation.phoneNumber };
//       state.data.personalInformation.nationality = { ...state.data.personalInformation.nationality, ...personalInformation.nationality };
//       state.data.personalInformation.currentResidence = { ...state.data.personalInformation.currentResidence, ...personalInformation.currentResidence };
//       state.data.personalInformation.idNumber = { ...state.data.personalInformation.idNumber, ...personalInformation.idNumber };
//       state.data.personalInformation.dateOfBirth = { ...state.data.personalInformation.dateOfBirth, ...personalInformation.dateOfBirth };
//       state.data.personalInformation.gender = { ...state.data.personalInformation.gender, ...personalInformation.gender };
//       state.data.personalInformation.personalQuestions = { ...state.data.personalInformation.personalQuestions, ...personalInformation.personalQuestions };
//       state.data.profile.education = { ...state.data.profile.education, ...profile.education };
//       state.data.profile.experience = { ...state.data.profile.experience, ...profile.experience };
//       state.data.profile.resume = { ...state.data.profile.resume, ...profile.resume };
//       state.data.profile.profileQuestions = { ...state.data.profile.profileQuestions, ...profile.profileQuestions };
//       state.data.customisedQuestions = { ...state.data.customisedQuestions, ...customisedQuestions };

//       // console.log("Data fetched but I think there are some errors with the server fetched data so I will continue with inital state === NULL");
//     });
//     builder.addCase(fetchData.rejected, (state: State) => {
//       state.data = initialState.data;
//       state.error = true;
//     });
//   },
// });

// export const { sendData, setCoverImageUrl, setPersonalProp, setProfileOptions, setQuestions, deleteQuestion } = DataSlice.actions;
// export default DataSlice.reducer;

// async function sendDataToApi(data: Data) {
//   try {
//     const response = await axios.put(
//       "http://127.0.0.1:4010/api/386.70804606338396/programs/eos/application-form",
//       {
//         data: { id: uuid(), type: "applicationForm", attributes: data },
//       },
//       { headers: { Accept: "application/json", "Content-Type": "application/json" } }
//     );
//     console.log(response);
//   } catch {
//     console.log(Error("Error with Sending State"));
//   }
// }

// export const fetchData = createAsyncThunk("State/fetchData", async () => {
//   const response = await axios.get("http://127.0.0.1:4010/api/39.93939846974685/programs/at/application-form");
//   const data = await response.data.data.attributes;
//   return data;
// });
