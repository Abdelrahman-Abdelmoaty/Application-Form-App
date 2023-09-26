import { useRef, useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { setCoverImageUrl } from "../App/DataSlice";

function UploadProfileImage() {
  const dispatch = useDispatch();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const uploadBtn = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    uploadBtn.current?.click();
  };
  const finishUpload = () => {
    const selectedImage = uploadBtn.current?.files?.[0];
    if (selectedImage) {
      if (selectedImage.size > 1024 * 1024) {
        alert("Max image size exceeded (1MB).");
        return;
      }
      const imageURL = URL.createObjectURL(selectedImage);
      setUploadedImageUrl(imageURL);
      dispatch(setCoverImageUrl(imageURL.slice(imageURL.indexOf(":") + 1)));
    }
  };
  const handleRemove = () => {
    setUploadedImageUrl("");
    uploadBtn.current && (uploadBtn.current.value = "");
  };

  return (
    <div className="card">
      <p>Upload cover image</p>
      {(uploadedImageUrl && (
        <div className="relative h-[300px] w-full">
          <img className="w-full h-full object-cover" src={uploadedImageUrl} alt="" />
          <button className="absolute right-9 top-9  bg-white rounded-full p-2 hover:scale-105 duration-300 ease-in-out" type="button" onClick={handleRemove}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </button>
        </div>
      )) || (
        <div>
          <input type="file" accept="image/*" ref={uploadBtn} onChange={finishUpload} className="hidden" />
          <div onClick={handleUpload} className="flex flex-col  border border-dashed border-black items-center py-[80px] hover:cursor-pointer hover:opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mb-[5px] w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
            </svg>
            <span className="font-semibold">Upload cover image</span>
            <span className="text-gray-500">16:9 ratio is recommended. Max image size 1mb</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadProfileImage;
