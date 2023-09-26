import "../App.css";
export default function Header() {
  return (
    <header className="flex ml-[80px] my-[80px] shadow-xl text-center font-semibold text-xl">
      <div className="flex-1 py-[40px]">Program Details</div>
      <div className="flex-1 py-[40px] bg-[#00635b] text-white active">Application Form</div>
      <div className="flex-1 py-[40px]">Workflow</div>
      <div className="flex-1 py-[40px]">Preview</div>
    </header>
  );
}
