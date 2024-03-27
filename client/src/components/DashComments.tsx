import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentProps } from "../constants/types";
import { signOut } from "../redux/user/userSlice";

function DashComments() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [comments, setListings] = useState<CommentProps[]>([]);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const [sessionEnded, setSessionEnded] = useState<any>();

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch(`/api/comment/getComments`);
        const data = await res.json();
        if (res.ok) {
          // console.log(data);
          setListings(data?.allComments as CommentProps[]);
        } else {
          setSessionEnded(data);
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getListings();
  }, [load]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/comment/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        // console.log(data);
        setLoad(!load);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSession = () => {
    dispatch(signOut());
  };

  if (sessionEnded?.message === "Unauthorized") {
    return (
      <div className="w-full relative justify-center px-3 pt-10 flex">
        <div
          className="text-xl relative top-[20%] text-center h-fit border-2 p-3 w-fit rounded-md hover:shadow-md hover:shadow-slate-300 duration-300 ease-in-out cursor-pointer"
          onClick={handleSession}
        >
          Session has been expired, try signing in again
        </div>
      </div>
    );
  }

  //   console.log(comments);
  return (
    <div className="w-full py-2 px-1 overflow-x-auto overflow-hidden">
      {currentUser?.isAdmin && comments?.length > 0 ? (
        <table className="shadow-md table-auto my-3  w-full max-w-[1320px] text-left mx-auto">
          <thead className="w-full">
            <tr className="w-full text-[14px] ">
              <th className="w-1/12 border-2 p-2 whitespace-nowrap">
                Date Updated
              </th>
              <th className="w-2/12 border-2 p-2 whitespace-nowrap">
                Comment Content
              </th>
              <th className="w-1/12 border-2 p-2 whitespace-nowrap">
                Number of Likes
              </th>
              <th className="w-2/12 border-2 p-2 whitespace-nowrap">PostId</th>
              <th className="w-1/12 border-2 p-2 whitespace-nowrap">UserId</th>
              <th className="w-1/12 border-2 p-2 whitespace-nowrap ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment: CommentProps, index: number) => (
              <tr key={index}>
                <td className=" border-2 p-2">
                  {new Date(comment?.updatedAt as string).toLocaleDateString()}
                </td>
                <td className="max-w-[200px] break-all border-2 p-2">
                  {comment?.content}
                </td>
                <td className=" border-2 p-2 text-center text-[17px]">
                  {comment?.likes?.length}
                </td>
                <td className=" border-2 p-2">{comment?.postId}</td>
                <td className=" border-2 p-2 items-center ">
                  {comment?.userId}
                </td>
                <td
                  onClick={() => handleDelete(comment?._id as string)}
                  className=" border-2 p-2 text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>You have no comments yet!</div>
      )}
    </div>
  );
}

export default DashComments;
