"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function Faq() {
  const [open, setOpen] = useState(1);

  const content = [
    {
      num: 1,
      title: "What is Backsoon Fashion?",
      desc: " Backsoon Fashion is your go-to online destination for curated men's fashion. We understand that the essence of great style lies in the details, and we meticulously curate a collection that embodies quality, elegance, and versatility. Established with a passion for redefining men's fashion, we aim to elevate your wardrobe with a seamless fusion of trendsetting pieces and timeless classics.",
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

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="max-w-[700px] min-w-[400px] p-5  mx-auto pt-[80px] caret-transparent mb-[100px]">
        <h1 className=" text-2xl font-semibold mb-2">FAQ's</h1>

        <div>
          {content.map((cur) => {
            return (
              <div key={cur.num}> 
                <Accordion
                  open={open === cur.num}
                  className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                >
                  <AccordionHeader
                    onClick={() => handleOpen(cur.num)}
                    className={`border-b-0 transition-colors ${
                      open === cur.num ? "text-blue-500 hover:!text-blue-700" : ""
                    }`}
                  >
                   {cur.title}
                  </AccordionHeader>
                  <AccordionBody className="pt-0 text-base font-normal">
                   {cur.desc}
                  </AccordionBody>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
