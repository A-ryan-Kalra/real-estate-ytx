import React, { useEffect, useRef, useState } from "react";
import { CommentProps } from "../constants/types";
import useGetListingComments from "../hooks/useGetListingComments";
import CommentsSection from "./CommentsSection";

function Comments({
  currentUser,
  postId,
}: {
  currentUser: any;
  postId: string;
}) {
  //   console.log(postId);
  const { data, error, isLoading, mutate } = useGetListingComments(postId);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [formData, setFormData] = useState<CommentProps>({
    content: "",
    likes: [],
    postId,
    userId: currentUser._id,
  });
  const commentContainerRef = useRef<HTMLDivElement>(null);

  //   console.log(comments);

  useEffect(() => {
    if (data && data?.length > 0) {
      setComments(data);
      if (commentContainerRef?.current) {
        commentContainerRef.current.scrollTop = 0;
      }
    }
  }, [data]);

  useEffect(() => {
    setFormData((prev: CommentProps) => ({
      ...prev,
      postId,
    }));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/comment/create/${postId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      if (res.ok) {
        setFormData((prev: CommentProps) => ({
          ...prev,
          content: "",
        }));

        // console.log(data);
      } else {
        console.error(data);
      }
      mutate();
    } catch (error) {
      console.error(error);
    }
  };
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev: CommentProps) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  //   console.log(formData);

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
      <form
        onSubmit={handleSubmit}
        className="border-2 border-teal-600 py-4 px-5 rounded-md overflow-hidden"
      >
        <textarea
          onChange={handleText}
          value={formData?.content || ""}
          maxLength={200}
          id="content"
          placeholder="Give reviews regarding your stay!"
          className="w-full resize-none border-2 border-slate-300 p-2 h-24 focus-visible:outline-none focus-visible:ring-teal-400 focus-visible:ring-[2px] focus-visible:border-2 focus-visible:border-transparent rounded-md duration-200"
        />
        <div className="flex w-full items-center justify-between py-1 px-3">
          <h1 className="text-slate-500">
            {200 - formData?.content?.length} characters remaining
          </h1>
          <button
            type="submit"
            className="border-2 rounded-md bg-teal-500 hover:shadow-teal-200 text-white font-semibold active:scale-75 hover:border-teal-500 duration-300 ease-in-out shadow-md p-2"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center gap-4 my-3">
        <h1 className="text-left flex w-full gap-3 whitespace-nowrap items-center">
          Comments{" "}
          <span className="border-2 py-[1px] px-2 border-slate-300">
            {comments?.length}
          </span>
        </h1>

        <div
          className="w-full flex flex-col gap-3 border-2 p-2 border-slate-300 rounded-xl overflow-hidden max-h-[500px] overflow-y-auto"
          ref={commentContainerRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {Comments?.length > 0 ? (
            comments?.map((comment: CommentProps, index: number) => (
              <CommentsSection mutate={mutate} key={index} comment={comment} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Comments);
