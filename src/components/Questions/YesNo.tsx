import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Question } from "../../App/DataSlice";
import uuid from "react-uuid";

export default function YesNo({ data, setter }: { data: Question; setter: Dispatch<SetStateAction<{ question: Question; delete: boolean }>> }) {
  const [remove, setRemove] = useState<boolean>(false);
  const question = useRef<HTMLInputElement>(null);
  const disqualify = useRef<HTMLInputElement>(null);
  const handleSave = () => {
    setter({ question: { id: data.id, type: data.type, question: question.current?.value || "", choices: [], maxChoice: 0, disqualify: disqualify.current?.checked || false, other: false }, delete: false });
  };
  const handleDelete = () => {
    setRemove(true);
    setter({ question: { id: data.id, type: data.type, question: question.current?.value || "", choices: [], maxChoice: 0, disqualify: disqualify.current?.checked || false, other: false }, delete: true });
  };
  const ID = uuid();

  return (
    <>
      {!remove && (
        <div className="flex flex-col w-full my-[20px] relative">
          <p className="text-sm text-gray-400 font-semibold mb-[5px]">Yes/No</p>
          <label className="font-semibold" htmlFor={data.id}>
            Question
          </label>
          <input placeholder="Type here" className="py-[15px] pr-[120px] mt-2 whitespace-break-spaces px-[10px] rounded-md border-[1px] border-gray-400 outline-none mb-[10px] font-semibold text-xl" id={data.id} />
          <div className="flex p-4 items-center">
            <input className="mr-4 w-4 h-4 hover:cursor-pointer" type="checkbox" name="disqualify" id={ID} />
            <label htmlFor={ID}>Disqualify candidate if the answer is no</label>
          </div>
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
