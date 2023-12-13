"use client";

import Image from "next/image";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import slider1 from "./Images/dys.png";
import slider2 from "./Images/dys3.png";
import Topcategories from "./topcategories";
import dynamic from "next/dynamic";
import Topproducts from "./topproducts";
import Bestoftshirts from "./bestoftshirts";
import Ourcollection from "./ourcollection";
import pricetag from "./Images/price-tag.png";
import support from "./Images/customer-service.png";
import security from "./Images/security.png";
import original from "./Images/original (1).png";
import Navigation from "./navigation";
import Footer from "./footer";

const Headcategories = dynamic(() => import("./headcategories"));

function Homerooms() {
  const images = [slider1, slider2];

  const imgArr = [
    { title: "100% Original Products", img: original },
    { title: "Best Offers", img: pricetag },
    { title: "Secure Payments", img: security },
    { title: "Customer Support", img: support },
  ];

  return (
    <>
      <div className="w-full">
        <div className="lg:max-w-[1270px] min-w-[600px] max-w-[970px] mx-auto text-black">
          <Navigation />
          <Headcategories />

          <div>
            <Zoom scale={1.4} indicators={true}>
              {images.map((each, index) => (
                <div key={index} style={{ width: "100%" }}>
                  <Image
                    style={{ objectFit: "cover", width: "100%" }}
                    alt="Slide-Image"
                    src={each}
                  />
                </div>
              ))}
            </Zoom>
          </div>

          <Topcategories />

          <div className="mt-[4rem] mb-10">
            <Ourcollection />
            <Topproducts />
            <Bestoftshirts />
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-[5rem] mb-[3rem] m-5">
            {imgArr.map((curItem, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col bg-footerBg rounded-lg p-4 items-center justify-center gap-2"
                >
                  <Image
                    className="w-[4rem]"
                    src={curItem.img}
                    width={250}
                    height={200}
                    alt="images"
                  />
                  <h1 className="text-center font-semibold">{curItem.title}</h1>
                </div>
              );
            })}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Homerooms;
