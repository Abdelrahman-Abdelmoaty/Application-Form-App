import { useDispatch } from "react-redux";
import "./FormElement.css";
import { useRef, useState } from "react";
import { Data, setPersonalProp } from "../App/DataSlice";
import debounce from "./bounceUtil";

export default function FormElement({ name, label, options = false }: { name: keyof Data["personalInformation"]; label: string; options?: boolean }) {
  const [hide, setHideBtn] = useState<boolean>(true);
  const internalUseInput = useRef<HTMLInputElement>(null);
  const hideInput = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const updateData = () => {
    dispatch(
      setPersonalProp({
        propName: name,
        value: textInput.current?.value || "",
        internalUse: internalUseInput.current?.checked,
        show: !hideInput?.current?.checked,
      })
    );
  };
  const debounceUpdateData = debounce(updateData);

  return (
    <div className="formElement">
      <label htmlFor={name}>{label}</label>
      {options && (
        <div className="options">
          <input type="checkbox" id={`${name}InternalUse`} ref={internalUseInput} onClick={updateData} />
          <label htmlFor={`${name}InternalUse`}>Internal Use</label>
          <input
            type="checkbox"
            id={`${name}Hide`}
            ref={hideInput}
            onClick={() => {
              setHideBtn((prev) => !prev);
              updateData();
            }}
          />
          <label htmlFor={`${name}Hide`} className={`${!hide && "active"}`}>
            <span className={`${!hide && "activeToggler"}`}></span>
          </label>
          <label htmlFor={`${name}Hide`}>{hide ? "Hide" : "Show"}</label>
        </div>
      )}
      <input type="text" id={name} ref={textInput} onChange={debounceUpdateData} />
    </div>
  );
}
