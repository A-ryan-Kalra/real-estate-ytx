import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListingDataProps } from "../constants/types";
import { Link } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";

function DashListings() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [user, setUser] = useState<ListingDataProps[]>([]);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const [sessionEnded, setSessionEnded] = useState<any>();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/listing/getlistings`);
        const data = await res.json();
        if (res.ok) {
          // console.log(data);
          setUser(data?.listings);
        } else {
          console.error(data);
          setSessionEnded(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [load]);
  //   console.log(user);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
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

  return (
    <div className=" max-w-[1350px] mx-auto w-full  max-h-[800px] py-2 px-2 overflow-auto">
      {currentUser?.isAdmin && user?.length > 0 ? (
        <table className="shadow-md table-auto my-3  w-full  max-w-[1320px] text-left mx-auto ">
          <thead className="w-full">
            <tr className="w-full text-[14px] ">
              <th className="w-1/12 border-2 p-2 whitespace-nowrap">
                Date Created
              </th>
              <th className="w-1/12 border-2 p-2 whitespace-nowrap">
                Listing Image
              </th>
              <th className="w-2/12 border-2 p-2 whitespace-nowrap">
                Listing Title
              </th>
              <th className="w-2/12 border-2 p-2 whitespace-nowrap">
                Regular Price
              </th>
              <th className="w-2/12 border-2 p-2 whitespace-nowrap">
                Discount Price
              </th>
              <th className="w-1/12 border-2 p-2 whitespace-nowrap">Delete</th>
              <th className="w-1/12 border-2 p-2 whitespace-nowrap ">Edit</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((usr: ListingDataProps, index: number) => (
              <tr key={index}>
                <td className=" border-2 p-2">
                  {new Date(usr?.createdAt as string).toLocaleDateString()}
                </td>
                <td className=" border-2 p-2">
                  <img
                    src={usr?.imageUrls[0]}
                    className="mx-auto object-cover w-[100px] h-[70px]"
                    alt="profile "
                  />
                </td>
                <td className=" border-2 p-2 break-words">
                  <Link
                    to={`/listing/${usr?._id}`}
                    className="hover:underline break-words"
                  >
                    {usr?.name}
                  </Link>
                </td>
                <td className="items-center border-2 p-2">
                  ₹{""}
                  {usr?.regularPrice.toLocaleString("en-IN", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </td>

                <td className="items-center border-2 p-2">
                  {usr?.discountPrice !== 0
                    ? `₹` +
                      usr?.discountPrice?.toLocaleString("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                    : "No Discount allowed"}
                </td>

                <td
                  onClick={() => handleDelete(usr?._id as string)}
                  className=" border-2 p-2 text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </td>
                <td className=" border-2 p-2 items-center ">
                  <Link
                    to={`/edit-listing/${usr?._id}`}
                    className="hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>You have no users yet!</div>
      )}
    </div>
  );
}

export default DashListings;
