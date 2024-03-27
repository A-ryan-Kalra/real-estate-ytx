import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashListings from "../components/DashListings";
import DashboardComponents from "../components/DashboardComponents";

function Dashboard() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  // console.log(tab);
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="">
        <DashSideBar tab={tab} />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComments />}
      {tab === "listings" && <DashListings />}
      {tab === "dashboard" && <DashboardComponents />}
    </div>
  );
}

export default Dashboard;
