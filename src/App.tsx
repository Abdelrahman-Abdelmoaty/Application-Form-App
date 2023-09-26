import "./App.css";
import Header from "./components/Header.tsx";
import Sidebar from "./components/Sidebar.tsx";
import UploadCoverImage from "./components/UploadCoverImage.tsx";
import PersonalInformation from "./components/PersonalInformation.tsx";
import Profile from "./components/Profile.tsx";
import AdditionalQuestions from "./components/AdditionalQuestions.tsx";
import { useEffect, useState } from "react";
import { fetchData, sendData } from "./App/DataSlice.ts";
import { useAppDispatch } from "./App/Store.ts";

function App() {
  const [done, setDone] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  const handleSubmit = () => {
    dispatch(sendData());
  };
  return (
    <>
      <Sidebar />
      <Header />
      <main className="ml-[80px] px-[80px]">
        <UploadCoverImage />
        <PersonalInformation />
        <Profile />
        <AdditionalQuestions />
        <button className="bg-[#087B2F] text-2xl font-bold py-[30px] px-[100px] text-white rounded-xl ml-[160px] shadow-lg hover:translate-y-[-20px] hover:translate-x-[-20px] duration-[1.5s] hover:duration-200 " onClick={handleSubmit}>
          Submit
        </button>
      </main>
    </>
  );
}

export default App;
