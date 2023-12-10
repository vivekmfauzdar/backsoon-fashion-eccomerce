"use client";

import React, { useEffect, useState } from "react";
import { dbfs } from "@/app/firebase";
import { getAuth } from "firebase/auth";
import { BsThreeDotsVertical } from "react-icons/bs";
import Addressboxmanage from "@/app/addressboxmanage";
import Newaddaccount from "@/app/newaddaccount";
import { useRouter } from "next/navigation";

function Address() {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatephone: "",
    addresstype: "",
  });
  const [curUserUid, setCurUserUid] = useState("");
  const [firebaseData, setFirebaseData] = useState([]);
  const [formErr, setFormErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState("");
  const [newAddBtn, setNewAddBtn] = useState(false);

  const gettingNewAddData = (childData) => {
    setNewAddBtn(childData);
  };

  const gettingChildData = (childData) => {
    setOpen(childData.open);
    setIndex(childData.ival);
  };

  //gettting current user
  useEffect(() => {
    const auth = getAuth();
    const curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurUserUid(user.uid);
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
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (curUserUid) {
      const FetchData = () => {
        const colRef = dbfs.collection("Orders").doc(curUserUid);
        colRef.collection("addresses").onSnapshot((snapshot) => {
          const arr = [];
          snapshot.forEach((curData) => {
            arr.push({
              curAdd: curData.data(),
            });
          });
          setFirebaseData(arr);
        });
      };
      FetchData();
    }
  }, [curUserUid]);

  const editBtn = (index) => {
    setOpen(true);
    setIndex(index);
  };

  const deleteBtn = (id) => {
    const docRef = dbfs.collection("Orders").doc(curUserUid);
    docRef
      .collection("addresses")
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Address Removed");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const newAddress = () => {
    setNewAddBtn(true);
  };

  return (
    <div className="max-w-[700px] min-w-[600px] mx-auto pb-10 p-5">
      <h2 className="text-2xl font-semibold pt-10 lg:p-0 pl-8">
        Manage Address
      </h2>

      <div className="p-10 lg:p-0">
        <h1 className="text-[1rem]">Saved Addresses</h1>
        <div className=" border-[1px] border-gray-300 border-solid rounded mt-3">
          {newAddBtn ? (
            <Newaddaccount
              curUserId={curUserUid}
              cancelBtn={gettingNewAddData}
            />
          ) : (
            <h1
              className="text-pink-400 font-semibold p-4 cursor-pointer"
              onClick={newAddress}
            >
              + Add New Address
            </h1>
          )}
        </div>
        {firebaseData.length !== 0
          ? firebaseData.map(({ curAdd }, i) => {
              return (
                <div key={i} className="shadow-lg p-5 rounded-lg">
                  <div
                    className={`${
                      index === i && open ? "hidden" : "flex justify-between"
                    }`}
                  >
                    <div className="">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h1 className="font-semibold lg:text-[1rem] text-lg">
                            {curAdd.name}
                          </h1>
                          <span className="border-[1px] p-1 rounded border-green-500 text-green-500 text-[10px]">
                            {curAdd.addresstype}
                          </span>
                        </div>

                        <div className="flex gap-4">
                          <h2
                            className="text-blue-400 cursor-pointer font-semibold text-[14px]"
                            onClick={() => editBtn(i)}
                          >
                            Edit
                          </h2>
                          <h2
                            className="text-red-400 cursor-pointer font-semibold text-[14px]"
                            onClick={() => deleteBtn(curAdd.id)}
                          >
                            Delete
                          </h2>
                        </div>
                      </div>
                      <p className="text-[14px] mt-3">{`${curAdd.address}, ${curAdd.city}, ${curAdd.locality}, ${curAdd.landmark}, ${curAdd.state}, ${curAdd.pincode}`}</p>
                      <p className="mt-2 font-semibold text-[14px]">
                        Mobile : {curAdd.phoneno}
                      </p>
                    </div>
                  </div>

                  {index === i && open ? (
                    <Addressboxmanage
                      curUser={curUserUid}
                      index={i}
                      sendingInputData={curAdd}
                      sendingChildData={gettingChildData}
                    />
                  ) : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Address;
