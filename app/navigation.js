"use client";

import backsoonlogo from "./Images/backsoon_logo1.png";
import Image from "next/image";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { dbfs } from "./firebase";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navigationmenu from "./navigationmenu";
import { useSelector } from "react-redux";

const Dropdown = dynamic(() => import("./dropdown"));

function Navigation() {
  const cartDataNum = useSelector((cur) => cur.cartData);
  const [searchInput, setSearchInput] = useState("");
  const [cartData, setCartData] = useState([]);
  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");

  // getting the current user
  useEffect(() => {
    const auth = getAuth();

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("cartData");
    if (data) {
      setCartData(JSON.parse(data));
    }
  }, []);

  // getting the name of listing owner
  useEffect(() => {
    const GetData = async () => {
      try {
        const useruid = userUid;
        if (userUid) {
          const docRef = dbfs.collection("Users").doc(useruid);

          docRef.onSnapshot((snapshot) => {
            if (snapshot.exists) {
              const name = snapshot.data();
              setUserName(name.fname);
            }
          });
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    GetData();
  }, [userUid]);

  return (
    <main className="w-[100%] mx-auto select-none">
      <div className="lg:flex hidden lg:max-w-full justify-around items-center p-3 shadow-lg">
        <div className="grid grid-cols-1 justify-items-center items-center">
          <Link href="/">
            <Image
              className="w-[160px] cursor-pointer"
              src={backsoonlogo}
              width={400}
              height={400}
              alt="website-logo"
              priority={true}
            />
          </Link>
        </div>

        <div className="flex relative items-center gap-1">
          <div className="absolute bottom-2 left-2">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            className="border-[1px] caret-blue-gray-400 rounded outline-none py-1 pl-8 w-[350px] border-gray-300"
            placeholder="Search clothes here..."
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <Link href={{ pathname: "/search", query: { query: searchInput } }}>
            <h2 className="cursor-pointer caret-transparent">Search</h2>
          </Link>
        </div>

        <div className="flex gap-5">
          {userUid != null && (
            <div className="flex gap-2 items-center cursor-pointer">
              <AiOutlineHeart size={25} />
              <Link href="/wishlist">
                <button>Wishlist</button>
              </Link>
            </div>
          )}

          <div className="flex gap-2 items-center cursor-pointer">
            <Link
              href="/checkout/cart"
              className="flex gap-2 items-center relative"
            >
              <span className="bg-red-400 rounded-full w-[16px] h-[16px] text-[10px] p-[2px] text-white text-center font-semibold absolute  top-[-7px]">
                {cartDataNum.length}
              </span>
              <FiShoppingBag size={22} />
              <button className="">Bag</button>
            </Link>
          </div>

          {userUid != null ? (
            <Dropdown name={userName} />
          ) : (
            <div className="flex gap-2 items-center cursor-pointer">
              <AiOutlineUser />
              <Link href="/login">
                <button className="">Sign in</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="z-20 lg:hidden max-w-full">
        <Navigationmenu />
      </div>
    </main>
  );
}

export default Navigation;
