import AddAQuestion from "./Questions/AddAQuestion";

export default function AdditionalQuestions() {
  return (
    <div className="card">
      <p>Additional questions</p>
      <AddAQuestion type="customized" />
    </div>
  );
}
