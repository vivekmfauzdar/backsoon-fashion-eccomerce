"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsBagHeart } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";
import Footer from '../footer'
import dynamic from 'next/dynamic'

const Navigation = dynamic(() => import('../navigation'))

function Layout({ children }) {
  const [active, setActiveItem] = useState("");

  const handleActiveMenu = (menu) => {
    setActiveItem(menu);
  };

  return (
    <>
          <div className="max-w-[1270px] min-w-[600px] mx-auto">

      <Navigation />
      <div className="lg:block hidden mx-auto bg-gray-100 pt-10">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col gap-4 p-5">
            <Link href="/account" onClick={() => handleActiveMenu("account")}>
              <div
                className={`flex items-center gap-2 p-2 rounded ${
                  active === "account" ? "font-semibold" : null
                }`}
              >
                <BiUserCircle size={25} />
                <h2>My Details</h2>
              </div>
            </Link>

            <hr />

            <Link
              href="/account/address"
              onClick={() => handleActiveMenu("address")}
            >
              <div
                className={`flex items-center gap-2 p-2 ${
                  active === "address" ? "font-semibold" : null
                }`}
              >
                <MdOutlineLocationOn size={25} />
                <h2>My Address</h2>
              </div>
            </Link>
            <hr />
            <Link
              href="/account/orders"
              onClick={() => handleActiveMenu("orders")}
            >
              <div
                className={`flex items-center gap-2 p-2 ${
                  active === "orders" ? "font-semibold" : null
                }`}
              >
                <BsBagHeart size={25} />
                <h2>My Orders</h2>
              </div>
            </Link>
            <hr />

            <Link
              href="/account/reviews"
              onClick={() => handleActiveMenu("reviews")}
            >
              <div
                className={`flex items-center gap-2 p-2 ${
                  active === "reviews" ? "font-semibold" : null
                }`}
              >
                <VscFeedback size={25} />
                <h2>My Reviews</h2>
              </div>
            </Link>
          </div>
          <div className="col-span-3">{children}</div>

        </div>
      </div>
      <div className="col-span-3 lg:hidden block">{children}</div>

     <Footer />
     </div>

    </>
  );
}

export default Layout;
