"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { dbfs } from "./firebase";
import Link from "next/link";

function Topproducts() {
  const [firebaseData, setFirebaseData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const d = dbfs
          .collection("AllProducts")
          .limit(4)
          .onSnapshot((snapshot) => {
            const arr = [];
            snapshot.forEach((cur) => {
              arr.push(cur.data());
            });

            setFirebaseData(arr);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getOffPercent = (discountedprice, realprice) => {
    const dicountprice = realprice - discountedprice;
    const getoff = (dicountprice / realprice) * 100;
    return Math.floor(getoff);
  };

  const shortentitle = (title, limit) => {
    if (title.length > limit) {
      return title.slice(0, limit) + "...";
    }
    return title;
  };

  return (
    <div>
      <div className="mt-10">
        <h1 className=" font-semibold text-2xl my-5 pl-5">
          Top
          <span className="font-semibold text-2xl text-pink-400">Selling</span>
        </h1>
        <div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 pt-5 pb-5 lg:gap-3 gap-5 p-10">
            {firebaseData.map((curElm, index) => {
              return (
                <Link
                  key={index}
                  href={{
                    pathname: `/product/${curElm.id}`,
                    query: { category: curElm.colletionN },
                  }}
                >
                  <div className="shadow-lg cursor-pointer pb-3 rounded-lg">
                    <div className="relative">
                      <div className="absolute object-contain flex justify-center bottom-0 h-70 md:h-70 z-10 opacity-100 transition-opacity duration-700 hover:opacity-0 w-full bg-white overflow-hidden dark:bg-gray-800">
                        <Image
                          className="h-96 md:h-[16rem] w-full"
                          src={curElm.images[0]}
                          width={200}
                          height={250}
                          alt="product-imges"
                        />
                      </div>

                      <div className="flex justify-center opacity-100 object-contain h-70 md:h-70 bottom-0 transition-opacity duration-700 hover:opacity-100 overflow-hidden w-full ">
                        <Image
                          className="h-96 md:h-[16rem] w-full"
                          src={curElm.images[1]}
                          alt="product"
                          width={200}
                          height={250}
                        />
                      </div>
                    </div>

                    <h1 className="font-semibold pl-2 text-xl">
                      {curElm.brand}
                    </h1>
                    <h2 className="text-xl pl-2">
                      {shortentitle(curElm.title, 20)}
                    </h2>
                    <div className="flex gap-2 pl-2 text-xl">
                      <h3 className="font-semibold">
                        ₹{curElm.discountedprice}
                      </h3>
                      <h3 className="line-through	text-xl">
                        ₹{curElm.realprice}
                      </h3>
                      <h3 className="text-green-400	text-xl">
                        {getOffPercent(
                          curElm.discountedprice,
                          curElm.realprice
                        )}
                        % OFF
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topproducts;
