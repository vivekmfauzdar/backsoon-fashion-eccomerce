"use client";

import React, { useEffect, useState } from "react";
import wishlist from "../Images/shopping-cart.png";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { dbfs } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [firebaseData, setFirebaseData] = useState([]);
  const [curUserUid, setCurUserUid] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurUserUid(user.uid);
        const docRef = dbfs.collection("MyWishlist").doc(user.uid);
        docRef.collection("MyWishData").onSnapshot((snapshot) => {
          const arr = [];
          snapshot.forEach((cur) => {
            arr.push(cur.data());
          });
          setFirebaseData(arr);
        });
      } else {
        setCurUserUid(null);
        router.push("/login");
      }
    });
  }, []);

  const deleteData = (index) => {
    const docRef = dbfs.collection("MyWishlist").doc(curUserUid);
    docRef
      .collection("MyWishData")
      .doc(index)
      .delete()
      .then(() => {
        toast.success("Wishlist Item Removed.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="max-w-[970px] min-w-[600px] mx-auto py-10 p-5">
        <h1 className="font-semibold text-xl">
          Wishlist {firebaseData.length} items
        </h1>

        <div className="max-w-[770px] mx-auto py-10">
          {firebaseData && firebaseData?.length !== 0 ? (
            firebaseData?.map((curData) => {
              return (
                <div
                  className="grid grid-cols-1 p-5 cursor-pointer select-none"
                  key={curData.id}
                >
                  <div className="col-span-1">
                    <div className="flex justify-between p-5 gap-2 border-2 border-solid rounded">
                      <Link
                        className="flex gap-4"
                        href={{
                          pathname: `/product/${curData.id}`,
                          query: { category: curData.category },
                        }}
                      >
                        <div>
                          <Image
                            className="w-[5rem]"
                            objectFit="center"
                            objectPosition="contain"
                            src={curData?.images[0]}
                            width={200}
                            height={200}
                            alt="product-image"
                          />
                        </div>
                        <div className="">
                          <h1 className="font-semibold">{curData?.brand}</h1>
                          <h1 className="hover:text-blue-400">
                            {curData?.title}
                          </h1>
                          <h1 className="font-semibold">
                            ₹ {curData?.discountedprice}
                          </h1>
                          <span className="text-[12px]">
                            14 days return availabe
                          </span>
                        </div>
                      </Link>
                      <div>
                        <RxCross2
                          className="cursor-pointer"
                          size={25}
                          onClick={() => deleteData(curData.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-10">
              <div className="flex flex-col items-center gap-2 justify-center">
                <Image
                  className="w-[4rem]"
                  src={wishlist}
                  width={200}
                  height={200}
                  alt="image"
                />
                <h1 className="font-semibold text-md">
                  Your Wishlist is Empty.
                </h1>
                <p className="text-sm">
                  Add Items By Clicking on the Wishlist Button From Product Page
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
