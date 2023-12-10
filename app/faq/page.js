
"use client"

import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export default function Faq() {

  const [open, setOpen] = useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
    <div className="max-w-[700px] min-w-[400px] p-5  mx-auto pt-[80px] caret-transparent mb-[100px]">
    <h1 className=" text-2xl font-semibold mb-2">FAQ's</h1>
      <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          What is Backsoon Fashion?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
        Backsoon Fashion is your go-to online destination for curated men's fashion. We understand that the essence of great style lies in the details, and we meticulously curate a collection that embodies quality, elegance, and versatility. Established with a passion for redefining men's fashion, we aim to elevate your wardrobe with a seamless fusion of trendsetting pieces and timeless classics.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 transition-colors ${
            open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
        What is your return policy?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
        We offer a hassle-free return policy within 30 days of your purchase. Please ensure the item is in its original condition with tags attached for a smooth return process. Visit our Returns page for detailed instructions.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 transition-colors ${
            open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          Are your products true to size?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
        We understand the importance of a perfect fit. Our sizing charts are accurate, but if you're unsure, feel free to reach out to our customer support team for personalized assistance.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 4} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(4)}
          className={`border-b-0 transition-colors ${
            open === 4 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          How can I contact customer support?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
        You can reach our customer support team via email at support@backsoonfashion.com or through our Contact Us page. We strive to respond to all inquiries within 24 hours.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} className="rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(5)}
          className={`border-b-0 transition-colors ${
            open === 5 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
           How often do you update your collections?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
        We strive to keep our collections fresh and in line with the latest trends. We regularly update our catalog with new arrivals, ensuring you have access to the latest in men's fashion.
        </AccordionBody>
      </Accordion>
      </div>
    </>
  );
}