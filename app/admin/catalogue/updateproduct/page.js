"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { dbfs, storage } from "../../../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { v4 } from "uuid";
import { Input } from "postcss";
import { Textarea } from "@material-tailwind/react";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PulseLoader } from "react-spinners";
import SyncLoader from "react-spinners/SyncLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import {
  doc,
  updateDoc,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function AddData() {
  const query = useSearchParams();
  const productid = query.get("pid");
  console.log(productid);

  const [search, setSearch] = useState("");
  const [catbrand, setCatBrand] = useState([]);
  const [id, setId] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  const [btnenable, setBtnEnable] = useState(false);
  const [loaderEnable, setLoaderEnable] = useState(false);
  const [data, setData] = useState({
    title: "",
    discountedprice: null,
    realprice: null,
    description: "",
    images: [],
    category: "",
    categoryBrand: [],
    searchQuery: [],
    brand: "",
    rating: 0,
    id: "",
    color: "",
  });

  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const getData = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "realprice" || name === "discountedprice") {
      value = parseInt(value, 10); // Use parseInt to convert 'value' to a number
      if (isNaN(value)) {
        value = null; // Set 'age' to null if it's not a valid number
      }
    }

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    if (name === "title") {
      setSearch(value);
    }
  };

  useEffect(() => {
    setCatBrand(data.brand + " " + data.category);
  }, [data.brand, data.category]);

  //
  const handleImages = (e) => {
    setLoaderEnable(true);
    const files = e.target.files;
    const targetedFiles = [...files];
    setUploadImages(targetedFiles);
  };

  useEffect(() => {
    if (uploadImages === null) return;

    let uploadCounter = 0;

    uploadImages.map((curImg) => {
      const imageref = ref(storage, `productImages/${curImg.name + v4()}`);

      uploadBytes(imageref, curImg).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setData((prev) => {
            return { ...prev, images: [...prev.images, url] };
          });
          uploadCounter++;

          if (uploadCounter === uploadImages.length) {
            setBtnEnable(true);
            setLoaderEnable(false);
            toast.success("All Images are added");
          }
        });
      });
    });
  }, [uploadImages]);

  const printData = async () => {
    //  const ref =  dbfs
    //   .collection("Products")
    //   .doc("NILXeILBXJS2tULfuNSR")
    //   .collection("watch")
    //   .doc(productid);

    //   try{
    //    await updateDoc(ref, {
    //     title: data.title,
    //     discountedprice: data.discountedprice,
    //     realprice: data.realprice,
    //     description: data.description,
    //     images: data.images,
    //     category: data.category,
    //     categoryBrand: data.categoryBrand,
    //     searchQuery: data.searchQuery,
    //     brand: data.brand,
    //     color: data.color,
    //   }).then(async() => {
    //     dbfs
    //     .collection("AllProducts")
    //     .doc(id);
    //     await updateDoc(ref, {
    //       title: data.title,
    //       discountedprice: data.discountedprice,
    //       realprice: data.realprice,
    //       description: data.description,
    //       images: data.images,
    //       category: data.category,
    //       brand: data.brand,
    //       color: data.color,
    //     })
    //     .then(() => {
    //       toast.success("Product Details Updated.");
    //     });
    //   setData({});

    //   toast.success("data added to firebase");
    //   })
    // }catch(error){

    // }

    try {
      dbfs
        .collection("Products")
        .doc("NILXeILBXJS2tULfuNSR")
        .collection(data.category)
        .doc(productid)
        .set(data)
        .then(() => {
          dbfs
            .collection("AllProducts")
            .doc(productid)
            .set(data)
            .then(() => {
              toast.success("Product Details Updated.");
            });
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    function generateSubstrings() {
      const substrings = [];
      let currentSubstring = "";

      for (const char of catbrand) {
        currentSubstring += char;
        substrings.push(currentSubstring.trim().toLowerCase());
      }
      return substrings;
    }

    const substringsArray = generateSubstrings();

    setData((prev) => {
      return {
        ...prev,
        categoryBrand: substringsArray,
      };
    });
  }, [catbrand]);

  useEffect(() => {
    function generateSubstrings() {
      const substrings = [];
      let currentSubstring = "";

      for (const char of search) {
        currentSubstring += char;
        substrings.push(currentSubstring.trim().toLowerCase());
      }

      return substrings;
    }

    const substringsArray = generateSubstrings();
    console.log(substringsArray);

    setData((prev) => {
      return {
        ...prev,
        searchQuery: substringsArray,
      };
    });
  }, [search]);

  useEffect(() => {
    try {
      const docRef = dbfs
        .collection("AllProducts")
        .where("id", "==", productid)
        .onSnapshot((snapshot) => {
          snapshot.forEach((cur) => {
            setData(cur.data());
          });
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteImg = async (id, curImg) => {
    const productRef = dbfs.collection("AllProducts").doc(id);
    const ref = dbfs
      .collection("Products")
      .doc("NILXeILBXJS2tULfuNSR")
      .collection(data.category)
      .doc(id);

    try {
      await updateDoc(ref, {
        images: arrayRemove(curImg),
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
    try {
      await updateDoc(productRef, {
        images: arrayRemove(curImg),
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="w-[100%] bg-bgback pt-5 shadow">
      <div className="lg:max-w-[970px] min-w-[400px] p-5 mx-auto text-black select-none">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div className="text-left">
          <h1 className="font-semibold text-xl text-left">Update Product</h1>
        </div>

        <div className="grid grid-cols-1 p-5 gap-3 select-none">
          <div className="flex items-center gap-4 py-2">
            <input
              id="title"
              type="text"
              name="title"
              value={data?.title}
              className="w-[350px] h-[40px] p-2 border-[1px] outline-none border-solid border-black rounded"
              placeholder="Enter Product Title"
              onChange={getData}
            />

            <input
              id="brand"
              type="text"
              name="brand"
              value={data?.brand}
              className="w-[350px] h-[40px] p-2 border-[1px] outline-none border-solid border-black rounded"
              placeholder="Enter Brand"
              onChange={getData}
            />
          </div>

          <div className="flex items-center gap-4 py-2">
            <input
              id="disprice"
              type="number"
              name="discountedprice"
              value={data?.discountedprice}
              className="w-[350px] h-[40px] p-2 border-[1px] outline-none border-solid border-black rounded"
              placeholder="Enter Discounted Price"
              onChange={getData}
            />

            <input
              id="realprice"
              type="number"
              name="realprice"
              value={data?.realprice}
              className="w-[350px] h-[40px] p-2 border-[1px] outline-none border-solid border-black rounded"
              placeholder="Enter Product Price"
              onChange={getData}
            />
          </div>

          <div className="flex items-center gap-4 py-2">
            <select
              onChange={getData}
              name="category"
              value={data?.category}
              className="border-solid w-[350px] border-gray-600 border-[1px] rounded p-2 outline-none"
            >
              <option value="">Select</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Jacket">Jacket</option>
              <option value="Jeans">Jeans</option>
              <option value="Shirts">Shirt</option>
              <option value="Shoes">Shoes</option>
              <option value="Sunglasses">Sunglass</option>
              <option value="Sweater">Sweater</option>
              <option value="Tshirts">Tshirt</option>
              <option value="watch">Watch</option>
            </select>

            <select
              onChange={getData}
              name="color"
              value={data?.color}
              className="border-solid w-[350px] border-gray-600 border-[1px] rounded p-2 outline-none"
            >
              <option value="">Select</option>
              <option value="Red">Red</option>
              <option value="Black">Black</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Gray">Gray</option>
              <option value="Pink">Pink</option>
              <option value="Brown">Brown</option>
              <option value="White">White</option>
              <option value="Blue">Blue</option>
              <option value="Orange">Orange</option>
              <option value="Purple">Purple</option>
              <option value="Light">Light</option>
            </select>
          </div>

          <div className="">
            <textarea
              cols="60"
              rows="6"
              type="text"
              name="description"
              value={data?.description}
              className="p-2 border-[1px]  py-4 outline-none border-solid border-black rounded"
              placeholder="Enter Description"
              onChange={getData}
            />
          </div>

          <div className="flex items-center gap-3">
            {
              <div className="flex gap-2">
                {data.images?.map((curImg, index) => {
                  return (
                    <div key={index} className="">
                      <RxCross2
                        onClick={() => deleteImg(data.id, curImg)}
                        color="red"
                        size={20}
                        className="relative left-10 top-3"
                      />
                      <Image
                        src={curImg}
                        className="border-[1px] border-solid border-gray-400 rounded w-[60px] h-20 p-2"
                        width={300}
                        height={300}
                        alt="produc-images"
                      />
                    </div>
                  );
                })}
              </div>
            }

            <input
              type="file"
              accept="images/*"
              className="border-[1px] border-solid border-gray-400 rounded"
              onChange={handleImages}
              multiple
            />

            <BeatLoader
              color="#FF3F6C"
              loading={loaderEnable}
              cssOverride={CSSProperties}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>

          <div className="py-4">
            <button
              className=" text-white bg-pink-400 px-4 py-2 rounded"
              onClick={printData}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddData;
