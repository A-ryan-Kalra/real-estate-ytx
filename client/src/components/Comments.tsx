import React, { useEffect, useState } from "react";

function Comments({ currentUser }: { currentUser: any }) {
  //   console.log(currentUser);
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  console.log(message);

  return (
    <div className="flex flex-col my-6 gap-3">
      <h1 className="flex gap-2 text-slate-600 whitespace-nowrap">
        Signed in as:{" "}
        <img
          src={currentUser?.profilePicture}
          className="w-6 rounded-full h-6 "
          alt="img"
        />{" "}
        <span className="text-fuchsia-700">@{currentUser?.username}</span>
      </h1>
      <form className="border-2 border-teal-600 py-4 px-5 rounded-md overflow-hidden">
        <textarea
          onChange={handleChange}
          value={message}
          maxLength={200}
          placeholder="Give reviews regarding your stay!"
          className="w-full resize-none border-2 border-slate-300 p-2 h-24 focus-visible:outline-none focus-visible:ring-teal-400 focus-visible:ring-[2px] focus-visible:border-2 focus-visible:border-transparent rounded-md duration-200"
        />
        <div className="flex w-full items-center justify-between py-1 px-3">
          <h1 className="text-slate-500">
            {200 - message?.length} characters remaining
          </h1>
          <button
            type="button"
            className="border-2 rounded-md bg-teal-500 hover:shadow-teal-200 text-white font-semibold active:scale-75 hover:border-teal-500 duration-300 ease-in-out shadow-md p-2"
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <h1>Comments</h1>
      </div>
    </div>
  );
}

export default React.memo(Comments);
