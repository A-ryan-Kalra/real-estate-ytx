import {
  HiArrowRight,
  HiChartPie,
  HiChatAlt,
  HiDocumentText,
  HiUser,
  HiUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashSideBar({ tab }: { tab: string }) {
  const { currentUser } = useSelector((state: any) => state.user);
  //   console.log(currentUser);
  return (
    <div className="w-56 bg-slate-100 text-slate-800">
      {currentUser.isAdmin ? (
        <div className="flex flex-col gap-4 px-4 py-2">
          <Link
            to="/dashboard?tab=dashboard"
            className={`relative ${
              tab === "dashboard" && "bg-slate-200 rounded-md"
            } items-center gap-2 flex p-1`}
          >
            <HiChartPie
              className={`${tab !== "dashboard" && "text-slate-500"}`}
              size={25}
            />
            <h1 className="text-lg">Profile</h1>
          </Link>

          <Link
            to="/dashboard?tab=profile"
            className={`relative ${
              tab === "profile" && "bg-slate-200 rounded-md"
            } items-center gap-2 flex p-1`}
          >
            <HiUser
              className={`${tab !== "profile" && "text-slate-500"}`}
              size={25}
            />
            <h1 className="text-lg">Profile</h1>
            <h1 className="absolute right-2  text-[11px] font-semibold bg-slate-600  text-white p-1 rounded-md overflow-hidden ">
              Admin
            </h1>
          </Link>

          <Link
            to="/dashboard?tab=posts"
            className={`relative ${
              tab === "posts" && "bg-slate-200 rounded-md"
            } items-center gap-2 flex p-1`}
          >
            <HiDocumentText
              className={`${tab !== "posts" && "text-slate-500"}`}
              size={25}
            />
            <h1 className="text-lg">Profile</h1>
          </Link>

          <Link
            to="/dashboard?tab=comments"
            className={`relative ${
              tab === "comments" && "bg-slate-200 rounded-md"
            } items-center gap-2 flex p-1`}
          >
            <HiChatAlt
              className={`${tab !== "comments" && "text-slate-500"}`}
              size={25}
            />
            <h1 className="text-lg">Comments</h1>
          </Link>

          <Link
            to="/dashboard?tab=users"
            className={`relative ${
              tab === "users" && "bg-slate-200 rounded-md"
            } items-center gap-2 flex p-1`}
          >
            <HiUserGroup
              className={`${tab !== "users" && "text-slate-500"}`}
              size={25}
            />
            <h1 className="text-lg">Users</h1>
          </Link>

          <Link
            to="/dashboard?tab=profile"
            className={`hover:bg-slate-200 rounded-md duration-300
        items-center gap-2 flex p-1`}
          >
            <HiArrowRight className={`text-slate-500`} size={25} />
            <h1 className="text-lg">Sign out</h1>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-4 py-2">
          <Link
            to="/dashboard?tab=profile"
            className={`relative ${
              tab === "profile" && "bg-slate-200 rounded-md"
            } items-center gap-2 flex p-1`}
          >
            <HiUser
              className={`${tab !== "profile" && "text-slate-500"}`}
              size={25}
            />
            <h1 className="text-lg">Profile</h1>
            <h1 className="absolute right-2  text-[11px] font-semibold bg-slate-600  text-white p-1 rounded-md overflow-hidden ">
              User
            </h1>
          </Link>
          <Link
            to="/dashboard?tab=profile"
            className={`hover:bg-slate-200 rounded-md duration-300
        items-center gap-2 flex p-1`}
          >
            <HiArrowRight className={`text-slate-500`} size={25} />
            <h1 className="text-lg">Sign out</h1>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashSideBar;
