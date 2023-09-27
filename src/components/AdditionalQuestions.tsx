import { useState } from "react";
import { setCustomizedQuestions } from "../App/CustomizedQuestions";
import { useAppDispatch, useAppSelector } from "../App/Store";
import useDidMountEffect from "../hooks/useDidMountHook";
import AddAQuestion from "./Questions/AddAQuestion";
import { Question } from "../App/PersonalInformationSlice";

export default function AdditionalQuestions() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.customozedQuestions);
  const [QUESTION, setQUESTION] = useState<{ question: Question; delete: boolean }>({ question: { id: "", type: "", question: "", choices: [], maxChoice: 0, disqualify: false, other: false }, delete: false });

  useDidMountEffect(() => {
    dispatch(setCustomizedQuestions(QUESTION));
  }, [QUESTION]);
  return (
    <div className="card">
      <p>Additional questions</p>
      <AddAQuestion data={data} setter={setQUESTION} />
    </div>
  );
}
