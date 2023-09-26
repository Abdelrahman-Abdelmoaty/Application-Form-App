import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { deleteQuestion, setQuestions } from "../../App/DataSlice";

function Choice({ text, setChoicesText }: { text: string; setChoicesText: Dispatch<SetStateAction<string[]>> }) {
  const [input, setInput] = useState<string>(text);
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setChoicesText((prev) => {
      console.log(prev);
      const updatedChoicesText = [...prev];
      const index = updatedChoicesText.indexOf(input);
      if (index !== -1) {
        updatedChoicesText[index] = input;
      } else {
        updatedChoicesText[index + 1] = input;
      }
      return updatedChoicesText;
    });

    setInput(target.value);
  };
  return (
    <div className="flex justify-between items-center p-[20px]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
        />
      </svg>
      <input placeholder="Type here" type="text" className="p-[15px] flex-1 mx-[20px] px-[10px] border-[1px] rounded-md border-gray-400 outline-none text-xl" value={input} onChange={handleChange} />
    </div>
  );
}

export default function MultipleChoice({ type }: { type: string }) {
  const question = useRef<HTMLInputElement>(null);
  const maxChoice = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>("");
  const [Choices, setChoices] = useState<JSX.Element[]>([]);
  const [choicesText, setChoicesText] = useState<string[]>([]);
  const [remove, setRemove] = useState<boolean>(false);
  let questionId: string = useMemo(() => crypto.randomUUID(), []);

  const addChoice = () => {
    setChoicesText((prev) => [...prev, input]);
    setChoices((prev) => [...prev, <Choice key={uuid()} text={input} setChoicesText={setChoicesText} />]);
  };
  const dispatch = useDispatch();
  const handleSave = () => {
    const newQuestion = {
      id: questionId,
      type: "MultipleChoice",
      question: question.current?.value || "",
      choices: choicesText,
      maxChoice: parseInt(maxChoice.current?.value || "") || 0,
      disqualify: false,
      other: false,
    };
    dispatch(setQuestions({ type, newQuestion }));
  };
  const handleDelete = () => {
    setRemove(true);
    dispatch(deleteQuestion({ type, questionId }));
  };
  return (
    <>
      {!remove && (
        <div className="flex flex-col mt-[10px]">
          <p className="text-sm text-gray-400 font-semibold mb-[5px]">Multiple Choice</p>
          <label className="font-semibold" htmlFor={questionId}>
            Question
          </label>
          <input placeholder="Type here" className="py-[15px] pr-[120px] mt-2 whitespace-break-spaces px-[10px] rounded-md border-[1px] border-gray-400 outline-none mb-[10px] font-semibold text-xl" ref={question} id={questionId} />
          {Choices}
          <div className="flex justify-between items-center p-[20px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            <input placeholder="Type here" type="text" className="p-[15px] flex-1 mx-[20px] px-[10px] border-[1px] rounded-md border-gray-400 outline-none text-xl" onChange={({ target }) => setInput(target.value)} value={input} />
            <button onClick={addChoice}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            </button>
          </div>
          <label className="font-semibold mb-[5px]" htmlFor="">
            Max choice allowed
          </label>
          <input placeholder="Type here" type="number" className="py-[15px] mb-2 flex-1 px-[10px] border-[1px] rounded-md border-gray-400 outline-none font-semibold text-xl" ref={maxChoice} />
          <div className="flex justify-between">
            <button className="flex items-center rounded-md text-sm font-semibold text-red-500 p-[5px] hover:opacity-75" onClick={handleDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="mr-1 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Delete question
            </button>
            <button className="border rounded-md bg-blue-500 text-white px-[10px] py-[5px]" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
