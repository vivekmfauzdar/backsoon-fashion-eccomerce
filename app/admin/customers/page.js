"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { dbfs } from "../../firebase";
import { Button } from "@material-tailwind/react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { PulseLoader } from "react-spinners";

function page() {
  const [firebaseData, setFirebaseData] = useState([]);
  const [totalProducts, setTotalProducts] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [loaderEnable, setLoaderEnable] = useState(true);
  const [hasMoreData, setHasMoreData] = useState();

  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    FetchData();

    const f = async () => {
      const productsCollection = collection(dbfs, "Users");
      const querySnapshot = await getDocs(productsCollection);
      const totalProducts = querySnapshot.size;
      setTotalProducts(totalProducts);
    };
    f();
  }, []);

  const FetchData = async () => {
    try {
      let query = dbfs.collection("Users");

      if (lastVisible) {
        query = query.startAfter(lastVisible);
      }

      const snapshot = query.limit(5).onSnapshot((snapshot) => {
        const arr = [];
        if (!snapshot.empty) {
          snapshot.forEach((cur) => {
            arr.push(cur.data());
          });
          setLoaderEnable(false);
          setFirebaseData((prev) => [...prev, ...arr]);
          setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        } else {
          setHasMoreData(false);
        }
      });

      return snapshot;
    } catch (error) {}
  };

  const LoadMore = async () => {
    const un = await FetchData();
  };

  return (
    <div>
      <div>
        <div className="w-[100%] caret-transparent pt-5 ">
          <div className="lg:max-w-[970px] min-w-[400px] bg-bgback shadow p-5 mx-auto text-black select-none">
            {firebaseData.length !== 0 ? (
              <div>
                <div>
                  <h1 className="text-xl pb-5 font-bold">
                    <span className="text-gray-400 font-semibold">
                      {totalProducts} Users
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
                                  Name
                                </th>
                                <th scope="col" class="px-6 py-4">
                                  Email
                                </th>
                                <th scope="col" class="px-6 py-4">
                                  Gender
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {firebaseData.length !== 0
                                ? firebaseData.map((curOrders, index) => {
                                    return (
                                      <tr
                                        class="border-b dark:border-neutral-500"
                                        key={index}
                                      >
                                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                                          {index ? index + 1 : 1}
                                        </td>

                                        <td class="whitespace-nowrap px-6 py-5 flex items-center">
                                          {curOrders.fname +
                                            " " +
                                            curOrders.lname}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                          {curOrders.email}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                          {curOrders.gender}
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
                <div className="flex overflow-x-auto sm:justify-center pt-5">
                  <Button
                    size="sm"
                    className="rounded bg-black"
                    onClick={LoadMore}
                  >
                    Load More
                  </Button>
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
