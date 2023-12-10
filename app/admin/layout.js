"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../Images/backsoon_logo.png";
import mereram from "../Images/mereram.jpg";
import { useParams, usePathname, useRouter, redirect } from "next/navigation";
import { Poppins, Roboto } from "next/font/google";
import { IoBagAddOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { CiBoxes } from "react-icons/ci";
import { BsBox2Heart } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa6";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState();

  useEffect(() => {
    const activemenu = localStorage.getItem("admintab");
    if (activemenu) {
      setActive(JSON.parse(activemenu));
    }
  });

  const handleActiveMenu = (menu) => {
    setActive(menu);
    localStorage.setItem("admintab", JSON.stringify(menu));
  };

  const logout = () => {
    router.push("/admin/login");
    localStorage.setItem("logindetails", JSON.stringify("null"));
  };

  return (
    <html className={poppins.className}>
      <body>
        <div className="w-[100%] mx-auto pt-5">
          {pathname !== "/admin/login" && (
            <div className="max-w-[1270px] min-w-[600px] mx-auto">
              <div>
                <div className="flex items-center justify-between pl-2 pr-2 ">
                  <Image
                    className="w-[150px] h-[40px]"
                    src={logo}
                    width={100}
                    height={100}
                    alt="image"
                  />

                  <div>
                    <h1 className="font-semibold text-xl">Admin Panel</h1>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded shadow">
                    <Image
                      className="w-10 h-10 rounded-lg"
                      objectPosition="center"
                      objectFit="center"
                      src={mereram}
                      width={50}
                      height={50}
                      alt="image"
                    />
                    <div className="">
                      <span className="font-semibold">Vivek Fauzdar</span>
                      <div className="flex items-center gap-2">
                        <FaPowerOff size={15} color="#EF5350" />
                        <h2
                          className="font-semibold text-red-400 cursor-pointer"
                          onClick={logout}
                        >
                          Logout
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <div className="mt-5 flex flex-col gap-4 p-5 col-span-1">
                    <Link
                      className="rounded"
                      href="/admin/orders"
                      onClick={() => handleActiveMenu("orders")}
                    >
                      <div
                        className={`flex items-center gap-2 p-2 rounded ${
                          active === "orders"
                            ? "text-blue-400 font-semibold bg-blue-50 rounded"
                            : null
                        }`}
                      >
                        <BsBox2Heart size={25} />
                        <h2>Orders</h2>
                      </div>
                    </Link>

                    <Link
                      href="/admin/catalogue"
                      onClick={() => handleActiveMenu("catalogue")}
                    >
                      <div
                        className={`flex items-center gap-2 p-2 ${
                          active === "catalogue"
                            ? "text-blue-400 font-semibold bg-blue-50 rounded"
                            : null
                        }`}
                      >
                        <CiBoxes size={30} />
                        <h2>Catalogue</h2>
                      </div>
                    </Link>

                    <Link
                      href="/admin/customers"
                      onClick={() => handleActiveMenu("customers")}
                    >
                      <div
                        className={`flex items-center gap-2 p-2 ${
                          active === "customers"
                            ? "text-blue-400 font-semibold bg-blue-50 rounded"
                            : null
                        }`}
                      >
                        <PiUsers size={25} />
                        <h2>Customers</h2>
                      </div>
                    </Link>

                    <Link
                      href="/admin/messages"
                      onClick={() => handleActiveMenu("messages")}
                    >
                      <div
                        className={`flex items-center gap-2 p-2 ${
                          active === "messages"
                            ? "text-blue-400 font-semibold bg-blue-50 rounded"
                            : null
                        }`}
                      >
                        <IoMailOutline size={25} />
                        <h2>Messages</h2>
                      </div>
                    </Link>

                    <Link
                      href="/admin/addproducts"
                      onClick={() => handleActiveMenu("addproducts")}
                    >
                      <div
                        className={`flex items-center gap-2 p-2 ${
                          active === "addproducts"
                            ? "text-blue-400 font-semibold bg-blue-50 rounded"
                            : null
                        }`}
                      >
                        <IoBagAddOutline size={25} />
                        <h2>Add Products</h2>
                      </div>
                    </Link>
                  </div>
                  <div className="col-span-4">{children}</div>
                </div>
              </div>
            </div>
          )}

          {pathname === "/admin/login" && <div>{children}</div>}
        </div>
      </body>
    </html>
  );
}

export default layout;
