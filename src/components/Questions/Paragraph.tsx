import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Question } from "../../App/DataSlice";
import uuid from "react-uuid";

export default function Paragraph({ data, setter }: { data: Question; setter: Dispatch<SetStateAction<{ question: Question; delete: boolean }>> }) {
  const [remove, setRemove] = useState<boolean>(false);
  const question = useRef<HTMLTextAreaElement>(null);
  const handleSave = () => {
    setter({ question: { id: data.id, type: data.type, question: question.current?.value || "", choices: [], maxChoice: 0, disqualify: false, other: false }, delete: false });
  };
  const handleDelete = () => {
    setRemove(true);
    setter({ question: { id: data.id, type: data.type, question: question.current?.value || "", choices: [], maxChoice: 0, disqualify: false, other: false }, delete: true });
  };
  const ID = uuid();
  return (
    <>
      {!remove && (
        <div className="flex flex-col w-full my-[20px] relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 absolute right-3 top-10">
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
          </svg>
          <p className="text-sm text-gray-400 font-semibold mb-[5px]">Paragraph</p>
          <label className="font-semibold" htmlFor={ID}>
            Question
          </label>
          <textarea defaultValue={data.question} placeholder="Type here" rows={2} className="py-[5px] pr-[120px] whitespace-break-spaces px-[10px] border-b-[1px] border-gray-400 outline-none mb-[10px] font-semibold text-xl" id={ID} ref={question} />
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
