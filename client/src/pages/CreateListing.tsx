import { useState } from "react";

function CreateListing() {
  const [checked, setChecked] = useState("rent");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.id);
  };

  return (
    <div className="min-h-screen  max-w-[900px] mx-auto">
      <div className="flex flex-col items-center gap-3  my-8 justify-center">
        <h1 className="text-3xl font-bold">Create a Listing</h1>
        <form className="flex w-full gap-3">
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              className="p-2 rounded-md border-2"
              placeholder="Name"
            />
            <textarea
              className="p-2 rounded-md resize-none border-2 h-[100px]"
              placeholder="Description"
            ></textarea>
            <input
              type="text"
              className="p-2 rounded-md border-2"
              placeholder="Address"
            />
            <div className="flex gap-5  flex-wrap max-w-[90%]">
              <div className="flex gap-1 items-center">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  checked={checked === "sell"}
                  id="sell"
                  onChange={handleChange}
                />
                <label className="text-[18px]" htmlFor="sell">
                  Sell
                </label>
              </div>
              <div className="flex gap-1 items-center">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  checked={checked === "rent"}
                  id="rent"
                  onChange={handleChange}
                />
                <label className="text-[18px]" htmlFor="rent">
                  Rent
                </label>
              </div>
              <div className="flex gap-1 items-center">
                <input className="h-5 w-5" type="checkbox" id="parking" />
                <label className="text-[18px]" htmlFor="parking">
                  Parking
                </label>
              </div>

              <div className="flex gap-1 items-center">
                <input className="h-5 w-5" type="checkbox" id="furnished" />
                <label className="text-[18px]" htmlFor="furnished">
                  Furnished
                </label>
              </div>

              <div className="flex gap-1 items-center">
                <input className="h-5 w-5" type="checkbox" id="offer" />
                <label className="text-[18px]" htmlFor="offer">
                  Offer
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-2 items-center">
                <input
                  className="w-[100px] h-[50px] border-2 rounded-md p-2"
                  type="number"
                  id="beds"
                  defaultValue={1}
                />
                <label htmlFor="beds">Beds</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  className="w-[100px] h-[50px] border-2 rounded-md p-2"
                  type="number"
                  defaultValue={1}
                  id="beds"
                />
                <label htmlFor="beds">Baths</label>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                defaultValue={0}
                id="price"
                className="w-[150px] h-[50px] border-2 rounded-md p-2"
              />
              <label htmlFor="price" className="flex flex-col items-center">
                <h1>Regular price</h1>
                <h1 className="text-sm"> (₹ / Month)</h1>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <h1 className="font-semibold">
                Images:{" "}
                <span className="font-normal">
                  The first image will be the cover (max 6)
                </span>
              </h1>
            </div>
            <div className="flex gap-3 p-2">
              <div className="border-2 rounded-md p-3">
                <input
                  type="file"
                  name=""
                  accept="image/*"
                  multiple={true}
                  id=""
                />
              </div>
              <button
                type="button"
                className="border-2 rounded-md p-2 hover:shadow-teal-300 hover:shadow-md duration-300"
              >
                Upload
              </button>
            </div>
            <button
              type="submit"
              className="mx-2 active:scale-90 duration-300 bg-slate-700 text-white tracking-wide rounded-md p-2 border-2"
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
