import { useEffect, useState } from "react";
import "./FormElement.css";
import { useAppDispatch, useAppSelector } from "../App/Store";
import { setProfileOptions, setProfileQuestions } from "../App/ProfileSlice";
import AddAQuestion from "./Questions/AddAQuestion";
import useDidMountEffect from "../hooks/useDidMountHook";
import { Question } from "../App/PersonalInformationSlice";

export default function Profile() {
  const data: any = useAppSelector((state) => state.profile);
  const [edu, setEdu] = useState<{ mandatory: boolean; show: boolean }>(data.education);
  const [exp, setExp] = useState<{ mandatory: boolean; show: boolean }>(data.experience);
  const [res, setRes] = useState<{ mandatory: boolean; show: boolean }>(data.resume);
  const [QUESTION, setQUESTION] = useState<{ question: Question; delete: boolean }>({ question: { id: "", type: "", question: "", choices: [], maxChoice: 0, disqualify: false, other: false }, delete: false });

  const dispatch = useAppDispatch();
  useDidMountEffect(() => {
    dispatch(setProfileOptions({ edu: edu, exp: exp, res: res }));
  }, [edu, exp, res]);
  useDidMountEffect(() => {
    dispatch(setProfileQuestions(QUESTION));
  }, [QUESTION]);
  return (
    <div className="card">
      <p>Profile</p>
      <div>
        <div className="mb-[10px] relative">
          <label htmlFor="eduMan" className="flex-1 font-semibold text-xl">
            Education
          </label>
          <div className="options top-0">
            <input
              type="checkbox"
              id="eduMan"
              defaultChecked={edu.mandatory}
              onClick={() => {
                setEdu((prev) => ({ ...prev, mandatory: !prev.mandatory }));
              }}
            />
            <label htmlFor="eduMan">Mandatory</label>
            <input
              type="checkbox"
              id="eduHid"
              defaultChecked={edu.show}
              onClick={() => {
                setEdu((prev) => ({ show: !prev.show, mandatory: prev.mandatory }));
              }}
            />
            <label htmlFor="eduHid" className={`${edu.show && "active"}`}>
              <span className={`${edu.show && "activeToggler"}`}></span>
            </label>
            <label htmlFor="eduHid">{`${edu.show ? "Show" : "Hide"}`}</label>
          </div>
        </div>
        <div className="my-[10px] relative">
          <label htmlFor="expMan" className="flex-1 font-semibold text-xl">
            Experience
          </label>
          <div className="options top-0">
            <input
              type="checkbox"
              id="expMan"
              defaultChecked={exp.mandatory}
              onClick={() => {
                setExp((prev) => ({ show: prev.show, mandatory: !prev.mandatory }));
              }}
            />
            <label htmlFor="expMan">Mandatory</label>
            <input
              type="checkbox"
              id="expHid"
              defaultChecked={exp.show}
              onClick={() => {
                setExp((prev) => ({ show: !prev.show, mandatory: prev.mandatory }));
              }}
            />
            <label htmlFor="expHid" className={`${exp.show && "active"}`}>
              <span className={`${exp.show && "activeToggler"}`}></span>
            </label>
            <label htmlFor="expHid">{`${exp.show ? "Show" : "Hide"}`}</label>
          </div>
        </div>
        <div className="my-[10px] relative mb-[30px]">
          <label htmlFor="resMan" className="flex-1 font-semibold text-xl">
            Resume
          </label>
          <div className="options top-0">
            <input
              type="checkbox"
              id="resMan"
              defaultChecked={res.mandatory}
              onClick={() => {
                setRes((prev) => ({ show: prev.show, mandatory: !prev.mandatory }));
              }}
            />
            <label htmlFor="resMan">Mandatory</label>
            <input
              type="checkbox"
              id="resHid"
              defaultChecked={res.show}
              onClick={() => {
                setRes((prev) => ({ show: !prev.show, mandatory: prev.mandatory }));
              }}
            />
            <label htmlFor="resHid" className={`${res.show && "active"}`}>
              <span className={`${res.show && "activeToggler"}`}></span>
            </label>
            <label htmlFor="resHid">{`${res.show ? "Show" : "Hide"}`}</label>
          </div>
        </div>
        <AddAQuestion data={data.profileQuestions} setter={setQUESTION} />
      </div>
    </div>
  );
}
