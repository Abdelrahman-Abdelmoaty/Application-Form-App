import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PersonalInformationSlice } from "./PersonalInformationSlice";
import { ProfileSlice } from "./ProfileSlice";
import { CustomisedQuestionsSlice } from "./CustomizedQuestions";
import { CoverImageSlice } from "./Draft/CoverImageSlice";
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

// async function sendData(data: { coverImage: string; personalInformation: PersonalInformation; profile: Profile; customizedQuestions: Question[] }) {
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
//     console.log(Error("ERROR SENDING DATA"));
//   }
// }
