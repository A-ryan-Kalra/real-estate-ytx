import React, { useEffect, useRef, useState } from "react";
import { CommentProps, FormDataProps } from "../constants/types";
import useGetUser from "../hooks/useGetUser";
import moment from "moment";
import { HiThumbUp, HiTrash } from "react-icons/hi";

function CommentsSection({ comment }: { comment: CommentProps }) {
  const { data, error, isLoading, mutate } = useGetUser(comment?.userId);
  const [user, setUser] = useState<FormDataProps>();

  useEffect(() => {
    setUser(data);
  }, [data]);

  //   console.log(user);
  console.log(comment);

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
          <div className="flex gap-2">
            <HiThumbUp size={20} />
            <HiTrash size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;
