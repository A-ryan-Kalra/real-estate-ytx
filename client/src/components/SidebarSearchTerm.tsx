function SidebarSearchTerm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex py-4 px-4 flex-col gap-7 w-full border-r-2 h-full"
    >
      <div className="my-3 flex gap-2 items-center">
        <label htmlFor="search">Search Term</label>
        <input
          type="search"
          name=""
          id="search"
          placeholder="Search..."
          autoComplete="off"
          className="border-2 resize-none focus-visible:outline-none p-2 rounded-md"
        />
      </div>
      <div className="flex gap-3 flex-wrap">
        <h1>Type: </h1>
        <div className="flex items-center gap-1">
          <input type="checkbox" name="" className="w-5 h-5" id="rent_sale" />
          <label className="text-[17px]" htmlFor="rent_sale">
            Rent & Sale
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input type="checkbox" name="" className="w-5 h-5" id="rent" />
          <label className="text-[17px]" htmlFor="rent">
            Rent
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input type="checkbox" name="" className="w-5 h-5" id="sale" />
          <label className="text-[17px]" htmlFor="sale">
            Sale
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input type="checkbox" name="" className="w-5 h-5" id="offer" />
          <label className="text-[17px]" htmlFor="offer">
            Offer
          </label>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-3 ">
        <h1>Amenities: </h1>
        <div className="flex items-center gap-1">
          <input type="checkbox" name="" className="w-5 h-5" id="parking" />
          <label className="text-[17px]" htmlFor="parking">
            Parking
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input type="checkbox" name="" className="w-5 h-5" id="furnished" />
          <label className="text-[17px]" htmlFor="furnished">
            Furnished
          </label>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h1>Sort: </h1>
        <select name="" id="" className="p-3 rounded-md shadow-sm">
          <option className="p-2" id="">
            Price high to low
          </option>
          <option className="p-2" id="">
            Price low to high
          </option>
          <option className="p-2" id="">
            Latest
          </option>
          <option className="p-2" id="">
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
