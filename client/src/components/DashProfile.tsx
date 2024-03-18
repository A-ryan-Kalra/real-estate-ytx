import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormDataProps } from "../constants/types";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebaseConfig";

function DashProfile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const refer = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File | null>();
  const [imgFileUrl, setImgFileUrl] = useState<string | null>();
  const [formData, setFormData] = useState<FormDataProps>();
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState<
    string | null
  >(null);
  const [imageUploadError, setImageUploadError] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      setImgFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.value.trim()) {
    //   console.log("trimmed");
    // }
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  useEffect(() => {
    if (imgFile) {
      uploadImage();
    }
  }, [imgFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgFile!.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile as Blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError(
          ("Could not upload (File must be less than 4MB)" +
            error.message) as string
        );
        setImageFileUploadingProgress(null);
        setImgFile(null);
        setImgFileUrl(null);
      },
      () => {
        console.log(uploadTask.snapshot.ref);
        console.log("uploadTask.snapshot.ref");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgFileUrl(downloadUrl);
          setFormData((prev) => ({
            ...prev,
            profilePicture: downloadUrl,
          }));
        });
      }
    );
  };

  console.log(formData);
  console.log(imgFileUrl, "imgFIleUrl");
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center px-3 py-4 gap-3  max-w-[550px] mx-auto">
        <h1 className="text-center text-3xl font-semibold text-slate-700 my-7">
          Profile
        </h1>
        <div
          className="rounded-full border-[4px] duration-300 ease-in-out border-slate-300 shadow-md shadow-slate-600"
          onClick={() => refer.current?.click()}
        >
          <img
            className="rounded-full w-[110px] h-[110px] object-cover cursor-pointer"
            src={imgFileUrl || currentUser?.profilePicture}
            id="profilePicture"
            alt="img"
          />
        </div>
        <form className="flex flex-col gap-3 flex-1 w-full">
          <input
            type="file"
            ref={refer}
            className="hidden"
            onChange={handleImage}
            accept="image/*"
          />
          <input
            type="text"
            placeholder="username"
            value={formData?.username || currentUser?.username}
            onChange={handleChange}
            id="username"
            className="p-2 rounded-lg focus-visible:outline-none border-2"
          />
          <input
            type="text"
            placeholder="email"
            value={formData?.email || currentUser?.email || ""}
            onChange={handleChange}
            id="email"
            className="p-2 rounded-lg focus-visible:outline-none border-2"
          />
          <input
            type="text"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="p-2 rounded-lg focus-visible:outline-none border-2"
          />
          <button className="border-2 p-2 rounded-md border-[#21cdbe] hover:shadow-md duration-300 ease-in-out active:scale-95 hover:shadow-[#21cdbe]">
            Update
          </button>
        </form>
        <Link
          className="border-2 w-full p-2 rounded-md text-center border-fuchsia-500 duration-300 ease-in-out hover:shadow-fuchsia-500 hover:shadow-md "
          to="/create-post"
        >
          Create a Post
        </Link>
        <div className="w-full items-center justify-between text-red-500 flex">
          <h1 className="hover:underline">Delete Account</h1>
          <h1 className="hover:underline">Sign out</h1>
        </div>
      </div>
    </div>
  );
}

export default DashProfile;
