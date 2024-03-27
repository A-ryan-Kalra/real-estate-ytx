import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormDataProps } from "../constants/types";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebaseConfig";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { signInSuccess, signOut } from "../redux/user/userSlice";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Listings from "./UserListings";

function DashProfile() {
  const [showListing, setShowListing] = useState(false);
  const [num, setNum] = useState(0);
  const { currentUser } = useSelector((state: any) => state.user);
  const refer = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File | null>();
  const [imgFileUrl, setImgFileUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataProps>({
    username: currentUser?.username,
    email: currentUser?.email,
  });
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState<
    string | null
  >(null);
  const [imageUploadError, setImageUploadError] = useState("");
  const [loading, setLoading] = useState<boolean>();
  const dispatch = useDispatch();
  const [imageUpdateSuccess, setImageUpdateSuccess] = useState("");
  const [switchEye, setSwitchEye] = useState(false);
  const [switchSides, setSwitchSides] = useState(false);
  const [uploadImg, setUploadImg] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) {
      return null;
    } else {
      const file = e.target.files?.[0];
      if (file && !loading) {
        setImgFile(file);
        setImgFileUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchSides(true);
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  useEffect(() => {
    if (imgFile && !loading) {
      uploadImage();
    }
  }, [imgFile]);

  const uploadImage = async () => {
    setLoading(true);
    setImageUploadError("");
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
        setNum(100);
      },
      () => {
        setImageUploadError("Could not upload (File must be less than 4MB)");
        setNum(0);
        setImageFileUploadingProgress(null);
        setImgFile(null);
        setImgFileUrl(null);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgFileUrl(downloadUrl);
          setFormData((prev) => ({
            ...prev,
            profilePicture: downloadUrl,
          }));
          setUploadImg(true);
          setLoading(false);
        });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setImageUploadError("");

    if (loading) {
      setImageUploadError("Please wait for the file to upload");
      return null;
    }
    if (
      !formData?.email?.trim() &&
      !formData?.password?.trim() &&
      !formData?.profilePicture?.trim() &&
      !formData?.username?.trim()
    ) {
      setImageUploadError("No changes made.");
      return null;
    }

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        setImageUploadError("");
        setImageUpdateSuccess("Information updated successfully!");
      } else {
        setImageUploadError(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setImageUploadError(error.message);
      } else {
        setImageUploadError("An error occurred");
      }
    } finally {
      setFormData({ ...formData, password: "" });
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      console.log(data);
      dispatch(signOut());
    } catch (error) {
      console.error(error);
      if (error instanceof Error) setImageUploadError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      // const data = await res.json();
      if (res.ok) {
        dispatch(signOut());
        setImageUpdateSuccess("User deleted successfully");
      } else {
        setImageUploadError("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) setImageUploadError(error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center px-3 py-4 gap-3  max-w-[550px] mx-auto">
        <h1 className="text-center text-3xl font-semibold text-slate-700 my-7">
          Profile
        </h1>
        <div
          className="rounded-full relative  duration-300 ease-in-out  shadow-md shadow-slate-600"
          onClick={() => refer.current?.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={(imageFileUploadingProgress as unknown as number) || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },

                path: {
                  stroke: `rgba(81,187,199,${
                    (imageFileUploadingProgress as unknown as number) / 100
                  }`,
                },
              }}
            />
          )}

          <img
            className="rounded-full duration-[1s] w-[110px] border-[5px] border-[lightgray] h-[110px] object-cover cursor-pointer"
            src={imgFileUrl || currentUser?.profilePicture}
            id="profilePicture"
            style={{
              filter: `blur(${
                num - (imageFileUploadingProgress as unknown as number)
              }px)`,
            }}
            alt="img"
          />
        </div>
        {imageUploadError && (
          <div className="bg-red-200 p-2 rounded-md text-red-500">
            {imageUploadError}
          </div>
        )}
        {imageUpdateSuccess && (
          <div className="bg-green-100 text-green-500 font-semibold p-2 rounded-md">
            {imageUpdateSuccess}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 flex-1 w-full"
        >
          <input
            type="file"
            ref={refer}
            className="hidden"
            onChange={handleImage}
            accept="image/*"
            value={""}
          />
          <input
            type="text"
            placeholder="Username"
            value={
              switchSides
                ? formData?.username || ""
                : currentUser?.username || ""
            }
            onChange={handleChange}
            id="username"
            className="p-2 rounded-lg focus-visible:outline-none border-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={
              switchSides ? formData?.email || "" : currentUser?.email || ""
            }
            onChange={handleChange}
            id="email"
            className="p-2 rounded-lg focus-visible:outline-none border-2"
          />
          <div className="w-full flex items-center rounded-lg border-2 overflow-hidden">
            <input
              type={!switchEye ? "password" : "text"}
              placeholder="Password"
              id="password"
              value={formData?.password || ""}
              autoComplete="off"
              onChange={handleChange}
              className="p-2 w-full focus-visible:outline-none"
            />
            {!switchEye ? (
              <HiEyeOff
                onClick={() => setSwitchEye(!switchEye)}
                size={21}
                className="relative right-1 cursor-pointer hover:text-[#767474] duration-300 rounded-full"
              />
            ) : (
              <HiEye
                onClick={() => setSwitchEye(!switchEye)}
                size={21}
                className="relative right-1 cursor-pointer hover:text-[#767474] duration-300 rounded-full"
              />
            )}
          </div>
          <button
            className={`${
              uploadImg &&
              "bg-teal-500 text-white duration-300 ease-out hover:bg-opacity-90"
            } border-2 p-2 rounded-md border-[#21cdbe] hover:shadow-md duration-300 ease-in-out active:scale-95 hover:shadow-[#21cdbe]`}
          >
            {uploadImg ? "Update Information" : "Update"}
          </button>
        </form>
        <Link
          className="border-2 w-full p-2 rounded-md text-center border-fuchsia-500 duration-300 ease-in-out hover:shadow-fuchsia-500 hover:shadow-md "
          to="/create-listing"
        >
          Create Listing
        </Link>
        <div className="w-full items-center justify-between text-red-500 flex">
          <button className="hover:underline" onClick={handleDelete}>
            Delete Account
          </button>
          <button className="hover:underline" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
        <button
          onClick={() => setShowListing(!showListing)}
          className="bg-fuchsia-400 my-2 text-white duration-300 ease-in-out hover:shadow-teal-300 active:scale-95 font-semibold p-2 rounded-md shadow-md shadow-fuchsia-300"
        >
          Show Listings
        </button>
        {showListing && <Listings />}
      </div>
    </div>
  );
}

export default DashProfile;
