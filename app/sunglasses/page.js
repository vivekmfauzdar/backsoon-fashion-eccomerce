"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { dbfs } from "../firebase";
import Link from "next/link";
import { IoOptionsOutline } from "react-icons/io5";
import { PulseLoader } from "react-spinners";

function Sunglasses() {
  const [firebaseData, setFirebaseData] = useState([]);
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [open, setOpen] = useState(false);
  const [loaderEnable, setLoaderEnable] = useState(true);
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const brands = [
    {
      brand: "ray-ban",
    },
    {
      brand: "fastrack",
    },
    {
      brand: "vincent chase",
    },
    {
      brand: "lenskart",
    },
  ];

  //fetch the hoodies collection
  useEffect(() => {
    try {
      const data = [];
      dbfs.collectionGroup("Sunglasses").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          data.push(doc.data());
          setLoaderEnable(false);
        });

        setFirebaseData(data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (price !== "") {
      try {
        const d = dbfs
          .collectionGroup("Sunglasses")
          .orderBy("discountedprice", price === "lowtohigh" ? "asc" : "desc")
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
    }
  }, [price]);

  useEffect(() => {
    const d = dbfs
      .collectionGroup("Sunglasses")
      .where("brand", "==", brand)
      .onSnapshot((snapshot) => {
        const arr = [];

        snapshot.forEach((cur) => {
          arr.push(cur.data());
        });
        setFirebaseData(arr);
      });
  }, [brand]);

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
    <div className="max-w-[970px] min-w-[600px] mx-auto">
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
        <div className="flex items-center justify-between pt-10">
          <h1 className="text-3xl lg:text-2xl font-semibold pl-5 lg:pl-0">
            Sunglasses
          </h1>

          <span
            className="lg:hidden flex items-center pr-5"
            onClick={() => setOpen(!open)}
          >
            <IoOptionsOutline className="pr-5" size={60} />
            <span className="text-[24px] font-semibold">Filters</span>
          </span>
        </div>
      )}

      <div className="grid lg:grid-cols-4 grid-cols-1">
        {loaderEnable === false && (
          <div className="lg:block hidden pt-3">
            <h1 className="text-2xl">Filters</h1>

            <div className="mt-5">
              <h1 className="text-xl pb-4">Price</h1>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  className="w-4 h-4"
                  name="price"
                  id="low"
                  value="lowtohigh"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="low" className="font-normal">
                  Low to High
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  className="w-4 h-4"
                  name="price"
                  id="high"
                  value="hightolow"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="high" className="font-normal">
                  High to Low
                </label>
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-xl pb-4">Brand</h1>
              {brands.map((cur, index) => {
                return (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      className="w-4 h-4"
                      type="radio"
                      name="price"
                      id="high"
                      value={cur.brand}
                      onChange={(e) => {
                        setBrand(e.target.value);
                      }}
                    />
                    <label htmlFor="high" className="">
                      {cur.brand}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div
          className={`lg:hidden pt-3 ${
            open ? "flex gap-5 justify-center" : "hidden"
          }`}
        >
          <div className="mt-5">
            <h1 className="text-xl pb-4">Price</h1>
            <div className="flex gap-2 items-center py-2">
              <input
                type="radio"
                className="w-6 h-6"
                name="price"
                id="low"
                value="lowtohigh"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="low" className="font-normal">
                Low to High
              </label>
            </div>

            <div className="flex gap-2 items-center py-2">
              <input
                type="radio"
                className="w-6 h-6"
                name="price"
                id="high"
                value="hightolow"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="high" className="font-normal">
                High to Low
              </label>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-xl pb-4">Brand</h1>
            {brands.map((cur, index) => {
              return (
                <div key={index} className="flex gap-2 items-center py-2">
                  <input
                    className="w-6 h-6"
                    type="radio"
                    name="price"
                    id="high"
                    value={cur.brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                  />
                  <label htmlFor="high" className="">
                    {cur.brand}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 lg:col-span-3 grid-cols-2 justify-items-center lg:justify-items-stretch pt-5 pb-5 gap-2">
          {firebaseData.map((curElm) => {
            return (
              <Link
                key={curElm.id}
                href={{
                  pathname: `/product/${curElm.id}`,
                  query: { category: curElm.colletionN },
                }}
              >
                <div className="shadow-lg rounded-lg cursor-pointer pb-5">
                  <Image
                    src={curElm.images[0]}
                    className="lg:w-full lg:h-[16rem] w-[270px] h-[20rem] p-[5rem]"
                    width={600}
                    height={600}
                    alt="product-image"
                  />
                  <h1 className="font-semibold pl-2 text-xl lg:text-base">
                    {curElm.brand}
                  </h1>
                  <h2 className="pl-2 text-xl lg:text-base">
                    {shortentitle(curElm.title, 20)}
                  </h2>
                  <div className="flex gap-2 pl-2">
                    <h3 className="font-semibold text-xl lg:text-base">
                      ₹{curElm.discountedprice}
                    </h3>
                    <h3 className="line-through text-xl lg:text-base">
                      ₹{curElm.realprice}
                    </h3>
                    <h3 className="text-green-400 text-xl lg:text-base">
                      ({getOffPercent(curElm.discountedprice, curElm.realprice)}
                      % OFF)
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sunglasses;
