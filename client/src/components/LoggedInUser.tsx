import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";

function LoggedInUser({ img }: { img: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  //   console.log(img);
  return (
    <div
      className="relative bg-black rounded-full cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <img
        src={img.profilePicture}
        className="w-7 rounded-full h-7"
        alt="display-img"
      />
      {open && (
        <div className="z-[100]  absolute top-full flex flex-col items-start gap-2 bg-white w-[250px] h-fit right-1 rounded-lg shadow-lg">
          <div className="border-b-2 p-2 w-full ">
            <h1 className="text-gray-600">@{img.username}</h1>
            <h1 className="text-ellipsis overflow-hidden">{img.email}</h1>
          </div>
          <h1 className="border-b-2 w-full px-2 py-1">Profile</h1>
          <h1 className="px-2 py-1" onClick={() => dispatch(signOut())}>
            Sign out
          </h1>
        </div>
      )}
    </div>
  );
}

export default LoggedInUser;
