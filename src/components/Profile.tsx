import { useState } from "react";
import "./FormElement.css";
import { useAppDispatch } from "../App/Store";
import { setProfileOptions } from "../App/DataSlice";
import AddAQuestion from "./Questions/AddAQuestion";
export default function Profile() {
  const dispatch = useAppDispatch();
  const [edu, setEdu] = useState<{ mandatory: boolean; show: boolean }>({ mandatory: false, show: false });
  const [exp, setExp] = useState<{ mandatory: boolean; show: boolean }>({ mandatory: false, show: false });
  const [res, setRes] = useState<{ mandatory: boolean; show: boolean }>({ mandatory: false, show: false });
  const updateState = () => {
    dispatch(setProfileOptions({ edu: edu, exp: exp, res: res }));
  };
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
              onClick={() => {
                setEdu((prev) => ({ ...prev, mandatory: !prev.mandatory }));
                updateState();
              }}
            />
            <label htmlFor="eduMan">Mandatory</label>
            <input
              type="checkbox"
              id="eduHid"
              onClick={() => {
                setEdu((prev) => ({ show: !prev.show, mandatory: prev.mandatory }));
                updateState();
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
              onClick={() => {
                setExp((prev) => ({ show: prev.show, mandatory: !prev.mandatory }));
                updateState();
              }}
            />
            <label htmlFor="expMan">Mandatory</label>
            <input
              type="checkbox"
              id="expHid"
              onClick={() => {
                setExp((prev) => ({ show: !prev.show, mandatory: prev.mandatory }));
                updateState();
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
              onClick={() => {
                setRes((prev) => ({ show: prev.show, mandatory: !prev.mandatory }));
                updateState();
              }}
            />
            <label htmlFor="resMan">Mandatory</label>
            <input
              type="checkbox"
              id="resHid"
              onClick={() => {
                setRes((prev) => ({ show: !prev.show, mandatory: prev.mandatory }));
                updateState();
              }}
            />
            <label htmlFor="resHid" className={`${res.show && "active"}`}>
              <span className={`${res.show && "activeToggler"}`}></span>
            </label>
            <label htmlFor="resHid">{`${res.show ? "Show" : "Hide"}`}</label>
          </div>
        </div>
        <AddAQuestion type="profile" />
      </div>
    </div>
  );
}
