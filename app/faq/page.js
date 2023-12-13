"use client";

import React, { useState } from "react";

function page() {
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState("");

  const content = [
    {
      num: 1,
      title: "What is Backsoon Fashion?",
      desc: "Backsoon Fashion is your go-to online destination for curated men's fashion. We understand that the essence of great style lies in the details, and we meticulously curate a collection that embodies quality, elegance, and versatility. Established with a passion for redefining men's fashion, we aim to elevate your wardrobe with a seamless fusion of trendsetting pieces and timeless classics.",
    },

    {
      num: 2,
      title: "What is your return policy?",
      desc: "We offer a hassle-free return policy within 30 days of your purchase. Please ensure the item is in its original condition with tags attached for a smooth return process. Visit our Returns page for detailed instructions.",
    },

    {
      num: 3,
      title: "Are your products true to size?",
      desc: "We understand the importance of a perfect fit. Our sizing charts are accurate, but if you're unsure, feel free to reach out to our customer support team for personalized assistance.",
    },
    {
      num: 4,
      title: "How can I contact customer support?",
      desc: "You can reach our customer support team via email at support@backsoonfashion.com or through our Contact Us page. We strive to respond to all inquiries within 24 hours.",
    },
    {
      num: 5,
      title: "How often do you update your collections?",
      desc: "We strive to keep our collections fresh and in line with the latest trends. We regularly update our catalog with new arrivals, ensuring you have access to the latest in men's fashion.",
    },
  ];

  const getD = (num) => {
    setNum(num);
    setOpen(!open);
  };

  return (
    <div className="max-w-[700px] min-w-[600px] p-5 mx-auto pt-[50px] caret-transparent mb-[100px]">
      {" "}
      <h1 className="text-2xl font-semibold mb-2">FAQ's</h1>
      <div className="w-[400px] mx-auto">
        {content.map((cur) => {
          return (
            <div
              className="cursor-pointer rounded-lg shadow p-4 mt-5 border-[1px] border-solid border-gray-400"
              onClick={() => getD(cur.num)}
            >
              <h1 className={`font-semibold text-xl ${num === cur.num && open ? 'text-blue-400' : 'text-black'}`}>
                {cur.title}
              </h1>
              <p className={`${num === cur.num && open ? "flex pt-5" : "hidden"}`}>
                {cur.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
