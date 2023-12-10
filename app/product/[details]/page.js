"use client";

import React, { useEffect, useReducer, useState } from "react";
import { dbfs } from "@/app/firebase";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { usePathname, useSearchParams } from "next/navigation";
import { BsFillTagFill } from "react-icons/bs";
import noproduct from "../../Images/page-not-found.png";
import { getAuth } from "firebase/auth";
import Navigation from "@/app/navigation";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { PulseLoader } from "react-spinners";
import {
  collection,
  onSnapshot,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/app/footer";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaRegHandPointRight } from "react-icons/fa";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        display: "block",
        zIndex: 10,
        position: "absolute",
        right: -20,
        top: 145,
      }}
      onClick={onClick}
      className={className}
    >
      <IoIosArrowDropright color="#FF3F6C" size={40} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        display: "block",
        zIndex: 10,
        position: "absolute",
        left: -40,
        top: 150,
      }}
      onClick={onClick}
      className={className}
    >
      <IoIosArrowDropleft color="#FF3F6C" size={40} />
    </div>
  );
}

const getLocalCartData = () => {
  let newCartData = localStorage.getItem("cartData");

  if (newCartData === null) {
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};

function Details() {
  const initialData = getLocalCartData();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  const [recentUsers, setRecentUsers] = useState([]);
  const [firebaseData, setFirebasedata] = useState([]);
  const [wishlist, setWishlist] = useState(false);
  const [curUserUid, setCurUserUid] = useState("");
  const [pincode, setPinCode] = useState("");
  const [service, setService] = useState();
  const [cartData, setCartData] = useState(initialData);
  const [curImage, setCurImage] = useState();
  const [activeImg, setActiveImg] = useState();
  const [similiarProducts, setSimiliarProducts] = useState([]);
  const [loaderEnable, setLoaderEnable] = useState(true);
  const [noData, setNoData] = useState(false);

  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const search = usePathname();
  const id = search.split("/").at(2);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // current user UID
  useEffect(() => {
    const auth = getAuth();
    const curUid = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurUserUid(user.uid);
      } else {
        setCurUserUid(null);
      }
    });
  }, []);

  useEffect(() => {
    try {
      const q = query(collection(dbfs, "AllProducts"), where("id", "==", id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          setNoData(true);
          setLoaderEnable(false);
        }
        querySnapshot.forEach((doc) => {
          setRecentUsers(doc.data());
          setLoaderEnable(false);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collectionGroup(dbfs, "Reviews"),
          where("id", "==", id)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const reviewsData = [];
          querySnapshot.forEach((doc) => {
            reviewsData.push(doc.data());
            console.log("thisis", doc.data());
          });
          setFirebasedata(reviewsData);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [search]);

  const getOffPercent = (discountedprice, realprice) => {
    const dicountprice = realprice - discountedprice;
    const getoff = (dicountprice / realprice) * 100;
    return Math.floor(getoff);
  };

  const generateRandomString = (length) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Function to generate an order ID
  const generateOrderID = () => {
    const timestamp = new Date().getTime(); // Current timestamp
    const randomString = generateRandomString(6); // Generate a random string
    const orderID = `ORD-${timestamp}-${randomString}`; // Combine them as needed
    return orderID;
  };

  const addTocart = (title, brand, price, images, id) => {
    const productCount = 1;
    const rightprice = price;
    const productprice = parseInt(price, 10);
    const orderID = generateOrderID();
    const ob = {
      title,
      brand,
      productprice,
      images,
      productCount,
      rightprice,
      id,
      orderID,
    };
    setCartData((prev) => [...prev, ob]);
    toast.success("Product Added to Bag");
  };

  const addWishlist = (data) => {
    try {
      const dbref = dbfs.collection("MyWishlist").doc(curUserUid);
      dbref
        .collection("MyWishData")
        .doc(data.id)
        .set(data)
        .then(() => {
          toast.success("Product Added to Wishlist.");
          setWishlist(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  async function checkServiceAvailablity() {
    if (!pincode) {
      alert("Enter Pincode");
    } else {
      let pins = await fetch("/api/hello");
      let pinJson = await pins.json();
      if (pinJson.includes(pincode)) {
        setService(true);
      } else {
        setService(false);
      }
    }
  }

  // getting the similiar products from here
  useEffect(() => {
    setLoaderEnable(true);
    try {
      const data = [];
      dbfs.collectionGroup(category).onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });

        setSimiliarProducts(data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const shortentitle = (title, limit) => {
    if (title.length > limit) {
      return title.slice(0, limit) + "...";
    }
    return title;
  };

  return (
    <>
      <div className="max-w-[1270px] min-w-[600px] mx-auto">
        <Navigation />
        <div className="max-w-[970px] min-w-[600px] mx-auto">
          <ToastContainer autoClose="2000" />

          {recentUsers.length !== 0 && (
            <div>
              <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-center gap-5 py-10">
                <div className="grid grid-cols-6 gap-2">
                  <div className="flex flex-col gap-4">
                    {recentUsers &&
                      recentUsers?.images?.map((cur, index) => {
                        return (
                          <div className="" key={index}>
                            <Image
                              onMouseOver={() => {
                                setCurImage(cur), setActiveImg(index);
                              }}
                              onLoad={() => setCurImage(recentUsers.images[0])}
                              src={cur}
                              className={`w-[70px] h-[112px] ${
                                activeImg === index
                                  ? "border-[2px] border-pink-400 border-solid"
                                  : null
                              } shadow rounded cursor-pointer`}
                              width={600}
                              height={400}
                              alt="product-images"
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="col-span-5 w-[342px] h-[513px]">
                    <Image
                      src={curImage ? curImage : recentUsers?.images[0]}
                      width={600}
                      height={400}
                      className="w-[350px] h-[470px]"
                      alt="product-image"
                    />
                  </div>
                </div>

                <div className="p-5">
                  <h1 className="text-2xl lg:text-xl font-bold text-gray-400">
                    {recentUsers?.brand}
                  </h1>
                  <h1 className="text-2xl lg:text-xl font-semibold">
                    {recentUsers?.title}
                  </h1>

                  <div className="flex items-center pt-3">
                    {firebaseData !== 0 ? (
                      <div className="flex items-center">
                        <AiFillStar className="text-green-600" size={25} />
                        <span className="text-xl lg:text-[1rem]">
                          {firebaseData.length} Reviews
                        </span>
                      </div>
                    ) : (
                      <span className="lg:text-xl text-[1rem]">No Reviews</span>
                    )}
                  </div>

                  <hr className="mt-4" />

                  <div className="flex items-center gap-2 pt-5">
                    <h1 className="text-2xl font-semibold">
                      ₹{recentUsers?.discountedprice}
                    </h1>
                    <h1 className="line-through text-2xl">
                      MRP ₹{recentUsers?.realprice}
                    </h1>
                    <h3 className="text-green-400 text-xl font-semibold">
                      (
                      {getOffPercent(
                        recentUsers?.discountedprice,
                        recentUsers?.realprice
                      )}
                      % OFF)
                    </h3>
                  </div>

                  <div className="pt-5">
                    <div className="flex gap-3">
                      <h2 className="font-semibold lg:text-[1rem] text-xl">
                        Select Size
                      </h2>
                      <h2 className="font-semibold lg:text-[1rem] text-xl text-pink-400 cursor-pointer">
                        Size Chart
                      </h2>
                    </div>
                    <div
                      className="rounded-md shadow-sm buttons pt-3"
                      role="group"
                    >
                      <div>
                        <input
                          label="S"
                          type="radio"
                          name="Select Size"
                          value="S"
                        />
                        <input
                          label="M"
                          type="radio"
                          name="Select Size"
                          value="M"
                        />
                        <input
                          label="X"
                          type="radio"
                          name="Select Size"
                          value="X"
                        />
                        <input
                          label="XL"
                          type="radio"
                          name="Select Size"
                          value="XL"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-5">
                    <button
                      className="bg-pink-400 lg:text-[1rem] text-xl font-semibold text-white p-3 px-5 lg:p-2 lg:px-4 rounded"
                      onClick={() =>
                        addTocart(
                          recentUsers.title,
                          recentUsers.brand,
                          recentUsers.discountedprice,
                          recentUsers.images[0],
                          recentUsers.id
                        )
                      }
                    >
                      Add to Bag
                    </button>
                    <button
                      className={`border-[1px] text-xl lg:text-[1rem] font-semibold lg:p-2 lg:px-4 p-3 px-5 rounded ${
                        wishlist
                          ? "bg-pink-400 text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => addWishlist(recentUsers)}
                    >
                      Wishlist
                    </button>
                  </div>

                  <hr className="mt-5" />

                  <div className="pt-5">
                    <div className="py-2">
                      <div>
                        <input
                          type="number"
                          className="outline-none border-[2px] rounded p-2 px-6 lg:px-4"
                          placeholder="Enter your pin code"
                          onChange={(e) => setPinCode(parseInt(e.target.value))}
                        />
                        <button
                          onClick={checkServiceAvailablity}
                          className="text-btnColor text-xl lg:text-lg font-semibold ml-2 outline-none"
                        >
                          Check
                        </button>
                      </div>
                      <span className="lg:text-[1rem] text-md pt-2">
                        Please enter Pincode to check Delivery Availability!
                      </span>

                      {!service && service != null && (
                        <div className="text-[15px] text-red-500">
                          This Pincode is not Deliverable!
                        </div>
                      )}

                      {service && service != null && (
                        <div className="text-[15px] text-green-500">
                          Deliverable Pin Dosto!!
                        </div>
                      )}
                    </div>
                    <h1 className="font-semibold pt-8 lg:text-base text-xl pb-2">
                      Product Description
                    </h1>
                    <p className="text-lg lg:text-sm">
                      {recentUsers.description}
                    </p>

                    <div className="py-8">
                      <ul>
                        <li className="flex items-center gap-1 text-xl lg:text-[1rem]">
                          <FaRegHandPointRight /> 100% Original Products
                        </li>
                        <li className="flex items-center gap-1 text-xl lg:text-[1rem]">
                          <FaRegHandPointRight /> Pay on delivery might be
                          available
                        </li>
                        <li className="flex items-center gap-1 text-xl lg:text-[1rem]">
                          <FaRegHandPointRight />
                          Easy 14 days returns and exchanges
                        </li>
                      </ul>
                    </div>

                    <div className="pb-8">
                      <h1 className="font-semibold py-2 text-xl lg:text-base">
                        Exciting Offers
                      </h1>
                      <div className="flex items-center gap-2">
                        <BsFillTagFill />
                        <span className="text-xl lg:text-[1rem]">
                          Get Flat 15% off on all prepaid orders above ₹399{" "}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsFillTagFill />
                        <span className="text-xl lg:text-[1rem]">
                          Use coupon code BACKSOON22
                        </span>
                      </div>
                    </div>

                    <hr />

                    <div className="mt-5">
                      <div className="mb-2">
                        <h1 className="font-semibold text-xl lg:text-base">
                          Reviews ({firebaseData.length})
                        </h1>
                      </div>

                      {firebaseData.length !== 0 ? (
                        firebaseData.map((cur) => {
                          return (
                            <div className="pt-4" key={cur.id}>
                              <div className="flex gap-2">
                                <div className="bg-green-600 w-[35px] px-1 rounded flex items-center text-white">
                                  <h3>{cur.rating}</h3>{" "}
                                  <AiFillStar color="white" />
                                </div>
                                <h1 className="font-semibold text-[14px]">
                                  {cur.title}
                                </h1>
                              </div>

                              <div className="my-2">
                                <p className="text-[14px]">{cur.description}</p>
                              </div>

                              <div>
                                <h4 className="text-[12px] text-gray-600">
                                  {cur.name} | {cur.date}
                                </h4>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div>
                          <h1 className="text-xl">
                            No Reviews Available For this product yet
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* This is similiar products code */}
              <div>
                <h1 className="text-xl font-semibold pt-5 pl-5">
                  Similiar Products
                </h1>
                <div className="m-10 mt-5">
                  <Slider {...settings}>
                    {similiarProducts.map((curElm) => {
                      return (
                        <Link
                          key={curElm.id}
                          href={{
                            pathname: `/product/${curElm.id}`,
                            query: { category: curElm.category },
                          }}
                        >
                          <div className="shadow-lg max-auto cursor-pointer m-1">
                            <Image
                              src={curElm.images[0]}
                              className="lg:w-[270px] lg:h-[16rem] w-[250px] h-[20rem]"
                              width={600}
                              height={600}
                              alt="product-image"
                            />
                            <h1 className="font-semibold pl-2">
                              {curElm.brand}
                            </h1>
                            <h2 className="pl-2">
                              {shortentitle(curElm.title, 20)}
                            </h2>
                            <div className="flex gap-2 pl-2">
                              <h3 className="font-semibold">
                                ₹{curElm.discountedprice}
                              </h3>
                              <h3 className="line-through	">
                                ₹{curElm.realprice}
                              </h3>
                              <h3 className="text-orange-400	">
                                {getOffPercent(
                                  curElm.discountedprice,
                                  curElm.realprice
                                )}
                                % OFF
                              </h3>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          )}

          {loaderEnable && (
            <div className="flex flex-col justify-center items-center h-[90vh]">
              <PulseLoader
                color="#FF3F6C"
                loading={loaderEnable}
                cssOverride={CSSProperties}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <h1 className="text-pink-400 font-semibold text-xl">
                Getting Data...
              </h1>
            </div>
          )}

          {noData === true && (
            <div>
              <div className="grid grid-cols-1 justify-items-center py-[100px]">
                <Image
                  src={noproduct}
                  width={200}
                  height={200}
                  alt="no product image"
                />
                <h1 className="font-bold text-2xl">No product found</h1>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Details;
