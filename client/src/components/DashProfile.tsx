import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashProfile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const refer = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File | null>();
  const [imgFileUrl, setImgFileUrl] = useState<string | null>();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      setImgFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imgFileUrl);
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
            className="rounded-full w-[100px] object-cover cursor-pointer"
            src={imgFileUrl || currentUser?.profilePicture}
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
            className="p-2 rounded-lg focus-visible:outline-none border-2"
          />
          <input
            type="text"
            className="p-2 rounded-lg focus-visible:outline-none border-2"
          />
          <input
            type="text"
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
