import React from "react";
import Image from "next/image";
import hoodie from "./Images/9.png";
import tshirt from "./Images/4.png";
import jeans from "./Images/jeanss.png";
import menshoes from "./Images/6.png";
import sweater from "./Images/2.png";
import sunglasses from "./Images/3.png";
import shirt from "./Images/8.png";
import jacket from "./Images/1.png";
import watch from "./Images/5.png";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Headcategories() {
  var settings = {
    dots: false,
    slidesToShow: 9, // Adjust the number of slides shown
    slidesToScroll: 1, // Adjust the number of slides to scroll
    arrows: false,
    className: "center",
    centerPadding: "40px",
    centerMode: true,
    responsive: [
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 5, // Adjust for smaller screens
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 4, // Adjust for smaller screens
          slidesToScroll: 3,
        },
      },
      // Add more responsive breakpoints if needed
    ],
  };

  const data = [
    {
      image: hoodie,
      title: "Hoodie",
      link: "/hoodies",
    },
    {
      image: jacket,
      title: "Jackets",
      link: "/jacket",
    },
    {
      image: jeans,
      title: "Jeans",
      link: "/jeans",
    },
    {
      image: menshoes,
      title: "Shoes",
      link: "/shoes",
    },
    {
      image: shirt,
      title: "Shirts",
      link: "/shirts",
    },
    {
      image: sunglasses,
      title: "Sunglasses",
      link: "/sunglasses",
    },
    {
      image: sweater,
      title: "Sweater",
      link: "/sweaters",
    },
    {
      image: tshirt,
      title: "Tshirts",
      link: "/tshirts",
    },
    {
      image: watch,
      title: "Watches",
      link: "/watches",
    },
  ];

  return (
    <div className="w-full">
      <Slider {...settings} className="py-5">
        {data.map((curElm, index) => (
          <Link href={curElm.link} key={index}>
            <div className="flex flex-col items-center">
              <Image
                src={curElm.image}
                className="lg:w-[44px] w-[94px] rounded"
                alt="product-category-image"
                width={100}
                height={100}
              />
              <h2 className="text-xl lg:text-sm">{curElm.title}</h2>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default Headcategories;
