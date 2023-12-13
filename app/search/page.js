"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import searchimg from "../Images/sad.png";
import { dbfs } from "../firebase";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PulseLoader } from "react-spinners";

function Search() {
  const search = useSearchParams();
  const i = search.get("query");
  const [firebaseData, setFirebaseData] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loaderEnable, setLoaderEnable] = useState(true);
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    setLoaderEnable(true);
    setNoResult(false);
    setFirebaseData([]);
    const searchFirestore = async () => {
      try {
        if (i.trim !== "") {
          let queryByCategory = dbfs
            .collection("AllProducts")
            .where("category", "array-contains", i.trim().toLocaleLowerCase());
          let queryByBrandCategory = dbfs
            .collection("AllProducts")
            .where(
              "categoryBrand",
              "array-contains",
              i.trim().toLocaleLowerCase()
            );
          let queryBySearchQuery = dbfs
            .collection("AllProducts")
            .where(
              "searchQuery",
              "array-contains",
              i.trim().toLocaleLowerCase()
            );
          let queryByBrand = dbfs
            .collection("AllProducts")
            .where("brand", "==", i.trim().toLocaleLowerCase());

          const snapshotCategory = await queryByCategory.limit(5).get();
          const snapshotBrandCategory = await queryByBrandCategory
            .limit(5)
            .get();
          const snapshotSearchQuery = await queryBySearchQuery.limit(5).get();
          const snapshotBrand = await queryByBrand.limit(5).get();

          const newDataCategory = snapshotCategory.docs.map((doc) =>
            doc.data()
          );
          const newDataBrandCategory = snapshotBrandCategory.docs.map((doc) =>
            doc.data()
          );
          const newDataSearchQuery = snapshotSearchQuery.docs.map((doc) =>
            doc.data()
          );
          const newDataBrand = snapshotBrand.docs.map((doc) => doc.data());

          // Merge the results from both queries
          const mergedData = [
            ...newDataCategory,
            ...newDataBrandCategory,
            ...newDataSearchQuery,
            ...newDataBrand,
          ];

          setFirebaseData(mergedData);
          setLoaderEnable(false);
          setNoResult(false);

          if (mergedData.length === 0) {
            setNoResult(true);
            setLoaderEnable(false);
          }
        } else {
          toast.success("search field empty!!");
        }
      } catch (error) {
        console.error("Error searching Firestore:", error);
      }
    };
    searchFirestore();
  }, [i]);

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
      <div className="w-[100%] pt-[80px] caret-transparent mb-[100px]">
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

        <div className="mx-auto text-black">
          {loaderEnable === false && (
            <div className="pb-10">
              <h1 className="text-xl text-center font-bold">
                Search Results For{" "}
                <span className="text-pink-400">"{i.toUpperCase()}"</span> Here
              </h1>
            </div>
          )}

          <div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 pt-5 pb-5 p-5 gap-5">
              {firebaseData.map((curElm) => {
                return (
                  <Link
                    key={curElm.id}
                    href={{
                      pathname: `/product/${curElm.id}`,
                      query: { category: curElm.colletionN },
                    }}
                  >
                    <div className="shadow cursor-pointer">
                      <Image
                        src={curElm.images[0]}
                        className="lg:w-[270px] lg:h-[20rem] w-[270px] h-[20rem]"
                        width={200}
                        height={200}
                        alt="product-image"
                      />
                      <h1 className="font-semibold text-[1rem] pl-2">
                        {curElm.brand}
                      </h1>
                      <h2 className="pl-2">{shortentitle(curElm.title, 20)}</h2>
                      <div className="flex items-center gap-2 pl-2">
                        <span className="flex text-[1rem] font-semibold">
                          ₹{curElm.discountedprice}
                        </span>

                        <span className="line-through text-[1rem]">
                          ₹{curElm.realprice}
                        </span>
                        <span className="text-green-600 font-semibold text-[12px]">
                          (
                          {getOffPercent(
                            curElm.discountedprice,
                            curElm.realprice
                          )}
                          )% OFF
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 pb-5 gap-6 text-center"></div>
            {noResult && (
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src={searchimg}
                  className="w-[150px]"
                  width={150}
                  height={100}
                  alt="no-result"
                />
                <h1 className="font-semibold text-xl">No Result Found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
