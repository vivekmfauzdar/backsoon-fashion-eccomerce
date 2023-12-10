"use client";

import React from "react";
import Image from "next/image";
import surprise from "../../Images/surprise.png";
import Link from "next/link";

function page() {
  return (
    <div className="max-w-[970px] min-w-[600px] p-5 mx-auto py-10">
      <div className="lg:flex hidden gap-2 shadow justify-around items-center p-5">
        <Image
          className="w-[100px]"
          src={surprise}
          width={200}
          height={200}
          alt="image"
        />
        <div>
          <h1 className="text-xl font-semibold text-blue-600">
            Order Placed Successfully
          </h1>
          <h2>Your Order will be delivered within 4-5 Business Days</h2>
        </div>
        <Link
          href={{ pathname: "/account/orders" }}
          className="bg-pink-400 rounded text-white px-3 py-2 mt-4"
        >
          See Orders
        </Link>
      </div>

      <div className="lg:hidden flex flex-col gap-2 shadow justify-center items-center p-5">
        <Image
          className="w-[100px]"
          src={surprise}
          width={200}
          height={200}
          alt="image"
        />
        <div className="text-center">
          <h1 className="text-xl font-semibold text-blue-600">
            Order Placed Successfully
          </h1>
          <h2>Your Order will be delivered within 4-5 Business Days</h2>
        </div>
        <Link
          href={{ pathname: "/account/orders" }}
          className="bg-pink-400 rounded text-white px-3 py-2 mt-4"
        >
          See Orders
        </Link>
      </div>
    </div>
  );
}

export default page;
