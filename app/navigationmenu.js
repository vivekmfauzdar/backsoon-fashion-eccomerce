"use client";

import React from "react";
import logo from "./Images/backsoon_logo1.png";
import {dbfs} from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useState, useEffect } from "react";
import closeoutine from "./Images/close-outline.svg";
import menuoutine from "./Images/menu-outline.svg";
import { FiShoppingBag } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import sneaker from "./Pictures/sneakers.png";
import jacket from "./Pictures/jacket.png";
import sweater from "./Pictures/sweater.png";
import shirt from "./Pictures/shirt.png";
import jeans from "./Pictures/jeans.png";
import watch from "./Pictures/smart-watch.png";
import hoodie from "./Pictures/ihoodie2.png";
import tshirt from "./Pictures/tshirt.png";
import sunglass from "./Pictures/sunglass.png";

function navigationmenu() {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");

  const Links = [
    { name: "My Profile", link: "/account" },
    { name: "My Orders", link: "/account/orders" },
    { name: "Saved Addresses", link: "/account/address" },
    { name: "Wishlist", link: "/wishlist" },
    { name: "My Reviews", link: "/account/reviews" },
  ];

  const CatLinks = [
    { name: "Hoodies", img: hoodie, link: "/hoodies" },
    { name: "Tshirts", img: tshirt, link: "/tshirts" },
    { name: "Jackets", img: jacket, link: "/jacket" },
    { name: "Shoes", img: sneaker, link: "/shoes" },
    { name: "Shirts", img: shirt, link: "/shirts" },
    { name: "Sweaters", img: sweater, link: "/sweaters" },
    { name: "Jeans", img: jeans, link: "/jeans" },
    { name: "Sunglasses", img: sunglass, link: "/sunglasses" },
    { name: "Watches", img: watch, link: "/watches" },
  ];
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

  //getting the cart data length
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

  function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      toast.success("Logout Successfully");
    });
  }

  return (
    <div>
      <div className="w-[100%] caret-transparent">
        <Toaster toastOptions={{ duration: 2000 }} />

        <div className="min-w-[600px] max-w-[950px] shadow-lg p-3">
          <div className={`flex justify-between items-center gap-4`}>
            <Link href="/">
              <Image
                className="w-[220px] cursor-pointer"
                src={logo}
                width={400}
                height={400}
                alt="website logo" priority={true}
              />
            </Link>

            <div className="flex items-center gap-4">
              <div onClick={() => setSearchOpen(!searchOpen)}>
                <IoSearch size={40} />
              </div>

              <div className="cursor-pointer">
                <Link
                  href="/checkout/cart"
                  className="flex gap-2 items-center relative"
                >
                  <span className="bg-red-400 rounded-full w-[16px] h-[16px] text-[10px] p-[2px] text-white text-center font-semibold absolute top-[-7px]">
                    {cartData.length}
                  </span>
                  <FiShoppingBag size={42} />
                </Link>
              </div>

              {/* MENU OPEN/CLOSE */}
              <div onClick={() => setOpen(!open)} className="lg:hidden">
                <Image
                  className="w-[62px]"
                  src={open ? closeoutine : menuoutine}
                  width={200}
                  height={200}
                  alt="menu-icon"
                />
              </div>

              <ul
                className={`pb-12 absolute lg:static bg-white z-[200] left-0 right-0 transition-all duration-500 ease-in ${
                  open ? "top-[10px]" : "top-[-1100px]"
                }`}
              >
                {/* LOGIN/SIGNUP NAVIGATION IF USER NOT LOG IN/USER NAME IF LOGIN */}
                <li className="pl-9 pb-3">
                  {userUid !== null ? (
                    <h1 className="text-gray-500 py-2 text-xl">
                      Hi, {userName}
                    </h1>
                  ) : (
                    <div>
                      <h1 className="font-semibold py-2 text-xl">
                        Welcome Guest
                      </h1>

                      <Link href="/login" className="cursor-pointer">
                        <h1 className="text-gray-500 py-2 text-xl">
                          Login/SignUp
                        </h1>
                      </Link>
                    </div>
                  )}
                </li>
                <hr className="border-2 border-b border-solid" />

                {/* PRODUCT CATEGORY CODE */}
                {CatLinks.map((cur, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={cur.link}
                        className="flex items-center justify-between gap-2 pr-4 pt-5 pb-2 pl-9"
                      >
                        <h1 className="text-xl">{cur.name}</h1>
                        <Image
                          src={cur.img}
                          width={300}
                          height={300}
                          className="w-[2rem]"
                          alt="category-icon"
                        />
                      </Link>
                    </li>
                  );
                })}
                <hr />

                {/* USER MENU LIKE USER ACCOUNT, ORDERS ETC. APPEAR ONLY IF USER IS LOGGED IN */}
                {userUid !== null ? (
                  <div>
                    {Links.map((link, index) => (
                      <li
                        key={index}
                        className="lg:ml-8 text-xl lg:my-0 my-7 pl-9"
                      >
                        <Link
                          href={link.link}
                          onClick={() => setOpen(false)}
                          className="text-gray-800 hover:text-gray-400 duration-500"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}

                    <li className="text-[1rem] my-7">
                      <Link
                        onClick={(e) => logout()}
                        href="/"
                        className="text-gray-800 text-xl hover:text-gray-400 duration-500 pl-9"
                      >
                        LogOut
                      </Link>
                    </li>
                  </div>
                ) : null}
              </ul>
            </div>
          </div>

          {/* CODE FOR SEARCH BOX IN MOBILE MENU */}
          <div
            className={`relative justify-center items-center mt-4 gap-2 ${
              searchOpen ? "flex" : "hidden"
            }`}
          >
            <input
              className="border-[2px] caret-blue-gray-400 rounded outline-none py-2 pl-4 w-[20rem] border-gray-300"
              placeholder="Search clothes here..."
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <Link href={{ pathname: "/search", query: { query: searchInput } }}>
              <h2 className="cursor-pointer text-xl caret-transparent">
                Search
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default navigationmenu;
