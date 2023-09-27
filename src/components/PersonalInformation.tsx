import { useEffect, useState } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../App/Store";
import FormElement from "./FormElement";
import AddAQuestion from "./Questions/AddAQuestion";
import { Question, setPersonalInformationQuestions } from "../App/PersonalInformationSlice";
import useDidMountEffect from "../hooks/useDidMountHook";

export default function PersonalInformation() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.personalInformation.personalQuestions);
  const [QUESTION, setQUESTION] = useState<{ question: Question; delete: boolean }>({ question: { id: "", type: "", question: "", choices: [], maxChoice: 0, disqualify: false, other: false }, delete: false });

  useDidMountEffect(() => {
    dispatch(setPersonalInformationQuestions(QUESTION));
  }, [QUESTION]);
  return (
    <div className="card">
      <p>Personal Information</p>
      <div className="flex">
        <FormElement name="firstName" label="First Name" />
        <FormElement name="lastName" label="Last Name" />
        <FormElement name="emailId" label="Email" />
        <FormElement name="phoneNumber" label="Phone" options={true} />
        <FormElement name="nationality" label="Nationality" options={true} />
        <FormElement name="currentResidence" label="Current Residence" options={true} />
        <FormElement name="idNumber" label="ID Number" options={true} />
        <FormElement name="dateOfBirth" label="Date of Birth" options={true} />
        <FormElement name="gender" label="Gender" options={true} />
        <AddAQuestion data={data} setter={setQUESTION} />
      </div>
    </div>
  );
}
