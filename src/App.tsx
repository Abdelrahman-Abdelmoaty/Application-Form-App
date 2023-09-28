import "./App.css";
import Header from "./components/Header.tsx";
import Sidebar from "./components/Sidebar.tsx";
import UploadCoverImage from "./components/UploadCoverImage.tsx";
import PersonalInformation from "./components/PersonalInformation.tsx";
import Profile from "./components/Profile.tsx";
import AdditionalQuestions from "./components/AdditionalQuestions.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./App/Store.ts";
import { fetchData, sendData } from "./App/DataSlice.ts";

function App() {
  // const isLoading = useAppSelector((state) => state.data.isLoading);
  const isLoading = false;
  const [finished, setFinished] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(fetchData());
  }, []);
  return (
    <>
      {!isLoading && !finished && (
        <>
          <Sidebar />
          <Header />
          <main className="ml-[80px] px-[80px]">
            <UploadCoverImage />
            <PersonalInformation />
            <Profile />
            <AdditionalQuestions />
            <button
              className="bg-[#087B2F] text-2xl font-bold py-[30px] px-[100px] text-white rounded-xl ml-[160px] shadow-lg hover:translate-y-[-20px] hover:translate-x-[-20px] duration-[1.5s] hover:duration-200 mb-40"
              onClick={() => {
                dispatch(sendData());
                setTimeout(() => {
                  setFinished(true);
                }, 1000);
              }}
            >
              Submit
            </button>
          </main>
        </>
      )}
      {finished && (
        <div className="flex flex-col items-center justify-center h-[100vh] text-6xl font-bold">
          <span>Submitted, Thank you</span>
          <a href="https://www.linkedin.com/in/abdelrhman-abdelmoaty/" target="_blank" className="inline-block duration-300 ease-in-out hover:scale-105 text-xl mt-5">
            {"<"}Developed by / Abdelrhman Abdelmoaty{">"}
          </a>
        </div>
      )}
    </>
  );
}

export default App;
