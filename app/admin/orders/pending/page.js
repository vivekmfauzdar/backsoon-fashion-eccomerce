"use client";

import React, { useEffect, useState } from "react";
import { dbfs } from "@/app/firebase";
import Image from "next/image";
import { doc, updateDoc } from "firebase/firestore";
import nopending from "../../../Images/nopending.png";
import { PulseLoader } from "react-spinners";

function page() {
  const [firebaseData, setFirebaseData] = useState([]);
  const [loaderEnable, setLoaderEnable] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMoreData, setHasMoreData] = useState();

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
      const docRef = query.where("orderStatus", "==", "Pending");
      const snapshot = docRef.onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const arr = snapshot.docs.map((doc) => doc.data());
          if (arr.length > 0) {
            setFirebaseData(arr);
            setLoaderEnable(false);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
          }
        } else {
          setHasMoreData(false);
        }
      });
      return snapshot;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategory = async (e, index, UID) => {
    const value = e.target.value;
    const docRef = dbfs
      .collection("Orders")
      .doc(UID)
      .collection("products")
      .doc(index);

    try {
      await updateDoc(docRef, {
        orderStatus: value,
      });
      toast.success("Field Updated Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const LoadMore = async () => {
    const un = await FetchData();
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
                      ({firebaseData.length}) Pending
                    </span>
                  </h1>
                  {firebaseData.length > 0 && (
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
                                            {index ? index + 1 : 1}
                                          </td>
                                          <td class="whitespace-nowrap px-6 py-4">
                                            {curOrders.orderID}
                                          </td>
                                          <td class="whitespace-nowrap px-6 py-5 flex items-center">
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
                                            <td class="whitespace-nowrap px-6 py-4">
                                              {" "}
                                              <select
                                                value={curOrders.orderStatus}
                                                onChange={(e) =>
                                                  handleCategory(
                                                    e,
                                                    curOrders.id,
                                                    curOrders.UID
                                                  )
                                                }
                                                className="border-solid border-gray-500 border-[1px] outline-none rounded p-2"
                                              >
                                                <option>Order Status:</option>
                                                <option value="Pending">
                                                  Pending
                                                </option>
                                                <option value="Processing">
                                                  Processing
                                                </option>
                                                <option value="Shipping">
                                                  Shipping
                                                </option>
                                                <option value="Delivering">
                                                  Delivering
                                                </option>
                                                <option value="Completed">
                                                  Completed
                                                </option>
                                                <option value="Cancel">
                                                  Cancel
                                                </option>
                                              </select>
                                            </td>{" "}
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
                  )}

                  {firebaseData.length === 0 && (
                    <div className="text-center grid grid-cols-1 justify-items-center">
                      <Image
                        className="w-[120px]"
                        src={nopending}
                        width={300}
                        height={200}
                        alt="image"
                      />
                      <h1 className="font-semibold text-gray-900 text-xl">
                        No Orders Pending
                      </h1>
                    </div>
                  )}
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
