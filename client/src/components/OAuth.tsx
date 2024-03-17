import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { BsGoogle } from "react-icons/bs";
import { app } from "../firebaseConfig";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/user/userSlice";

function OAuth({ reload }: { reload: (str: string) => void }) {
  const navigate = useNavigate();

  const handleGoogleProvider = async () => {
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    const auth = getAuth(app);
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const user = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.user.displayName,
          email: user.user.email,
          profilePicture: user.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signIn(data));
        navigate("/");
      } else {
        reload(data.message);
      }
    } catch (error) {
      if (error instanceof Error) reload(error.message);

      console.error(error);
    }
  };
  //   console.log(error);
  return (
    <button
      onClick={handleGoogleProvider}
      type="button"
      className="active:scale-90 border-red-300  transition-all transform hover:from-[#79bc60] hover:text-white hover:to-[#de37ce] bg-gradient-to-r group rounded-md border-2 items-center p-2"
    >
      <BsGoogle
        size={21}
        className="group-hover:bg-white group-hover:text-black p-1 text-white bg-black rounded-full inline-block transition-none"
      />{" "}
      Continue with Google
    </button>
  );
}

export default React.memo(OAuth);
