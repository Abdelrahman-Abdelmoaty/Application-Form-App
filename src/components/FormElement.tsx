import { useDispatch } from "react-redux";
import "./FormElement.css";
import { useState } from "react";
import { State, setPersonalProp } from "../App/DataSlice";

type FormElement = {
  name: keyof State["personalInformation"];
  label: string;
  options?: boolean;
};
export default function FormElement({ name, label, options = false }: FormElement) {
  const [hide, setHideBtn] = useState<boolean>(true);
  const [internalUse, setInternalUse] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const dispatch = useDispatch();
  const updateState = () => {
    dispatch(setPersonalProp({ propName: name, value: text, internalUse: internalUse, show: !hide || !options }));
  };

  return (
    <div className="formElement">
      <label htmlFor={name}>{label}</label>
      {options && (
        <div className="options">
          <input
            type="checkbox"
            id={`${name}InternalUse`}
            onClick={() => {
              setInternalUse((prev) => !prev);
              updateState();
            }}
          />
          <label htmlFor={`${name}InternalUse`}>Internal Use</label>
          <input
            type="checkbox"
            id={`${name}Hide`}
            onClick={() => {
              setHideBtn((prev) => !prev);
              updateState();
            }}
          />
          <label htmlFor={`${name}Hide`} className={`${!hide && "active"}`}>
            <span className={`${!hide && "activeToggler"}`}></span>
          </label>
          <label htmlFor={`${name}Hide`}>{hide ? "Hide" : "Show"}</label>
        </div>
      )}
      <input
        type="text"
        id={name}
        onBlur={({ target }) => {
          setText(target.value);
          updateState();
        }}
      />
    </div>
  );
}
