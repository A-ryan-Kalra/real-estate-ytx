import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormDataProps } from "../constants/types";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
function DashUsers() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [user, setUser] = useState<FormDataProps[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/user/getUsers`);
        const data = await res.json();
        if (res.ok) {
          setUser(data as FormDataProps[]);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [load]);
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setLoad(!load);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //   console.log(user);
  return (
    <div className="w-full py-2 px-1 overflow-x-auto overflow-hidden">
      {currentUser?.isAdmin && user?.length > 0 ? (
        <table className="shadow-md table-auto my-3  w-full max-w-[1320px] text-left mx-auto">
          <thead className="w-full">
            <tr className="w-full text-[14px] ">
              <th className="w-1/12 border-2 p-2">Date Created</th>
              <th className="w-1/12 border-2 p-2">User Image</th>
              <th className="w-2/12 border-2 p-2">Username</th>
              <th className="w-2/12 border-2 p-2">Email</th>
              <th className="w-1/12 border-2 p-2">Admin</th>
              <th className="w-1/12 border-2 p-2 ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((usr: FormDataProps, index: number) => (
              <tr key={index}>
                <td className=" border-2 p-2">
                  {new Date(usr?.createdAt as string).toLocaleDateString()}
                </td>
                <td className=" border-2 p-2">
                  <img
                    src={usr!.profilePicture}
                    className="rounded-full object-cover max-w-14 max-h-14"
                    alt="profile "
                  />
                </td>
                <td className=" border-2 p-2">{usr?.username}</td>
                <td className=" border-2 p-2">{usr?.email}</td>
                <td className=" border-2 p-2 items-center ">
                  {usr?.isAdmin ? (
                    <MdOutlineDone size={18} color="#308a69" />
                  ) : (
                    <RxCross2 size={18} color="#ac3e3e" />
                  )}
                </td>
                <td
                  onClick={() => handleDelete(usr?._id as string)}
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

export default DashUsers;
