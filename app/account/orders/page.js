"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import jeans from "../../Images/meninhoodie.jpg";
import box from "../../Images/package.png";
import { GoDotFill } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { getAuth } from "firebase/auth";
import { dbfs } from "@/app/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PulseLoader } from "react-spinners";

function Orders() {
  const router = useRouter();
  const [curUserUid, setCurUserUid] = useState("");
  const [firebaseData, setFirebaseData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loaderEnable, setLoaderEnable] = useState(true);
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // Getting the Current User Uid
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

  useEffect(() => {
    if (curUserUid) {
      const FetchData = () => {
        const colRef = dbfs.collection("Orders").doc(curUserUid);
        colRef.collection("products").onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            const arr = [];
            snapshot.forEach((curData) => {
              arr.push({
                curOrders: curData.data(),
              });
            });
            setLoaderEnable(false);
            setFirebaseData(arr);
          } else {
            setNoData(true);
            setLoaderEnable(false);
          }
        });
      };
      FetchData();
    }
  }, [curUserUid]);

  return (
    <div className="max-w-[700px] min-w-[600px] mx-auto p-5">
      {/* CODE TO  RUN THE LOADER TILL THE DATA LOAD */}
      {loaderEnable && (
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
      {loaderEnable === false && (
        <h1 className="text-2xl font-semibold pb-5 pl-8 lg:pl-0 pt-10 lg:pt-0">
          My Orders
        </h1>
      )}

      {firebaseData.length !== 0 &&
        firebaseData.map(({ curOrders }, index) => {
          return (
            <div
              key={curOrders.id}
              className="flex gap-5 shadow justify-between rounded p-5"
            >
              <div className="flex gap-2">
                <div>
                  <Image
                    className="w-[80px] h-[80px] bg-cover"
                    src={curOrders.images}
                    width={200}
                    height={200}
                    alt="product-image"
                  />
                </div>

                <div>
                  <h1 className="lg:text-[1rem] text-lg">{curOrders.title}</h1>
                  <h2 className="text-[12px] font-semibold">
                    ₹ {curOrders.rightprice}
                  </h2>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <GoDotFill className="text-green-500" />
                  <h2 className="font-semibold text-sm">Delivered on Oct 20</h2>
                </div>

                <h1 className="text-[12px]">Your item has been delivered</h1>

                <div className="flex items-center mt-3 gap-2">
                  <Link href={`/review/reviewyourpurchases/${curOrders.id}`}>
                    <AiFillStar color="#5B8CCD" />
                    <span className="text-[12px] font-semibold text-blue-800 cursor-pointer">
                      Rate your products
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

      {noData && (
        <div className="mt-20 text-center mb-5">
          <Image
            className="w-[150px] mx-auto"
            src={box}
            width={200}
            height={200}
            alt="image"
          />
          <h1 className="pt-3">You didn't order anything yet.</h1>
        </div>
      )}
    </div>
  );
}

export default Orders;
