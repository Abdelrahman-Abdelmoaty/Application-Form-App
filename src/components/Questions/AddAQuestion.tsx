import { Dispatch, SetStateAction, useRef, useState } from "react";
import "./AddAQuestion.css";
import Paragraph from "./Paragraph";
import MultipleChoice from "./MultipleChoice";
import uuid from "react-uuid";
import { Question } from "../../App/PersonalInformationSlice";

export default function AddAQuestion({ data, setter }: { data: Question[]; setter: Dispatch<SetStateAction<{ question: Question; delete: boolean }>> }) {
  let oldQuestions: JSX.Element[] = [];
  data.length &&
    (oldQuestions = data.map((question) => {
      switch (question.type) {
        case "Paragraph":
          return <Paragraph key={question.id} setter={setter} data={question} />;

        default:
          return <></>;
      }
    }));
  const [questions, setQuestions] = useState<JSX.Element[]>(oldQuestions);
  const selection = useRef<HTMLSelectElement>(null);

  function addNewQuestion() {
    const value = selection.current?.value;
    const ID = uuid();
    switch (value) {
      case "Paragraph":
        setQuestions((prev) => [...prev, <Paragraph key={ID} setter={setter} data={{ id: ID, type: "Paragraph", question: "", choices: [], maxChoice: 0, disqualify: false, other: false }} />]);
        break;
    }
  }

  return (
    <div className="addAQuestion">
      <p className="font-semibold text-2xl mb-2">Questions</p>
      {/* PUT QUESTIONS HERE */}
      <div className="question-section">{questions}</div>
      {/* #################### */}
      <div className="question-selection">
        <label>Type</label>
        <select name="questions" className="question-select" ref={selection}>
          <option value="">--Please choose an option--</option>
          <option value="Paragraph">Paragraph</option>
          <option value="ShortAnswer">Short answer</option>
          <option value="Yes/no">Yes/No</option>
          <option value="Dropdown">Dropdown</option>
          <option value="MultipleChoice">Multiple choice</option>
          <option value="Date">Date</option>
          <option value="Number">Number</option>
          <option value="FileUpload">File upload</option>
          <option value="VideoQuestion">Video question</option>
        </select>
      </div>
      <button className="add-question-btn" onClick={addNewQuestion}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Add A Question</span>
      </button>
    </div>
  );
}
