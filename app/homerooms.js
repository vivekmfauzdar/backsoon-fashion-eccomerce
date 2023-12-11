import Image from "next/image";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import slider1 from "./Images/dys.png";
import slider2 from "./Images/dys3.png";
import Topcategories from "./topcategories";
// import Headcategories from "./headcategories";
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

const buttonStyle = {
  width: "30px",
  background: "none",
  border: "0px",
};

const properties = {
  prevArrow: (
    <button style={{ ...buttonStyle }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button style={{ ...buttonStyle }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
      </svg>
    </button>
  ),
};

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
        <div className="lg:max-w-[1270px] min-w-[600px] max-w-[600px] mx-auto text-black">
          <Navigation />
          <Headcategories />

          <div>
            <Zoom scale={1.4} indicators={true}>
              {images.map((each, index) => (
                <div key={index} style={{ width: "100%" }}>
                  <Image
                    style={{ objectFit: "cover", width: "100%" }}
                    alt="Slide Image"
                    src={each}
                  />
                </div>
              ))}
            </Zoom>
          </div>

          <Topcategories />

          <div className="mt-[70px] mb-10">
            <Ourcollection />
            <Topproducts />
            <Bestoftshirts />
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-[80px] mb-[50px] m-5">
            {imgArr.map((curItem, index) => {
              return (
                <div key={index} className="flex flex-col bg-footerBg rounded-lg p-4 items-center justify-center gap-2">
                  <Image
                    className="w-[60px]"
                    src={curItem.img}
                    width={250}
                    height={200} alt="images"
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
