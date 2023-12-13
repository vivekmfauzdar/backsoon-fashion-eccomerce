"use client";

import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsBagHeart } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { dbfs } from "./firebase";

export default function HoverDropdown({ name }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push("/");
      toast.success("Logout Successfully");
    });
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 2000 }} />

      <div onMouseLeave={() => setOpen(false)} className="relative">
        <button
          onMouseOver={() => setOpen(true)}
          className="flex items-center p-2 gap-2 bg-white"
        >
          <AiOutlineUser size={22} />
          <h1 className="">{name}</h1>
          <BiChevronDown />
        </button>
        <ul
          className={`absolute z-10 bg-white right-0 w-60 py-2 rounded-lg shadow-xl ${
            open ? "block" : "hidden"
          }`}
        >
          <Link href="/account">
            <li className="flex w-full gap-2 items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <BiUserCircle size={25} />
              <h1>My Profile</h1>
            </li>
          </Link>

          <Link href="/account/orders">
            <li className="flex gap-2 w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <BsBagHeart size={25} />
              <h1>Orders</h1>
            </li>
          </Link>

          <Link href="/wishlist">
            <li className="flex gap-2 w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <AiOutlineHeart size={25} />
              <h1>Wishlist</h1>
            </li>
          </Link>

          <li
            className="flex gap-2 w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={logout}
          >
            <MdOutlineLogout size={24} />
            <h1>Logout</h1>
          </li>
        </ul>
      </div>
    </div>
  );
}
