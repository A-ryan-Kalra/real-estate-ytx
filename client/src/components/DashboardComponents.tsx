import { useEffect, useState } from "react";
import { CommentProps, FormDataProps } from "../constants/types";
import CardInfo from "./CardInfo";
import { Link } from "react-router-dom";

function DashboardComponents() {
  const [user, setUser] = useState<any>([]);
  const [listing, setListing] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  // const [sessionEnded, setSessionEnded] = useState<any>();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          // console.log(data);
          setComments(data as CommentProps[]);
        } else {
          // setSessionEnded(data);
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getListings = async () => {
      try {
        const res = await fetch(`/api/listing/getlistings?limit=5`);
        const data = await res.json();
        if (res.ok) {
          // console.log(data);
          setListing(data);
        } else {
          console.error(data);
          // setSessionEnded(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/user/getUsers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          // console.log(data);
          setUser(data as FormDataProps[]);
        } else {
          console.error(data);
          // setSessionEnded(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    getListings();
    getComments();
  }, []);
  // console.log(user);
  // console.log(listing);
  // console.log(comments);
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-wrap p-3 gap-3 items-center justify-center">
        <CardInfo user={user} type="Users" icons="mdi:people-group-outline" />
        <CardInfo user={comments} type="Comments" icons="ic:outline-chat" />
        <CardInfo
          user={listing}
          type="Listings"
          icons="healthicons:health-worker-form"
        />
      </div>

      <div className="flex gap-4 w-full max-w-[1490px] overflow-hidden  p-2  mx-auto flex-wrap justify-center">
        <div className="flex  max-md:w-full w-[300px]  shadow-md flex-col border-2 border-slate-100 p-1 overflow-auto">
          <div className="flex flex-row gap-3 justify-around items-center font-semibold">
            <h1>Recent users</h1>
            <Link
              to={`/dashboard?tab=users`}
              className="border-2 whitespace-nowrap p-2 rounded-xl shadow-md bg-teal-500 text-white hover:shadow-teal-400 duration-300"
            >
              See all
            </Link>
          </div>
          <table className="my-2 w-full">
            <thead>
              <tr className="">
                <th className="text-[14px] border-2 w-1/2 whitespace-nowrap p-2 ">
                  User Image
                </th>
                <th className="text-[14px] border-2 w-1/2 whitespace-nowrap p-2 ">
                  Username
                </th>
              </tr>
            </thead>
            <tbody>
              {user?.users?.map((usr: any, index: number) => (
                <tr
                  key={index}
                  className="  items-center justify-between w-full"
                >
                  <td className="rounded-full p-1   border-2 ">
                    <img
                      src={usr?.profilePicture!}
                      className="mx-auto rounded-full object-cover max-w-[50px] max-h-[50px]"
                      alt="profile "
                    />
                  </td>
                  <td className="break-all p-1 border-2">{usr?.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex  shadow-md max-md:w-full md:max-w-[500px]  flex-col border-2 border-slate-100 px-2 py-1  overflow-auto">
          <div className="flex flex-row gap-3 justify-around items-center font-semibold">
            <h1>Recent Listings</h1>
            <Link
              to={`/dashboard?tab=listings`}
              className="border-2 p-2 rounded-xl shadow-md bg-teal-500 text-white hover:shadow-teal-400 whitespace-nowrap duration-300"
            >
              See all
            </Link>
          </div>
          <table className="my-2 w-full">
            <thead>
              <tr className="">
                <th className="text-[14px] border-2 w-1/4 whitespace-nowrap p-2 ">
                  Listing Image
                </th>
                <th className="text-[14px] border-2 w-1/3 whitespace-nowrap p-2 ">
                  Listing Title
                </th>
                <th className="text-[14px] border-2 w-1/4 whitespace-nowrap p-2 ">
                  Prices
                </th>
              </tr>
            </thead>
            <tbody>
              {listing?.listings?.map((usr: any, index: number) => (
                <tr
                  key={index}
                  className="  items-center justify-between w-full"
                >
                  <td className=" p-1   border-2 ">
                    <img
                      src={usr?.imageUrls[0]}
                      className="mx-auto  object-cover max-w-[100px] max-h-[100px]"
                      alt="profile "
                    />
                  </td>
                  <td className=" p-1   border-2 ">{usr?.name}</td>
                  <td className="break-all p-1 text-[18px] text-center border-2">
                    ₹
                    {usr?.regularPrice.toLocaleString("en-IN", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex   shadow-md  max-md:w-full md:max-w-[400px] flex-col border-2 border-slate-100 px-2 py-1  overflow-auto">
          <div className="flex flex-row gap-3 justify-around items-center font-semibold">
            <h1>Recent Comments</h1>
            <Link
              to={`/dashboard?tab=comments`}
              className="border-2 p-2 whitespace-nowrap rounded-xl shadow-md bg-teal-500 text-white hover:shadow-teal-400 duration-300"
            >
              See all
            </Link>
          </div>
          <table className="my-2 w-full">
            <thead>
              <tr className="">
                <th className="text-[14px] border-2 w-1/2 whitespace-nowrap p-2 ">
                  Comment Content
                </th>
                <th className="text-[14px] border-2 w-1/2 whitespace-nowrap p-2 ">
                  Likes
                </th>
              </tr>
            </thead>
            <tbody>
              {comments?.allComments?.map((usr: any, index: number) => (
                <tr
                  key={index}
                  className="  items-center justify-between w-full"
                >
                  <td className="rounded-full break-words p-1   border-2 ">
                    {usr?.content}
                  </td>
                  <td className="break-all p-1 text-[18px] text-center border-2">
                    {usr?.likes?.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponents;
