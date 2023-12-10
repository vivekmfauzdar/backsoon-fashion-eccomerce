"use client";

import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsBagHeart } from "react-icons/bs";
import Link from "next/link";
import { dbfs } from "../firebase";
import { getAuth } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function Account() {
  const router = useRouter();

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    phoneNum: "",
    uid: "",
  });

  const [userUid, setUserUid] = useState("");
  const [details, setDetails] = useState();
  const [status, setStatus] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState({});

  const gettingDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //Getting the current user uid
  useEffect(() => {
    const auth = getAuth();

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user);
      } else {
        // setUserUid(null)
        router.push("/login");
      }
    });
  }, []);

  const checkerror = () => {};

  //getting the current user data
  useEffect(() => {
    const GetData = () => {
      try {
        if (userUid.uid) {
          const docRef = dbfs.collection("Users").doc(userUid.uid);

          docRef.onSnapshot((snapshot) => {
            if (snapshot.exists) {
              const details = snapshot.data();
              setData(details);
            }
          });
        }
      } catch (error) {}
    };

    GetData();
  }, [userUid]);

  const saveData = () => {
    const error = {};
    if (data.fname === "") {
      error.fname = "Fname can't be empty";
    } else if (data.lname === "") {
      error.lname = "Lname can't be empty";
    } else if (data.email === "") {
      error.email = "Email can't be empty";
    }
    setError(error);

    const fullData = {
      ...data,
      uid: userUid.uid,
      phoneNum: userUid.phoneNumber,
    };

    if (Object.values(error).every((value) => value === "")) {
      try {
        const doc = dbfs
          .collection("Users")
          .doc(userUid.uid)
          .set(fullData)
          .then(() => {
            toast.success("Profile Updated successfully!");
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const enableInput = () => {
    setStatus(!status);
    setIsDisabled(!isDisabled);
  };

  return (
    <div className="w-[100%]">
      <div className="max-w-[1070px] min-w-[600px] mx-auto">
        <Toaster toastOptions={{ duration: 2000 }} />
        <div className="pt-10">
          <div className="pl-10">
            <h1 className="font-semibold">My Profile</h1>
            <h1 className="font-semibold text-sky-600 text-2xl">
              Hi, {data?.fname}
            </h1>
          </div>

          <div className="flex items-center gap-4 pt-5 pl-10">
            <h3 className="font-semibold">Personal Information</h3>
            <h3
              className="font-semibold text-xl caret-transparent text-blue-500 cursor-pointer"
              onClick={enableInput}
            >
              {status ? "Edit" : "Cancel"}
            </h3>
          </div>

          <div className="py-5 px-5">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 shadow-md bg-white col-span-3 p-5 lg:gap-2">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="fname">First Name*</label>
                <input
                  type="text"
                  name="fname"
                  disabled={isDisabled}
                  className={`outline-none border-2 border-solid border-gray-400 rounded p-2 ${
                    isDisabled ? "bg-gray-100 text-gray-400" : "bg-white"
                  }`}
                  placeholder="Your First Name"
                  value={data?.fname}
                  onChange={gettingDetails}
                />
                <span className="text-red-400">{error.fname}</span>

                <label htmlFor="email">Your Email*</label>
                <input
                  type="email"
                  name="email"
                  value={data?.email}
                  disabled={isDisabled}
                  className={`outline-none border-2 border-solid border-gray-400 rounded p-2  ${
                    isDisabled ? "bg-gray-100 text-gray-400" : "bg-white"
                  }`}
                  placeholder="Your Email"
                  onChange={gettingDetails}
                />
                <span className="text-red-400">{error.email}</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="lname">Last Name*</label>
                <input
                  type="text"
                  value={data?.lname}
                  name="lname"
                  disabled={isDisabled}
                  className={`outline-none border-2 border-solid border-gray-400 rounded p-2 ${
                    isDisabled ? "bg-gray-100 text-gray-400" : "bg-white"
                  }`}
                  placeholder="Your Last Name"
                  onChange={gettingDetails}
                />
                <span className="text-red-400">{error.lname}</span>

                <h1 className="">Select Gender</h1>
                <div
                  className="flex buttons gap-5 items-center text-black"
                  role="group"
                  onChange={gettingDetails}
                >
                  <input
                    id="male"
                    label="Male"
                    disabled={isDisabled}
                    type="radio"
                    name="gender"
                    value="Male"
                    className={`${
                      isDisabled
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white text-black"
                    }`}
                    checked={data?.gender === "Male"}
                  />

                  <input
                    label="Female"
                    id="female"
                    type="radio"
                    disabled={isDisabled}
                    name="gender"
                    checked={data?.gender === "Female"}
                    className={`${
                      isDisabled
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white text-black"
                    }`}
                    value="Female"
                  />
                </div>
              </div>
              <button
                className="text-white rounded mt-5 p-3 bg-red-400"
                onClick={saveData}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
