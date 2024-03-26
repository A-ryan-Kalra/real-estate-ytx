import React, { useEffect, useState } from "react";
import { SearchProps } from "../constants/types";
import { useLocation, useNavigate } from "react-router-dom";

function SidebarSearchTerm() {
  const [check, setChecked] = useState<string>("all");
  const [formData, setFormData] = useState<SearchProps>({
    type: check,
    searchTerm: "",
    furnished: false,
    offer: false,
    sort: "createdAt_desc",
    order: "desc",
    parking: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  // console.log(location.search);
  // console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    urlParams.set("searchTerm", formData?.searchTerm as string);
    urlParams.set("type", formData?.type as string);
    urlParams.set("parking", formData?.parking as unknown as string);
    urlParams.set("furnished", formData?.furnished as unknown as string);
    urlParams.set("sort", formData?.sort as string);
    urlParams.set("order", formData?.order as string);
    urlParams.set("offer", formData?.offer as unknown as string);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    const offerFromUrl = urlParams.get("offer");

    setFormData({
      searchTerm: searchTermFromUrl || formData.searchTerm,
      type: typeFromUrl || formData.type,
      parking: parkingFromUrl === "true" || formData.parking,
      furnished: furnishedFromUrl === "true" || formData.furnished,
      sort: sortFromUrl || formData.sort,
      order: orderFromUrl || formData.order,
      offer: offerFromUrl === "true" || formData.offer,
    });
  }, [urlParams.toString()]);

  // console.log(formData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setChecked(e.target.id);
      setFormData((prev: any) => ({
        ...prev,
        type: e.target.id,
      }));
    } else if (e.target.type === "checkbox") {
      setFormData((prev: any) => ({
        ...prev,
        [e.target.id]: e.target.checked,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      e.target.value === "regularPrice_desc" ||
      e.target.value === "createdAt_desc"
    ) {
      setFormData((prev: any) => ({
        ...prev,
        sort: e?.target?.value,
        order: "desc",
      }));
    } else if (
      e.target.value === "regularPrice_asc" ||
      e.target.value === "createdAt_asc"
    ) {
      setFormData((prev: any) => ({
        ...prev,
        sort: e?.target?.value,
        order: "asc",
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex py-4 relative px-4 flex-col gap-2 md:gap-7 w-full "
    >
      <div className="my-3 flex gap-2 items-center whitespace-nowrap">
        <label htmlFor="search">Search Term</label>
        <input
          type="search"
          name=""
          onChange={handleChange}
          value={formData?.searchTerm}
          id="searchTerm"
          placeholder="Search..."
          autoComplete="off"
          className="border-2 w-full resize-none focus-visible:outline-none p-2 rounded-md"
        />
      </div>
      <div className="flex gap-3 flex-wrap">
        <h1>Type: </h1>
        <div className="flex items-center gap-1">
          <input
            onChange={handleChange}
            type="checkbox"
            className="w-5 h-5"
            checked={formData?.type == "all"}
            id="all"
          />
          <label className="text-[17px]" htmlFor="rent_sale">
            Rent & Sale
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input
            onChange={handleChange}
            type="checkbox"
            checked={formData?.type == "rent"}
            className="w-5 h-5"
            id="rent"
          />
          <label className="text-[17px]" htmlFor="rent">
            Rent
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input
            onChange={handleChange}
            type="checkbox"
            checked={formData?.type == "sale"}
            className="w-5 h-5"
            id="sale"
          />
          <label className="text-[17px]" htmlFor="sale">
            Sale
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input
            onChange={handleChange}
            type="checkbox"
            checked={formData?.offer}
            className="w-5 h-5"
            id="offer"
          />
          <label className="text-[17px]" htmlFor="offer">
            Offer
          </label>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-3 ">
        <h1>Amenities: </h1>
        <div className="flex items-center gap-1">
          <input
            onChange={handleChange}
            type="checkbox"
            className="w-5 h-5"
            id="parking"
            checked={formData?.parking}
          />
          <label className="text-[17px]" htmlFor="parking">
            Parking
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input
            onChange={handleChange}
            type="checkbox"
            className="w-5 h-5"
            id="furnished"
            checked={formData?.furnished}
          />
          <label className="text-[17px]" htmlFor="furnished">
            Furnished
          </label>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h1>Sort: </h1>
        <select
          id="sort"
          onChange={handleSelectChange}
          value={formData?.sort}
          className="p-3 rounded-md shadow-sm"
        >
          <option className="p-2" value="regularPrice_desc">
            Price high to low
          </option>
          <option className="p-2" value="regularPrice_asc">
            Price low to high
          </option>
          <option className="p-2" value="createdAt_desc">
            Latest
          </option>
          <option className="p-2" value="createdAt_asc">
            Oldest
          </option>
        </select>
      </div>
      <button
        type="submit"
        className="border-2 p-2 rounded-xl bg-slate-600 text-white duration-300 ease-in-out hover:scale-95 active:scale-100 shadow-md shadow-slate-500 border-none"
      >
        Search
      </button>
    </form>
  );
}

export default SidebarSearchTerm;
