import { useEffect, useState } from "react";
import { ListingDataProps } from "../constants/types";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebaseConfig";
import firebase from "firebase/compat/app";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const [checked, setChecked] = useState("rent");
  const { currentUser } = useSelector((state: any) => state.user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgFile, setImgFile] = useState<boolean>(false);
  const [imgFile1, setImgFile1] = useState<boolean>(false);
  const [formData, setFormData] = useState<ListingDataProps>({
    userRef: currentUser._id,
    address: "",
    bathrooms: 1,
    bedrooms: 1,
    description: "",
    name: "",
    regularPrice: 500,
    discountPrice: 0,
    furnished: false,
    offer: false,
    parking: false,
    type: "rent",
  } as ListingDataProps);
  const [imgUploadingProgress, setImageFileUploadingProgress] = useState<
    string[] | null
  >(["0"]);
  const [imgFileUrl, setImgFileUrl] = useState<string[]>([]);
  const [imgFileUrl1, setImgFileUrl1] = useState<File[]>([]);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [imgLink, setImgLink] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    setError("");
    setSuccess("");

    if (e.target.id === "rent" || e.target.id === "sale") {
      setChecked(e.target.id);
      setFormData({ ...formData, type: e.target.id } as ListingDataProps);
    } else {
      if (
        typeof e.target.checked === "boolean" &&
        e.target.type === "checkbox"
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked,
        } as ListingDataProps);
      } else {
        setFormData({
          ...formData,
          [e.target.id]:
            e.target.type === "number"
              ? parseInt(e.target.value)
              : e.target.value,
        } as ListingDataProps);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(`/api/listing/create/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      console.log(data);
      console.log("data");
      setLoading(false);
      if (res.ok) {
        setSuccess("Information saved successfully");
        setFormData({} as ListingDataProps);
        navigate(`/listing/${data._id}`);
      } else {
        setError(data.message);
      }
      // console.log(data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (imgFile && !error) {
      uploadImage();
    }
    if (imgFileUrl.length > 0 || loading) {
      setImgFile1(true);
    } else {
      setImgFile1(false);
    }
  }, [imgFile, imgFileUrl]);
  useEffect(() => {
    if (imgLink.length > 0) {
      setFormData((prev) => ({
        ...prev,
        imageUrls: imgLink,
      }));
    }
  }, [imgLink]);

  const uploadImage = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    const storage = getStorage(app);
    const uploadTasks: firebase.storage.UploadTask[] = [];

    for (let i = 0; i < imgFileUrl1!.length; i++) {
      const fileName = new Date().getTime() + imgFileUrl1![i]!.name;
      const storageRef = ref(storage, `listingImg/${fileName}`);
      const uploadTask = uploadBytesResumable(
        storageRef,
        imgFileUrl1![i] as Blob
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadingProgress((prev: any) => {
            const newProgress = [...prev];

            newProgress[i] = progress.toFixed(0);
            return newProgress;
          });
        },
        (error) => {
          setError("Could not upload (File must be less than 4MB)");
          setImageFileUploadingProgress(null);
          setImgFileUrl1([]);
          setImgFileUrl([]);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImgFileUrl([]);
            setImgFileUrl1([]);
            setImgLink((prev) => [...prev, downloadUrl]);
            setLoading(false);
            setImgFile1(false);
            setImgFile(false);
          });
        }
      );
      uploadTasks.push(uploadTask as any);
    }
    Promise.all(uploadTasks.map((task: any) => task.promise)).then(() => {
      console.log("All files uploaded successfully");
    });
  };
  // console.log(formData);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    setImgFile1(true);
    const fileArray: File[] = Array.from(e.target.files as FileList);
    // 3999999;
    setTimeout(() => {
      let hasError = false;
      for (const i of fileArray) {
        if (i.size > 3999999) {
          setError(i.name.slice(0, 20) + "Image should be less than 4mb");
          setImgFileUrl([]);
          setImgFileUrl1([]);
          setLoading(false);
          e.target.value = "";

          hasError = true;
          return null;
        } else {
          setImgFileUrl((prev) => [...prev, URL.createObjectURL(i)]);
          setImgFileUrl1((prev) => [...prev, i]);
        }
      }
      setLoading(false);

      // if (!hasError) {
      //   setImgFile(fileArray);
      //   console.log("outside");
      // }
    }, 800);
  };
  const handleImgUrlDelete = (image: string, index: number) => {
    const filteredUrls = imgFileUrl.filter((img) => img !== image);
    setImgFileUrl(filteredUrls);
    const filteredUrls1 = imgFileUrl1.filter((_, ind) => ind !== index);
    setImgFileUrl1(filteredUrls1);
  };
  const handleUploadImage = () => {
    if (imgFileUrl1.length === 0) {
      setError("No images selected yet.");
      return null;
    }
    setImgFile(true);
    setLoading(true);
  };

  return (
    <div className="min-h-screen p-2 max-w-[930px] mx-auto">
      <div className="flex flex-col items-center gap-3  my-8 justify-center">
        <h1 className="text-3xl font-bold">Create a Listing</h1>
        <form
          onSubmit={handleSubmit}
          className="flex md:flex-row flex-col w-full gap-3 p-2"
        >
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              id="name"
              minLength={10}
              maxLength={60}
              className="p-2 rounded-md border-2"
              placeholder="Name"
              onChange={handleChange}
              required={true}
            />
            <textarea
              className="p-2 rounded-md resize-none border-2 h-[100px]"
              id="description"
              placeholder="Description"
              required={true}
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              className="p-2 rounded-md border-2"
              id="address"
              required={true}
              placeholder="Address"
              onChange={handleChange}
            />
            <div className="flex gap-5 p-1 flex-wrap max-w-[90%]">
              <div className="flex gap-1 items-center">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  checked={checked === "sale"}
                  id="sale"
                  onChange={handleChange}
                />
                <label className="text-[18px]" htmlFor="sale">
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
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                />
                <label className="text-[18px]" htmlFor="parking">
                  Parking
                </label>
              </div>

              <div className="flex gap-1 items-center">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                />
                <label className="text-[18px]" htmlFor="furnished">
                  Furnished
                </label>
              </div>

              <div className="flex gap-1 items-center">
                <input
                  onChange={handleChange}
                  className="h-5 w-5"
                  type="checkbox"
                  id="offer"
                />
                <label className="text-[18px]" htmlFor="offer">
                  Offer
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-2 items-center">
                <input
                  onChange={handleChange}
                  className="w-[100px] h-[50px] border-2 rounded-md p-2"
                  type="number"
                  min={1}
                  max={10}
                  id="bedrooms"
                  defaultValue={1}
                />
                <label htmlFor="bedrooms">Beds</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  onChange={handleChange}
                  className="w-[100px] h-[50px] border-2 rounded-md p-2"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  id="bathrooms"
                />
                <label htmlFor="bathrooms">Baths</label>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <input
                onChange={handleChange}
                type="number"
                min={500}
                max={500000000}
                defaultValue={0}
                id="regularPrice"
                className="w-[150px] h-[50px] border-2 rounded-md p-2"
              />
              <label
                htmlFor="regularPrice"
                className="flex flex-col items-center"
              >
                <h1>Regular price</h1>
                <h1 className="text-sm"> (₹ / Month)</h1>
              </label>
            </div>
            {formData.offer && (
              <div className="flex gap-3 items-center">
                <input
                  onChange={handleChange}
                  type="number"
                  min={500}
                  max={500000000}
                  defaultValue={0}
                  id="discountPrice"
                  className="w-[150px] h-[50px] border-2 rounded-md p-2"
                />
                <label
                  htmlFor="discountPrice"
                  className="flex flex-col items-center"
                >
                  <h1>Discount price</h1>
                  <h1 className="text-sm">
                    {" "}
                    {formData.type === "rent" ? "(₹ / Month)" : "(₹)"}
                  </h1>
                </label>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="">
              <h1 className="font-semibold">
                Images:{" "}
                <span className="font-normal">
                  The first image will be the cover (max 6)
                </span>
              </h1>
            </div>
            <div className="flex gap-3 ">
              <div className="border-2 min-w-[100px]  overflow-hidden rounded-md p-3">
                <input
                  onChange={handleImg}
                  type="file"
                  className="text-ellipsis"
                  accept="image/*"
                  multiple={true}
                />
              </div>
              <button
                type="button"
                onClick={handleUploadImage}
                className="border-2 rounded-md p-2 w-20 hover:shadow-teal-300 hover:shadow-md duration-300"
              >
                {loading ? (
                  <ClipLoader
                    size={25}
                    speedMultiplier={1.5}
                    color={"#63c0ac"}
                    className=""
                  />
                ) : (
                  "Upload"
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={imgFile1}
              className="disabled:bg-opacity-20  active:scale-90 duration-300 bg-slate-700 text-white tracking-wide rounded-md p-2 border-2"
            >
              Create Listing
            </button>
            {error && (
              <div className="border-2 m-2 bg-red-200 text-red-500 rounded-md p-2">
                {error}
              </div>
            )}
            {success && (
              <div className="border-2 m-2 bg-green-200 text-green-700 rounded-md p-2">
                {success}
              </div>
            )}
            {imgFileUrl.length > 0 && (
              <div className=" p-2 flex flex-col gap-2 max-h-[350px] overflow-y-auto border-2 rounded-md shadow-sm">
                {imgFileUrl.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="p-2 flex justify-between items-center border-2 rounded-md  shadow-md hover:shadow-teal-300 duration-300 ease-in-out w-full"
                  >
                    <img
                      src={img}
                      className="w-20 h-20 object-cover overflow-hidden rounded-md"
                      alt={"img"}
                    />
                    <button
                      type="button"
                      onClick={() => handleImgUrlDelete(img, index)}
                      className="border-2  p-3 rounded-md hover:bg-red-200 duration-300 hover:border-red-300 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
