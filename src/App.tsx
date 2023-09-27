import "./App.css";
import Header from "./components/Header.tsx";
import Sidebar from "./components/Sidebar.tsx";
import UploadCoverImage from "./components/UploadCoverImage.tsx";
import PersonalInformation from "./components/PersonalInformation.tsx";
import Profile from "./components/Profile.tsx";
import AdditionalQuestions from "./components/AdditionalQuestions.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./App/Store.ts";
import axios from "axios";
import { fetchPersonalInformation } from "./App/PersonalInformationSlice.ts";
import { fetchProfile } from "./App/ProfileSlice.ts";
import { fetchCustomizedQuestions } from "./App/CustomizedQuestions.ts";
import { fetchCoverImage } from "./App/CoverImageSlice.ts";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchData()
      .then((data) => {
        dispatch(fetchCoverImage(data.coverImage));
        dispatch(fetchPersonalInformation(data.personalInformation));
        dispatch(fetchProfile(data.profile));
        dispatch(fetchCustomizedQuestions(data.customisedQuestions));
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  async function fetchData() {
    const response = await axios.get("http://127.0.0.1:4010/api/39.93939846974685/programs/at/application-form");
    const data = await response.data.data.attributes;
    return data;
  }
  return (
    <>
      {!isLoading && (
        <>
          <Sidebar />
          <Header />
          <main className="ml-[80px] px-[80px]">
            <UploadCoverImage />
            <PersonalInformation />
            <Profile />
            <AdditionalQuestions />
            {/* <button className="bg-[#087B2F] text-2xl font-bold py-[30px] px-[100px] text-white rounded-xl ml-[160px] shadow-lg hover:translate-y-[-20px] hover:translate-x-[-20px] duration-[1.5s] hover:duration-200 " onClick={handleSubmit}>
              Submit
            </button> */}
          </main>
        </>
      )}
    </>
  );
}

export default App;
