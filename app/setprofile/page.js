"use client";
import React, { useState, useEffect } from "react";
import { dbfs } from "../firebase";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Setprofile() {
  const router = useRouter();
  const [curUserUid, setCurUserUid] = useState("");
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    phoneNum: "",
    uid: "",
  });
  const [error, setError] = useState({});

  // getting the current user
  useEffect(() => {
    const auth = getAuth();

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurUserUid(user);
      } else {
        setCurUserUid(null);
        router.push("/login");
      }
    });
  }, []);

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

  const saveData = (e) => {
    e.preventDefault();

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
      uid: curUserUid.uid,
      phoneNum: curUserUid.phoneNumber,
    };

    if (Object.values(error).every((value) => value === "")) {
      try {
        const docRef = dbfs
          .collection("Users")
          .doc(curUserUid.uid)
          .set(fullData)
          .then((docRef) => {
            toast.success("Data saved successfully!");
          })
          .then(() => {
            router.push("/");
          });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div className="w-[100%] bg-gray-100">
        <div className="max-w-[970px] min-w-[600px] mx-auto pb-10 p-10">
          <div className="lg:pt-10 pt-5">
            <h3 className="font-semibold lg:pt-10 pt-5 pl-5 pb-5 text-2xl lg:text-2xl">
              Setup Your Profile
            </h3>

            <div className=" bg-white rounded p-8 gap-2">
              <form
                className="grid grid-cols-1 max-w-[400px] mx-auto gap-3"
                onSubmit={saveData}
              >
                <label htmlFor="fname">First Name*</label>
                <input
                  type="text"
                  name="fname"
                  className="outline-none border-2 border-solid border-gray-400 w-[20rem] rounded p-2"
                  placeholder="Your First Name"
                  required
                  onChange={gettingDetails}
                />

                <label htmlFor="lname">Last Name*</label>
                <input
                  type="text"
                  name="lname"
                  className="outline-none border-2 border-solid border-gray-400 rounded p-2 w-[20rem]"
                  placeholder="Your Last Name"
                  onChange={gettingDetails}
                  required
                />

                <label htmlFor="email">Your Email*</label>
                <input
                  type="email"
                  name="email"
                  className="outline-none border-2 border-solid border-gray-400 rounded p-2 w-[20rem]"
                  placeholder="Your Email"
                  onChange={gettingDetails}
                  required
                />

                <h1 className="p-">Select Gender</h1>
                <div
                  className="grid grid-cols-2 buttons"
                  role="group"
                  onChange={gettingDetails}
                >
                  <input label="Male" type="radio" name="gender" value="Male" />
                  <input
                    label="Female"
                    type="radio"
                    name="gender"
                    value="Female"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white w-full  rounded mt-5 p-2 px-6 bg-red-400"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setprofile;
