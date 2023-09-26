import "./App.css";
import Header from "./components/Header.tsx";
import Sidebar from "./components/Sidebar.tsx";
import UploadCoverImage from "./components/UploadCoverImage.tsx";
import PersonalInformation from "./components/PersonalInformation.tsx";
import Profile from "./components/Profile.tsx";
import AdditionalQuestions from "./components/AdditionalQuestions.tsx";
import SendData from "./SendData.tsx";

function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="ml-[80px] px-[80px]">
        <UploadCoverImage />
        <PersonalInformation />
        <Profile />
        <AdditionalQuestions />
        <SendData />
      </main>
    </>
  );
}

export default App;
