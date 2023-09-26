import { useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPersonalQuestions } from "../../App/DataSlice";
import { useAppSelector } from "../../App/Store";

export default function ShorAnwser() {
  const question = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const personalQuestions = useAppSelector((state) => state.data.personalInformation.personalQuestions);

  let ID = useMemo(() => crypto.randomUUID(), []);

  return (
    <div className="flex flex-col w-full my-[10px]">
      <label className="text-xl font-semibold mb-[10px]" htmlFor={ID}>
        Question
      </label>
      <input type="text" className="p-[15px] border mb-[10px]" ref={question} id={ID} />
      <div className="flex justify-between">
        <button
          className="border rounded-md bg-red-500 text-white p-[5px]"
          onClick={() => {
            let newData = personalQuestions.filter((e) => e.id !== ID);
            dispatch(setPersonalQuestions(newData));
          }}
        >
          Delete
        </button>
        <button
          className="border rounded-md bg-blue-500 text-white p-[5px]"
          onClick={() => {
            let newData = personalQuestions.filter((e) => e.id !== ID);
            dispatch(setPersonalQuestions([...newData, { id: ID, type: "short anwser", value: question.current?.value }]));
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
ShorAnwser;
