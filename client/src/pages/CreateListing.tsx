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

function CreateListing() {
  const [checked, setChecked] = useState("rent");
  const { currentUser } = useSelector((state: any) => state.user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgFile, setImgFile] = useState<File[] | undefined | null>();
  const [formData, setFormData] = useState<ListingDataProps>({
    userRef: currentUser._id,
  } as ListingDataProps);
  const [imgUploadingProgress, setImageFileUploadingProgress] = useState<
    string[] | null
  >(["0"]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    console.log(typeof e.target.value);
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
    try {
      const res = await fetch(`/api/listing/create/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (imgFile && imgFile?.length > 0) {
      uploadImage();
    }
  }, [imgFile]);

  const uploadImage = async () => {
    setLoading(true);
    setError("");
    const storage = getStorage(app);
    const uploadTasks: firebase.storage.UploadTask[] = [];
    for (let i = 0; i < imgFile!.length; i++) {
      const fileName = new Date().getTime() + imgFile![i]!.name;
      const storageRef = ref(storage, `listingImg/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile![i] as Blob);

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
          setImgFile(null);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            //   setFormData((prev) => ({
            //     ...prev,
            //     profilePicture: downloadUrl,
            //   }));
            console.log(downloadUrl);
            setLoading(false);
          });
        }
      );
      uploadTasks.push(uploadTask as any);
    }
    Promise.all(uploadTasks.map((task: any) => task.promise)).then(() => {
      console.log("All files uploaded successfully");
    });
  };
  //   console.log(imgUploadingProgress, "imageProgress");
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArray: File[] = Array.from(e.target.files as FileList);
    setImgFile(fileArray);
  };

  return (
    <div className="min-h-screen  max-w-[900px] mx-auto">
      <div className="flex flex-col items-center gap-3  my-8 justify-center">
        <h1 className="text-3xl font-bold">Create a Listing</h1>
        <form onSubmit={handleSubmit} className="flex w-full gap-3">
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              id="name"
              className="p-2 rounded-md border-2"
              placeholder="Name"
              onChange={handleChange}
            />
            <textarea
              className="p-2 rounded-md resize-none border-2 h-[100px]"
              id="description"
              placeholder="Description"
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              className="p-2 rounded-md border-2"
              id="address"
              placeholder="Address"
              onChange={handleChange}
            />
            <div className="flex gap-5  flex-wrap max-w-[90%]">
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
                  onChange={handleImg}
                  type="file"
                  name=""
                  accept="image/*"
                  multiple={true}
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
