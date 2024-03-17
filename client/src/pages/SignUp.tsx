import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormDataProps } from "../constants/types";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { ClipLoader } from "react-spinners";
import OAuth from "../components/OAuth";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataProps>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch(`/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(signInSuccess(data));

          setLoading(false);
          navigate("/");
        } else {
          const data = await res.json();
          setError(data?.message);
          setLoading(false);

          // console.log(data);
          // console.log(res);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ann error occurred!");
        }
      }
    },
    [formData]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(
      (prev) =>
        ({
          ...prev,
          [e.target.id]: e.target.value,
        } as FormDataProps)
    );
  };
  // console.log(error, "Error");
  const reloadedError = useCallback((err: string) => {
    setError(err);
  }, []);

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

        <form
          onSubmit={handleSubmit}
          className="flex-1 gap-3 flex flex-col max-sm:w-full "
        >
          <div>
            <label className="block" htmlFor="username">
              Your Username
            </label>
            <input
              id="username"
              onChange={handleChange}
              value={formData?.username || ""}
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
              onChange={handleChange}
              required={true}
              value={formData?.email || ""}
              className="w-full p-2 rounded-md  border-2 focus-visible:outline-none"
              placeholder="abc@xyz.com"
              autoComplete="on"
              type="email"
            />
          </div>
          <div>
            <label className="block" htmlFor="password">
              Your Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={formData?.password || ""}
              placeholder="*******"
              className="w-full p-2 rounded-md  border-2 focus-visible:outline-none"
              autoComplete="on"
              id="password"
            />
          </div>
          <button
            type="submit"
            className={`${
              loading ? "bg-opacity-40" : ""
            } active:scale-90 bg-fuchsia-500 hover:bg-fuchsia-700 duration-[0.3s] text-white font-bold rounded-md shadow-md p-2`}
          >
            {loading ? (
              <span className="z-10 flex items-center justify-center gap-2">
                {" "}
                <ClipLoader color="#5aae9d" size={23} /> Loading...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
          <OAuth reload={reloadedError} />
          <p className="text-[14px]">
            Have an account?{" "}
            <span
              onClick={() => navigate("/sign-in")}
              className="cursor-pointer text-blue-400"
            >
              Sign In
            </span>
          </p>
          {error && (
            <div className="bg-red-200 text-red-500 rounded-lg p-2 ">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
