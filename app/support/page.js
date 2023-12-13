"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import location from "../Images/location.png";
import { dbfs } from "../firebase";
import { getAuth } from "firebase/auth";
import { v4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Contact = () => {
  const [curUserUid, setUserUid] = useState("");

  const [message, setMessage] = useState("");
  const [selectReason, setSelectReason] = useState("");
  const [msgNum, setMsgNum] = useState("");
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [userData, setUserData] = useState({});
  const [send, setSend] = useState(false);

  //Getting the current user uid
  useEffect(() => {
    const auth = getAuth();

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);

        try {
          const docRef = dbfs.collection("Users").doc(user.uid);

          docRef.onSnapshot((snapshot) => {
            if (snapshot.exists) {
              const details = snapshot.data();
              setUserData(details);
            }
          });
        } catch (error) {}
      } else {
        setUserUid(null);
      }
    });
  }, []);

  useEffect(() => {
    try {
      const ref = dbfs.collection("SupportUser").doc(curUserUid);
      const r = ref.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const d = snapshot.data();
          setMsgNum(d.queryNum);
        }
      });
    } catch (error) {}
  }, [curUserUid]);

  const formSubmit = async (e) => {
    e.preventDefault();

    if (message === "" || selectReason === "") {
      toast.error("Both Fields are mandatory");
    } else {
      const obj = {
        name: `${userData.fname} ${userData.lname}`,
        email: userData.email,
        message: message,
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        day: weekday[new Date().getDay()],
        id: "",
        uid: curUserUid,
        status: "new",
        relatedTo: selectReason,
      };

      try {
        const docRef = dbfs
          .collection("SupportQuery")
          .doc(curUserUid)
          .collection("support");
        const newDocRef = await docRef.add(obj);
        const i = newDocRef.id;

        await newDocRef
          .update({
            id: i,
          })
          .then(() => {
            toast.success("dekho yr ka hoy ");
            setSend(true);
          });
      } catch (error) {
        console.error(error);
      }

      const supportUser = {
        name: `${userData.fname} ${userData.lname}`,
        day: weekday[new Date().getDay()],
        status: "new",
        message: message,
        queryNum: parseInt(msgNum + 1),
        UID: curUserUid,
      };

      try {
        const dRef = dbfs
          .collection("SupportUser")
          .doc(curUserUid)
          .set(supportUser)
          .then(() => {
            toast.success("done here also");
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="w-[100%] py-[40px] select-none">
        <Toaster toastOptions={{ duration: 2000 }} />
        <div className="max-w-[970px] min-w-[600px] mx-auto text-black">
          <h1 className="text-xl font-semibold pl-5">Backsoon Support</h1>
          <div className="flex justify-center items-center pt-10">
            <h1 className="font-semibold">
              For Any Query Please Send Query OR <br /> Just Mail Us at{" "}
              <span
                className="font-semibold hover:cursor-pointer hover:text-blue-400 hover:border-b"
                onClick={() => {
                  navigator.clipboard
                    .writeText("backsoonfashion@backsoon.in")
                    .then(() => {
                      toast.success("EMail Copied to clipboard");
                    });
                }}
              >
                backsoonfashion@backsoon.in
              </span>
            </h1>
          </div>

          <div className="">
            <form
              action=""
              onSubmit={formSubmit}
              className="flex flex-col gap-4 mx-auto p-5 lg:w-[700px]"
            >
              <label htmlFor="select">Select Query Reason</label>
              <select
                onChange={(e) => setSelectReason(e.target.value)}
                className="border-solid border-gray-600 border-2 rounded p-2 outline-none"
              >
                <option value="">Select here</option>
                <option value="Return Related">Return Related</option>
                <option value="Product Related">Product Related</option>
                <option value="Refund Related">Refund Related</option>
                <option value="Others">Other</option>
              </select>
              <label htmlFor="message" className="">
                Write Your Query
              </label>
              <textarea
                type="text"
                id="message"
                rows="8"
                cols="80"
                placeholder="Describe your issue in detail..."
                className="outline-none caret-black border-2 rounded border-solid border-gray-400 pl-4 pt-2"
                onChange={(e) => getMessage(e)}
              />
              <button className="bg-blue-500 p-2 rounded text-white">
                Send
              </button>
              {send && (
                <div className="flex items-center gap-2">
                  <IoIosCheckmarkCircle color="green" />
                  <h1>
                    We have received your query. You will receive an email from
                    us shortly.
                  </h1>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
