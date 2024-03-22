import React, { useEffect, useRef, useState } from "react";
import { CommentProps, FormDataProps } from "../constants/types";
import useGetUser from "../hooks/useGetUser";
import moment from "moment";
import { HiThumbUp, HiTrash } from "react-icons/hi";

function CommentsSection({
  comment,
  mutate: mutated,
}: {
  comment: CommentProps;
  mutate: () => void;
}) {
  const { data, error, isLoading, mutate } = useGetUser(comment?.userId);
  const [user, setUser] = useState<FormDataProps>();

  useEffect(() => {
    setUser(data);
  }, [data]);

  //   console.log(user);
  //   console.log(comment);
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/delete/${comment?._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        mutated();
      } else {
        console.log(data);
      }
      //   mutate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full border-2 p-2 rounded-md shadow-sm">
      <div className="flex ">
        <div className="rounded-full relative  w-fit p-1">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.profilePicture}
            alt="img"
          />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <h1 className="font-semibold whitespace-nowrap flex items-center gap-2 hover:underline cursor-default">
            @{user?.username}{" "}
            <span className="text-[10px] text-slate-500">
              {moment(comment?.updatedAt).fromNow()}
            </span>
          </h1>
          <h1 className="text-gray-600">{comment?.content}</h1>
          <div className="flex gap-3 items-center">
            <span className="flex whitespace-nowrap text-[16px] items-center gap-1">
              <span className="rounded-full active:scale-90 p-1 hover:bg-blue-200 cursor-pointer duration-300 hover:text-white">
                <HiThumbUp size={20} className="text-blue-600" />
              </span>
              {comment?.likes?.length} Like
            </span>
            <span
              onClick={handleDelete}
              className="rounded-full p-1 active:scale-90 hover:bg-red-200 cursor-pointer duration-300 hover:text-white"
            >
              <HiTrash size={20} className="text-red-400 rounded-full " />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;
