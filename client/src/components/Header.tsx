import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-[#E2E9F1] shadow-md">
      <div className="justify-between py-4 px-4 items-center max-w-[1320px] mx-auto whitespace-nowrap flex w-full">
        <h1>
          Aryan <span>Estate</span>
        </h1>
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
        <div className="flex gap-3">
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/signin"}>Sign In</Link>
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
