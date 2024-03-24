import { useLocation } from "react-router-dom";
import SidebarSearchTerm from "../components/SidebarSearchTerm";

function Search() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="min-h-screen flex gap-2">
      <div className="w-[440px] ">
        <SidebarSearchTerm />
      </div>
    </div>
  );
}

export default Search;
