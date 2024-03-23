import { useEffect, useState } from "react";
import { CommentProps, FormDataProps } from "../constants/types";
import useGetUser from "../hooks/useGetUser";
import moment from "moment";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { HiThumbUp, HiTrash } from "react-icons/hi";
import { useSelector } from "react-redux";

function CommentsSection({
  comment,
  mutate: mutated,
}: {
  comment: CommentProps;
  mutate: () => void;
}) {
  const { data, error, isLoading, mutate } = useGetUser(comment?.userId);
  const { currentUser } = useSelector((state: any) => state.user);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<FormDataProps>();

  useEffect(() => {
    setUser(data);
    setMessage(comment?.content);
  }, [data]);

  // console.log(user);
  // console.log(comment);
  // console.log(currentUser);
  // console.log(comment?.userId === currentUser?._id);
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/delete/${comment?._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        mutated();
      } else {
        console.log(data);
      }
      //   mutate();
    } catch (error) {
      console.error(error);
    }
  };
  const handleLike = async () => {
    try {
      const res = await fetch(`/api/comment/like/${comment?._id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        mutated();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = async () => {
    setEdit(false);
    try {
      const res = await fetch(`/api/comment/editComment/${comment?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (res.ok) {
        mutated();
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full border-2 p-2 rounded-md shadow-sm">
      <div className="flex gap-1 ">
        <div className="rounded-full relative  w-fit p-1">
          <img
            className="object-cover max-w-[40px] max-h-[40px] rounded-full"
            src={user?.profilePicture}
            alt="img"
          />
        </div>
        {!edit ? (
          <div className="flex flex-col gap-1 p-1 ">
            <h1 className="font-semibold whitespace-nowrap flex items-center gap-2 hover:underline cursor-default">
              @{user?.username}{" "}
              <span className="text-[10px] text-slate-500">
                {moment(comment?.createdAt).fromNow()}
              </span>
            </h1>
            <h1 className="text-gray-600">{comment?.content}</h1>
            <div className="flex gap-3 items-center">
              <span className="flex whitespace-nowrap text-[16px] items-center gap-1">
                <span
                  title="Like"
                  className="rounded-full active:scale-90 p-1 hover:bg-blue-200 cursor-pointer duration-300 hover:text-white"
                >
                  <HiThumbUp
                    onClick={handleLike}
                    size={20}
                    className={`${
                      comment?.likes?.includes(currentUser?._id)
                        ? "text-blue-600"
                        : "text-slate-500"
                    }`}
                  />
                </span>
                {comment?.likes?.length === 0 ? "" : comment?.likes?.length}{" "}
                Like
              </span>
              {(comment?.userId === currentUser?._id ||
                currentUser?.isAdmin) && (
                <>
                  <span
                    title="Edit"
                    onClick={() => setEdit(true)}
                    className="rounded-full p-1 active:scale-90 hover:bg-slate-200 cursor-pointer duration-300 hover:text-white"
                  >
                    <FaEdit
                      size={20}
                      className=" text-slate-500 rounded-full "
                    />
                  </span>
                  <span
                    title="Delete"
                    onClick={handleDelete}
                    className="rounded-full p-1 active:scale-90 hover:bg-red-200 cursor-pointer duration-300 hover:text-white"
                  >
                    <HiTrash size={20} className="text-red-400 rounded-full " />
                  </span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <textarea
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
              className="w-full resize-none h-16 focus-visible:outline-none border-2 rounded-md p-1"
            />
            <div className="flex  items-center justify-end gap-3">
              <button
                className="border-2 p-2 shadow-md rounded-md hover:border-teal-300 hover:scale-95 bg-teal-500 text-white font-semibold duration-300 ease-in-out"
                onClick={handleEdit}
              >
                Save
              </button>
              <button
                className="border-2 p-2 shadow-md rounded-md hover:scale-95 bg-slate-600 hover:border-slate-300 text-white font-semibold duration-300 ease-in-out"
                onClick={() => {
                  setEdit(false);
                  setMessage(comment?.content);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
