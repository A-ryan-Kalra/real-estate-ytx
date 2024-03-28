import { HiSearch } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoggedInUser from "./LoggedInUser";
import { useEffect, useState } from "react";

function Header() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  // console.log(currentUser);
  useEffect(() => {
    const searchQuery = urlParams.get("searchTerm");
    if (searchQuery) {
      setSearchTerm(searchQuery as string);
    } else if (searchQuery === "") {
      setSearchTerm(searchQuery as string);
    }
  }, [urlParams.get("searchTerm")]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/search?searchTerm=${searchTerm}`);
  };
  return (
    <div className="bg-[#E2E9F1] shadow-md">
      <div className="justify-between py-4 px-4 items-center max-w-[1320px] mx-auto whitespace-nowrap flex w-full">
        <Link
          to="/"
          onClick={() => setSearchTerm("")}
          className="font-sans font-semibold text-gray-600 text-xl"
        >
          Aryan<span className="text-teal-600">Estate</span>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white px-2 rounded-md shadow-sm max-sm:hidden"
        >
          <div className="relative items-center flex">
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              value={searchTerm}
              placeholder="Search..."
              className=" bg-transparent  focus-visible:outline-none p-2 "
            />
            <button type="submit">
              <HiSearch size={22} className="cursor-pointer" />
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center gap-4 duration-300 ">
          <Link
            className="hover:underline"
            onClick={() => setSearchTerm("")}
            to={"/"}
          >
            Home
          </Link>
          <Link
            className="hover:underline"
            onClick={() => setSearchTerm("")}
            to={"/about"}
          >
            About
          </Link>
          {currentUser ? (
            <LoggedInUser img={currentUser} />
          ) : (
            <Link className="hover:text-gray-500" to={"/sign-in"}>
              Sign In
            </Link>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className=" px-2 rounded-md shadow-sm sm:hidden "
      >
        <div className="bg-white px-2 relative items-center flex border-2 rounded-xl ">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            value={searchTerm}
            className=" bg-transparent   w-full focus-visible:outline-none p-2 "
          />
          <button className="">
            <HiSearch
              onClick={() => navigate(`/search?searchTerm=${searchTerm}`)}
              size={22}
              className=""
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Header;
