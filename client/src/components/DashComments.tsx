import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommentProps } from "../constants/types";

function DashComments() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [comments, setListings] = useState<CommentProps[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch(`/api/comment/getComments`);
        const data = await res.json();
        if (res.ok) {
          setListings(data as CommentProps[]);
        } else {
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

  console.log(comments);
  return (
    <div className="w-full py-2 px-1 overflow-x-auto overflow-hidden">
      {currentUser?.isAdmin && comments?.length > 0 ? (
        <table className="shadow-md table-auto my-3  w-full max-w-[1320px] text-left mx-auto">
          <thead className="w-full">
            <tr className="w-full text-[14px] ">
              <th className="w-1/12 border-2 p-2">Date Updated</th>
              <th className="w-2/12 border-2 p-2">Comment Content</th>
              <th className="w-1/12 border-2 p-2">Number of Likes</th>
              <th className="w-2/12 border-2 p-2">PostId</th>
              <th className="w-1/12 border-2 p-2">UserId</th>
              <th className="w-1/12 border-2 p-2 ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment: CommentProps, index: number) => (
              <tr key={index}>
                <td className=" border-2 p-2">
                  {new Date(comment?.updatedAt as string).toLocaleDateString()}
                </td>
                <td className=" border-2 p-2">{comment?.content}</td>
                <td className=" border-2 p-2">{comment?.likes?.length}</td>
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
        <div>You have no users.yet</div>
      )}
    </div>
  );
}

export default DashComments;
