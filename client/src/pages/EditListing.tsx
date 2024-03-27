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
import { useParams, useNavigate } from "react-router-dom";

function EditListing() {
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
    regularPrice: 0,
    discountPrice: 0,
    furnished: false,
    offer: false,
    parking: false,
    type: "rent",
  } as ListingDataProps);

  const [_, setImageFileUploadingProgress] = useState<string[] | null>(["0"]);
  const [imgFileUrl1, setImgFileUrl1] = useState<File[]>([]);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [imgLink, setImgLink] = useState<string[]>([]);
  const urlParams = useParams();
  const [checked, setChecked] = useState("");
  // console.log(formData);
  useEffect(() => {
    const getList = async () => {
      try {
        const list = await fetch(`/api/listing/getlisting/${currentUser._id}`);
        const data = await list.json();

        if (list.ok) {
          const filtered: ListingDataProps = data.find(
            (dat: ListingDataProps) => dat._id === urlParams.id
          );
          setChecked(filtered?.type as string);
          // setImgFileUrl(filtered?.imageUrls);
          setImgLink(filtered.imageUrls);

          setFormData(filtered);
        } else {
          setError(data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        console.error(error);
      }
    };
    getList();
  }, []);
  // console.log(editListing);
  // console.log(formData);

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
      const res = await fetch(`/api/listing/editlisting/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      // console.log(data);
      // console.log("Updateddata");
      setLoading(false);
      if (res.ok) {
        setSuccess("Information saved successfully");
        setFormData({} as ListingDataProps);
        navigate(`/listing/${formData._id}`);
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
    // if (editListing || loading) {
    //   setImgFile1(true);
    // } else {
    //   setImgFile1(false);
    // }
  }, [imgFile]);

  useEffect(() => {
    if (imgLink.length > 0) {
      setFormData((prev) => ({
        ...prev,
        imageUrls: imgLink,
      }));
    }
  }, [imgLink]);

  const uploadImage = async () => {
    // alert("asdwasd");
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
        () => {
          setError("Could not upload (File must be less than 4MB)");
          setImageFileUploadingProgress(null);
          setImgFileUrl1([]);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
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

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArray: File[] = Array.from(e.target.files as FileList);
    // console.log(fileArray.length);
    if (fileArray.length > 6) {
      setError("Can't upload more than 6 images at a time.");
      setImgFileUrl1([]);
      setImgFile1(false);

      e.target.value = "";
      return null;
    }
    setError("");
    setSuccess("");

    setImgFile1(true);
    // 3999999;

    // let hasError = false;
    for (const i of fileArray) {
      if (i.size > 3999999) {
        setError(i.name.slice(0, 20) + "Image should be less than 4mb");
        setImgFileUrl1([]);
        // e.target.value = "";

        // hasError = true;
        return null;
      } else {
        setImgFileUrl1((prev) => [...prev, i]);
      }
    }
    // e.target.value = "";
    // if (!hasError) {
    //   setImgFile(fileArray);
    //   console.log("outside");
    // }
  };
  const handleImgUrlDelete = (image: string) => {
    // const filteredUrls = imgFileUrl.filter((img) => img !== image);
    // setImgFile1(true);
    setImgLink((prev) => prev.filter((img) => img !== image));
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
        <h1 className="text-3xl font-bold">Edit Listing</h1>
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
              defaultValue={formData?.name || ""}
              onChange={handleChange}
              required={true}
            />
            <textarea
              className="p-2 rounded-md resize-none border-2 h-[100px]"
              id="description"
              placeholder="Description"
              required={true}
              defaultValue={formData?.description || ""}
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              className="p-2 rounded-md border-2"
              id="address"
              required={true}
              defaultValue={formData?.address || ""}
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
                  // checked={formData?.type === "sale"}
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
                  // checked={formData?.type === "rent"}
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
                  checked={formData?.parking}
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
                  checked={formData?.furnished}
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
                  checked={formData?.offer}
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
                  min={"1"}
                  max={"10"}
                  id="bedrooms"
                  value={formData?.bedrooms?.toString()}
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
                  value={formData?.bathrooms.toString()}
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
                required
                value={formData?.regularPrice.toString()}
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
                  required
                  value={formData?.discountPrice?.toString()}
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
              Edit Listing
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
            {imgLink.length > 0 && (
              <div className=" p-2 flex flex-col gap-2 max-h-[350px] overflow-y-auto border-2 rounded-md shadow-sm">
                {imgLink.map((img: string, index: number) => (
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
                      onClick={() => handleImgUrlDelete(img)}
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

export default EditListing;
