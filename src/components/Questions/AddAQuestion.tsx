import { useRef, useState } from "react";
import "./AddAQuestion.css";
import Paragraph from "./Paragraph";
import MultipleChoice from "./MultipleChoice";

export default function AddAQuestion({ type }: { type: string }) {
  const [questions, setQuestions] = useState<JSX.Element[]>([]);
  const selection = useRef<HTMLSelectElement>(null);
  const addNewQuestion = () => {
    const value = selection.current?.value;
    switch (value) {
      case "paragraph":
        setQuestions((prev) => [...prev, <Paragraph type={type} key={`${crypto.randomUUID()}`} />]);
        break;
      case "shortAnswer":
        setQuestions((prev) => [...prev, <Paragraph type={type} key={`${crypto.randomUUID()}`} />]);
        break;
      case "yes/no":
        setQuestions((prev) => [...prev, <Paragraph type={type} key={`${crypto.randomUUID()}`} />]);
        break;
      case "dropdown":
        setQuestions((prev) => [...prev, <Paragraph type={type} key={`${crypto.randomUUID()}`} />]);
        break;
      case "multipleChoice":
        setQuestions((prev) => [...prev, <MultipleChoice type={type} key={`${crypto.randomUUID()}`} />]);
        break;
      case "date":
        setQuestions((prev) => [...prev, <Paragraph type={type} key={`${crypto.randomUUID()}`} />]);
        break;
      case "number":
        setQuestions((prev) => [...prev, <Paragraph type={type} key={`${crypto.randomUUID()}`} />]);
        break;
      case "fileUpload":
        setQuestions((prev) => [...prev, <Paragraph type={type} key={`${crypto.randomUUID()}`} />]);
        break;
      case "videoQuestion":
        setQuestions((prev) => [...prev, <Paragraph type={type} key={`${crypto.randomUUID()}`} />]);
        break;
    }
  };

  return (
    <div className="addAQuestion">
      <p className="font-semibold text-2xl mb-2">Questions</p>
      <div className="question-section">{questions}</div>
      <div className="question-selection">
        <label>Type</label>
        <select name="questions" className="question-select" ref={selection}>
          <option value="">--Please choose an option--</option>
          <option value="paragraph">Paragraph</option>
          <option value="shortAnswer">Short answer</option>
          <option value="yes/no">Yes/No</option>
          <option value="dropdown">Dropdown</option>
          <option value="multipleChoice">Multiple choice</option>
          <option value="date">Date</option>
          <option value="number">Number</option>
          <option value="fileUpload">File upload</option>
          <option value="videoQuestion">Video question</option>
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
