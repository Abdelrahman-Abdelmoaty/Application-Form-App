import { useDispatch } from "react-redux";
import { sendDataDisaptch } from "./App/DataSlice";

export default function SendData() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(sendDataDisaptch());
  };
  return (
    <div>
      <button className="bg-[#087B2F] text-2xl font-bold py-[30px] px-[100px] text-white rounded-xl ml-[160px] shadow-lg hover:translate-y-[-20px] hover:translate-x-[-20px] duration-[1.5s] hover:duration-200 " onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
