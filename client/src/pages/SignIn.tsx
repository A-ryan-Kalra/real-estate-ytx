import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormDataProps } from "../constants/types";
import OAuth from "../components/OAuth";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataProps>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch(`/api/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
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
  // console.log(formData);
  const reloadedError = useCallback((err: string) => {
    setError(err);
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="max-w-[750px] p-3 relative translate-y-[25%] flex max-sm:flex-col  items-center justify-center mx-auto w-full">
        <div className="flex flex-col gap-3 mb-4 p-2 flex-1">
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
          className="flex-1 gap-3 max-sm:w-full  flex flex-col"
        >
          <div>
            <label className="block" htmlFor="email">
              Your Email
            </label>
            <input
              id="email"
              onChange={handleChange}
              value={formData?.email || ""}
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
            className="active:scale-90 bg-fuchsia-500 hover:bg-fuchsia-700 duration-[0.3s] text-white font-bold rounded-md shadow-md p-2"
          >
            Sign In
          </button>
          <OAuth reload={reloadedError} />
          <p className="text-[14px]">
            Dont Have an account?{" "}
            <span
              onClick={() => navigate("/sign-up")}
              className="cursor-pointer text-blue-400"
            >
              Sign Up
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

export default SignIn;
