"use client";

import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import useric from "../../Images/userblue.png";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { dbfs } from "@/app/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { Button } from "@material-tailwind/react";
import { PulseLoader } from "react-spinners";

function page() {
  const [open, setOpen] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [firebaseData, setFirebaseData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [index, setIndex] = useState("");
  const [loaderEnable, setLoaderEnable] = useState(true);

  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const openFull = async (id, index, UID) => {
    setOpen(!open);
    setIndex(index);

    try {
      const ref = dbfs.collection("SupportUser").doc(UID);
      await ref.update({
        queryNum: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const snapshot = dbfs
          .collection("SupportUser")
          .onSnapshot((snapshot) => {
            const arr = [];
            snapshot.forEach((doc) => {
              if (doc.exists) {
                arr.push(doc.data());
              }
            });
            setUserDetails(arr);
          });

        return () => {
          snapshot();
        };
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userDetails]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let query = dbfs.collectionGroup("support");
      const unsubscribe = query.onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        setFirebaseData(arr);
        setLoaderEnable(false);
      });

      return () => {
        // Unsubscribe the listener when the component unmounts
        unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
  };

  const LoadMore = () => {
    fetchData();
  };

  return (
    <div className="w-[100%] caret-transparent pt-5 shadow bg-bgback">
      <div className="lg:max-w-[970px] min-w-[400px] p-5 mx-auto text-black select-none">
        <Toaster toastOptions={{ duration: 2000 }} />
        <div>
          <div>
            {userDetails.length !== 0 ? (
              <div>
                <h1 className="text-xl text-gray-600 font-semibold mb-5 ml-2 pl-5 mt-5">
                  Queries
                </h1>

                <div>
                  {userDetails.length != 0 &&
                    userDetails.map((curData, it) => {
                      return (
                        <div key={it} className="py-3">
                          <div
                            className="md:max-w-[900px] max-w-[600px] shadow-md ml-2 p-5 cursor-pointer select-none rounded-lg"
                            onClick={() =>
                              openFull(curData.id, it, curData.UID)
                            }
                            key={it}
                          >
                            <div>
                              <div className="flex items-center pb-2 gap-2">
                                <h2 className="text-lg font-semibold">
                                  {curData.name}
                                </h2>
                                {curData.queryNum > 0 && (
                                  <div className="flex items-center">
                                    <span className="text-red-500 text-md">
                                      {curData.queryNum} New Queries
                                    </span>
                                    <GoDotFill color="red" />
                                  </div>
                                )}
                                <p>{curData.day}</p>
                              </div>

                              <p
                                className={`${
                                  index === it && open ? "hidden" : "flex"
                                }`}
                              >
                                {curData.message}
                              </p>
                            </div>
                            {firebaseData.length !== 0 &&
                              firebaseData.map((curMsg, i) => {
                                return (
                                  <div
                                    key={i}
                                    className={`${
                                      open &&
                                      curMsg.uid === curData.UID &&
                                      index === it
                                        ? "flex flex-col"
                                        : "hidden"
                                    }`}
                                  >
                                    <h1 className="text-green-500 pt-2 font-semibold">
                                      Received on {curMsg.time}, {curMsg.date}
                                    </h1>
                                    <h1 className="pb-2">{curMsg.message}</h1>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  <div className="flex justify-center pt-5">
                    <Button className="rounded" onClick={LoadMore}>
                      Load More
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-[90vh]">
                <PulseLoader
                  color="#FF3F6C"
                  loading={loaderEnable}
                  cssOverride={CSSProperties}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <h1 className="text-pink-400 font-semibold text-xl">
                  Getting Data...
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
