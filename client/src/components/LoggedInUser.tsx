import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function LoggedInUser({ img }: { img: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const refer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  async function handle() {
    const res = await fetch("/api/auth/signout");
    const data = await res.json();
    console.log(data);
    dispatch(signOut());
    setOpen(false);
    dispatch(signOut());
  }

  useEffect(() => {
    const closeDropDown = (e: MouseEvent) => {
      if (!refer.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", closeDropDown);

    return () => document.body.removeEventListener("click", closeDropDown);
  }, []);
  const handleProfile = () => {
    setOpen(false);
    navigate("/dashboard?tab=profile");
  };

  return (
    <div ref={refer} className="relative bg-black rounded-full ">
      <img
        onClick={() => setOpen(!open)}
        src={img.profilePicture!}
        className="cursor-pointer border-[2px] border-gray-500 w-8 rounded-full h-8"
        alt="display-img"
      />
      {open && (
        <div className="z-[100]  absolute top-full flex flex-col items-start gap-2 bg-white w-[250px] h-fit right-1 rounded-lg shadow-lg overflow-hidden cursor-default">
          <div className=" p-2 w-full ">
            <h1 className="text-gray-600">@{img.username}</h1>
            <h1 className="text-ellipsis overflow-hidden">{img.email}</h1>
          </div>
          <h1
            onClick={handleProfile}
            className="hover:bg-[#efefef] border-t-2 cursor-pointer duration-300   w-full px-2 py-2"
          >
            Profile
          </h1>
          <h1
            className="hover:bg-[#efefef] border-t-2 cursor-pointer duration-300 w-full px-2 py-2"
            onClick={handle}
          >
            Sign out
          </h1>
        </div>
      )}
    </div>
  );
}

export default LoggedInUser;
