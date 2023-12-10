"use client";

import React, { useEffect, useState } from "react";
import logo from "../../Images/backsoon_logo.png";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function page() {
  const router = useRouter();

  const [logindetails, setLoginDetails] = useState({
    userId: "",
    password: "",
  });

  const submit = () => {
    const userId = "vivekramdas";
    const password = "1234567890";

    if (logindetails.userId === userId && logindetails.password === password) {
      router.push("/admin");
      toast.success("Login Successfully!");
      localStorage.setItem("logindetails", JSON.stringify(logindetails));
    } else {
      alert("Login Credentials does not match");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("logindetails");
    if (data && !data.includes("null")) {
      redirect("/admin");
    }
  }, []);

  return (
    <div className="max-w-[470px] mx-auto py-[80px]">
      <Toaster toastOptions={{ duration: 2000 }} />
      <div className="grid grid-cols-1 justify-center items-center shadow-lg gap-4 pb-5">
        <Image
          className="w-[200px]"
          src={logo}
          width={200}
          height={200}
          alt="logo"
        />
        <h1 className="font-semibold text-xl">
          Enter Your Admin Credntials to Login
        </h1>
        <input
          onChange={(e) =>
            setLoginDetails({ ...logindetails, userId: e.target.value })
          }
          type="text"
          className="p-2 rounded border-2 border-solid border-gray-300 outline-none"
          value={logindetails.userId}
          placeholder="Enter UserID"
        />
        <input
          onChange={(e) =>
            setLoginDetails({ ...logindetails, password: e.target.value })
          }
          type="password"
          className="p-2 rounded border-2 border-solid border-gray-300 outline-none"
          value={logindetails.password}
          placeholder="Enter Password"
        />
      </div>
      <button
        onClick={submit}
        className="bg-blue-400 p-2 caret-transparent text-white rounded w-full"
      >
        Submit
      </button>
    </div>
  );
}

export default page;
