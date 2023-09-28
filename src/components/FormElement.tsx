import "./FormElement.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../App/Store";
import debounce from "lodash/debounce";
import useDidMountEffect from "../hooks/useDidMountHook";
import React from "react";
import { PersonalInformation, PersonalInformationPropertyOptions, setPersonalInformation } from "../App/DataSlice";

interface props {
  name: keyof PersonalInformation;
  label: string;
  options?: boolean;
}
export default function FormElement({ name, label, options = false }: props) {
  const property: any = useAppSelector((state) => state.data.data.personalInformation);
  const [text, setText] = useState<string>(property.value || "");
  const [hide, setHide] = useState<boolean>(!property.show);
  const [internalUse, setInternalUse] = useState<boolean>(!!property.internalUse);

  const dispatch = useAppDispatch();
  const debounceUpdateState = React.useCallback(
    debounce((payload: { propName: keyof PersonalInformation; options: PersonalInformationPropertyOptions }) => {
      dispatch(setPersonalInformation(payload));
    }, 250),
    []
  );

  useDidMountEffect(() => {
    debounceUpdateState({ propName: name, options: { value: text, internalUse: internalUse, show: !hide } });
  }, [text, hide, internalUse]);

  return (
    <div className="formElement">
      <label htmlFor={name}>{label}</label>
      {options && (
        <div className="options">
          <input
            type="checkbox"
            id={`${name}InternalUse`}
            defaultChecked={internalUse}
            onClick={() => {
              setInternalUse((prev) => !prev);
            }}
          />
          <label htmlFor={`${name}InternalUse`}>Internal Use</label>
          <input
            type="checkbox"
            id={`${name}Hide`}
            defaultChecked={hide}
            onClick={() => {
              setHide((prev) => !prev);
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
        value={text}
        onChange={({ target }) => {
          setText(target.value);
        }}
      />
    </div>
  );
}
