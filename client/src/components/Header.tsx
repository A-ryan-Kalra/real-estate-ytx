import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-[#E2E9F1] shadow-md">
      <div className="justify-between py-4 px-4 items-center max-w-[1320px] mx-auto whitespace-nowrap flex w-full">
        <Link to="/" className="font-sans font-semibold text-gray-600 text-xl">
          Aryan<span className="text-teal-600">Estate</span>
        </Link>
        <form className="bg-white px-2 rounded-md shadow-sm max-sm:hidden">
          <div className="relative items-center flex">
            <input
              type="text"
              placeholder="Search..."
              className=" bg-transparent  focus-visible:outline-none p-2 "
            />
            <HiSearch size={25} className="cursor-pointer" />
          </div>
        </form>
        <div className="flex gap-4 duration-300 ">
          <Link className="hover:underline" to={"/"}>
            Home
          </Link>
          <Link className="hover:underline" to={"/about"}>
            About
          </Link>
          <Link className="hover:text-gray-500" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      </div>
      <form className=" px-2 rounded-md shadow-sm sm:hidden">
        <div className="bg-white relative items-center flex border-2 rounded-xl ">
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent   w-full focus-visible:outline-none p-2 "
          />
          <HiSearch size={25} className="cursor-pointer" />
        </div>
      </form>
    </div>
  );
}

export default Header;
