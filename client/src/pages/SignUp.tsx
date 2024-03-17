import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen ">
      <div className="max-w-[750px] p-3 relative translate-y-[25%] flex max-sm:flex-col items-center justify-center mx-auto w-full">
        <div className="flex flex-col gap-3 p-2 mb-4 flex-1">
          <Link
            to="/"
            className="font-sans  font-semibold text-gray-600 text-3xl"
          >
            Aryan<span className="text-teal-600">Estate</span>
          </Link>
          <h1 className="text-sm">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </h1>
        </div>
        <form className="flex-1 gap-3 flex flex-col max-sm:w-full ">
          <div>
            <label className="block" htmlFor="username">
              Your Username
            </label>
            <input
              id="username"
              className="w-full p-2 rounded-md  border-2 focus-visible:outline-none"
              placeholder="username"
              autoComplete="on"
              type="text"
            />
          </div>
          <div>
            <label className="block" htmlFor="email">
              Your Email
            </label>
            <input
              id="email"
              className="w-full p-2 rounded-md  border-2 focus-visible:outline-none"
              placeholder="abc@xyz.com"
              autoComplete="on"
              type="text"
            />
          </div>
          <div>
            <label className="block" htmlFor="password">
              Your Password
            </label>
            <input
              type="password"
              placeholder="*******"
              className="w-full p-2 rounded-md  border-2 focus-visible:outline-none"
              autoComplete="on"
              id="password"
            />
          </div>
          <button className="active:scale-90 bg-fuchsia-500 hover:bg-fuchsia-700 duration-[0.3s] text-white font-bold rounded-md shadow-md p-2">
            Sign In
          </button>
          <button className="active:scale-90 border-red-300  transition-all transform hover:from-[#79bc60] hover:text-white hover:to-[#de37ce] bg-gradient-to-r group rounded-md border-2 items-center p-2">
            <BsGoogle
              size={21}
              className="group-hover:bg-white group-hover:text-black p-1 text-white bg-black rounded-full inline-block transition-none"
            />{" "}
            Continue with Google
          </button>
          <p className="text-[14px]">
            Have an account?{" "}
            <span
              onClick={() => navigate("/sign-in")}
              className="cursor-pointer text-blue-400"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
