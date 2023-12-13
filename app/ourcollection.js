"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { dbfs } from "./firebase";
import Link from "next/link";

function Ourcollection() {
  const [firebaseData, setFirebaseData] = useState([]);
  const [btnValue, setBtnvalue] = useState("shoes");
  const [active, setActive] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      try {
        const d = dbfs
          .collection("AllProducts")
          .where("category", "array-contains", btnValue)
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
  }, [btnValue]);

  const getOffPercent = (discountedprice, realprice) => {
    const dicountprice = realprice - discountedprice;
    const getoff = (dicountprice / realprice) * 100;
    return Math.floor(getoff);
  };

  const handleBtn = (btn, num) => {
    setBtnvalue(btn);
    setActive(num);
  };

  const shortentitle = (title, limit) => {
    if (title.length > limit) {
      return title.slice(0, limit) + "...";
    }
    return title;
  };

  return (
    <div>
      <div className="mx-auto text-black">
        <div>
          <h1 className="font-semibold text-2xl pl-5">
            Our
            <span className="font-semibold text-2xl text-pink-400">
              Collection
            </span>
          </h1>
          <div className="flex gap-10 justify-center mt-5">
            <button
              className={`font-semibold text-xl rounded p-1 text-${
                active === 1 ? "orange-900 overline	" : "black"
              }`}
              onClick={(e) => handleBtn("shoes", 1)}
            >
              Shoes
            </button>
            <button
              className={`font-semibold text-xl rounded p-1 text-${
                active === 2 ? "orange-900 overline" : "black"
              }`}
              onClick={(e) => handleBtn("tshirts", 2)}
            >
              Tshirts
            </button>
            <button
              className={`font-semibold text-xl rounded p-1 text-${
                active === 3 ? "orange-900 overline" : "black"
              }`}
              onClick={(e) => handleBtn("hoodies", 3)}
            >
              Hoodies
            </button>
            <button
              className={`font-semibold text-xl rounded p-1 text-${
                active === 4 ? "orange-900 overline" : "black"
              }`}
              onClick={(e) => handleBtn("jackets", 4)}
            >
              Jacket
            </button>
            <button
              className={`font-semibold text-xl rounded p-1 text-${
                active === 5 ? "orange-900 overline" : "black"
              }`}
              onClick={(e) => handleBtn("sweaters", 5)}
            >
              Sweater
            </button>
          </div>
        </div>
        <div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 pt-5 pb-5 lg:gap-2 gap-5 p-10">
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
                          className="h-96 w-full md:h-[16rem]"
                          src={curElm.images[0]}
                          width={200}
                          height={250}
                          alt="product"
                        />
                      </div>

                      <div className="flex justify-center opacity-100 object-contain h-70 md:h-70 bottom-0 transition-opacity duration-700 hover:opacity-100 overflow-hidden w-full ">
                        <Image
                          className="h-96 w-full md:h-[16rem]"
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
                    <div className="flex gap-2 pl-2">
                      <h3 className="font-semibold text-xl">
                        ₹{curElm.discountedprice}
                      </h3>
                      <h3 className="line-through text-xl">
                        ₹{curElm.realprice}
                      </h3>
                      <h3 className="text-green-400	">
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

export default Ourcollection;
