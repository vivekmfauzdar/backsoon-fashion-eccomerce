"use client";

import React, { useEffect, useState } from "react";
import { dbfs } from "@/app/firebase";
import Image from "next/image";
import { PulseLoader } from "react-spinners";

function page() {
  const [firebaseData, setFirebaseData] = useState([]);
  const [loaderEnable, setLoaderEnable] = useState(true);

  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      let query = dbfs.collectionGroup("products");

      const docRef = query.where("orderStatus", "==", "Completed");
      const snapshot = docRef.onSnapshot((snapshot) => {
        const arr = snapshot.docs.map((doc) => doc.data());
        if (arr.length > 0) {
          setFirebaseData(arr);
          setLoaderEnable(false);
        }
      });
      return snapshot;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div className="w-[100%] caret-transparent mb-[100px]">
          <div className="lg:max-w-[970px] min-w-[400px] p-5 mx-auto text-black select-none">
            {firebaseData.length !== 0 ? (
              <div>
                <div>
                  <h1 className="text-xl pb-5 font-bold">
                    Orders
                    <span className="text-gray-400 font-semibold">
                      ({firebaseData.length}) Completed
                    </span>
                  </h1>
                  <div class="flex flex-col overflow-x-auto">
                    <div class="sm:-mx-6 lg:-mx-8">
                      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-x-auto">
                          <table class="min-w-full text-left text-sm font-light">
                            <thead class="border-b text-gray-600 font-medium dark:border-neutral-500">
                              <tr>
                                <th scope="col" class="px-6 py-4">
                                  #
                                </th>
                                <th scope="col" class="px-6 py-4">
                                  Order ID
                                </th>
                                <th scope="col" class="px-6 py-4">
                                  Product
                                </th>
                                <th scope="col" class="px-6 py-4">
                                  Buyer
                                </th>
                                <th scope="col" class="px-6 py-4">
                                  Date
                                </th>
                                <th scope="col" class="px-6 py-4">
                                  Price
                                </th>
                                <th scope="col" class="px-6 py-4">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {firebaseData.length !== 0
                                ? firebaseData.map((curOrders, index) => {
                                    return (
                                      <tr
                                        key={index}
                                        class="border-b dark:border-neutral-500"
                                      >
                                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                                          1
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                          {curOrders.orderID}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-5 flex  items-center">
                                          <Image
                                            className="w-[40px]"
                                            src={curOrders.images}
                                            width={30}
                                            height={30}
                                            alt="product-image"
                                          />
                                          {curOrders.title}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                          {curOrders.userInfo.name}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                          {curOrders.date}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                          {curOrders.totalprice}/-
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4 ">
                                          <span className="text-green-600 font-semibold rounded-lg p-1 bg-green-50">
                                            Completed
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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
