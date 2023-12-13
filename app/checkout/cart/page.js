"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import shoppingbag from "../../Images/shopping-bags.png";
import menhoodie from "../../Images/meninhoodie.jpg";
import { data } from "autoprefixer";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { dbfs } from "@/app/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addCartData, removeData } from "@/app/redux/slice";
import { useSelect } from "@material-tailwind/react";


function Bag() {

  const router = useRouter()  
  let initialValue = 1;

  const [productnum, setProductNum] = useState(initialValue);
  const [bagData, setBagData] = useState([]);
  const [curUser, setCurUser] = useState("")

  const cartDataRedux = useSelector((cur) => cur.cartData)
  console.log(cartDataRedux)
  const dispatch = useDispatch()

  //getting the current user
  useEffect(() => {

    const auth = getAuth()

    let curUser = auth.onAuthStateChanged((user) => {

      if(user){
         setCurUser(user)
      }else{
        setCurUser(null)
      }
    })

  }, [])

  useEffect(() => {
    const bagData = localStorage.getItem("cartData");
    if (bagData) {
      setBagData(JSON.parse(bagData));
    }
  }, []);

  const deleteData = (index) => {
    const updatedData = [...bagData];
    updatedData.splice(index, 1);
    setBagData(updatedData);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
    dispatch(removeData(index))
  };

  
  const changeProductCount = (index, sign, rightprice) => {
    setProductNum((prevProductNum) => {
      const updatedProductNum =
        sign === "+" ?prevProductNum==10 ? 10 :  prevProductNum + 1 : prevProductNum==1 ?  1 : prevProductNum - 1;
      const newData = [...bagData];
      newData[index] = {
        ...newData[index],
        productCount: updatedProductNum,
        productprice: rightprice * updatedProductNum,
      };
      localStorage.setItem("cartData", JSON.stringify(newData));
      setBagData(newData);
      return updatedProductNum;
    });
  };

  const totalAmount = bagData?.reduce((accumulator, currenValue) => {
    return accumulator + currenValue.productprice;
  }, 0);

 
  return (
    <div className="max-w-[970px] min-w-[600px] mx-auto py-[50px] select-none">

    <div className="grid grid-cols-1 p-5 gap-5 ">
      {bagData && bagData.length !== 0 ? (
        bagData.map((curData, index) => {
          return (
            <div className="grid lg:grid-cols-3 grid-cols-1 p-5 gap-5" key={index}>
              <div className="lg:col-span-2">
                <div className="flex justify-between gap-3 p-5 border-2 border-solid rounded">
                  <div>
                    <Image className="w-[5rem]" src={curData?.images} width={200} height={200}  alt="product-images"/>
                  </div>
                  <div className="">
                    <h1 className="font-semibold text-xl lg:text-base">{curData?.brand}</h1>
                    <Link className="hover:text-blue-600 hover:underline" href={{pathname : `/product/${curData.id}`, query: {category: curData.colletionN}}}>

                    <h1 className="text-xl lg:text-base">{curData?.title}</h1>
                    </Link>
                    <h1 className="font-semibold text-xl lg:text-base">₹ {curData?.productprice}</h1>
                    <span className="text-xl lg:text-base">14 days return availabe</span>

                    <div className="flex gap-2 pt-4">
                      <div className="font-semibold rounded-full flex items-center justify-center w-[24px] h-[24px] border-2 border-solid select-none">
                        <span
                          className=" font-semibold lg:text-xl text-2xl cursor-pointer"
                          onClick={() =>
                            changeProductCount(index, "-", curData.rightprice)
                          }
                        >
                          -
                        </span>
                      </div>
                      <span className="border-solid border-2 text-xl lg:text-base px-4 rounded selection:">
                        {curData?.productCount}
                      </span>
                      <div className="font-semibold rounded-full flex items-center justify-center w-[24px] h-[24px] border-2 border-solid select-none">
                        <span
                          className=" font-semibold lg:text-xl text-2xl cursor-pointer select-none"
                          onClick={() =>
                            changeProductCount(index, "+", curData.rightprice)
                          }
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <RxCross2
                      className="cursor-pointer"
                      size={25}
                      onClick={() => deleteData(index)}
                    />
                  </div>
                </div>
              </div>

              {index === 0 && ( 
                <div className="lg:block hidden">

                <div className="shadow p-5">
                  <div className="p-5">
                    <h1 className="font-semibold text-2xl lg:text-xl">Price Details</h1>
                  </div>
                  <hr />

                  <div className="p-5">
                    <div className="flex justify-between text-2xl lg:text-lg">
                      <h2>Price ({bagData.length} items)</h2>
                      <h2>₹{totalAmount}</h2>
                    </div>

                    <div className="flex justify-between pt-5 text-2xl lg:text-lg">
                      <h2>Delivery Charges</h2>
                      <h2>₹40</h2>
                    </div>
                  </div>

                  <hr />

                  <div className="p-5 flex justify-between text-2xl lg:text-lg">
                    <h2>Total Amount</h2>
                    <h2>₹{totalAmount + 40}</h2>
                  </div>

                  <div className="mt-5">
                    {curUser ? <Link href="/checkout/addresses"> <button className="bg-blue-400 text-white rounded p-2 w-full">
                      Place Order
                    </button> </Link>  : <Link href={{pathname: "/login", query: {reference : "thisisfromcart"}}}>
                    <button className="bg-blue-400 text-white rounded p-2 w-full">
                      Place Order
                    </button>
                    </Link>}
                  </div>
                </div>

                </div>
              )}
              </div>
          );
        })
      ) : (
        <div className="py-[50px] h-[60vh] flex items-center justify-center flex-col">
          <Image
            src={shoppingbag}
            className="w-[100px] mx-auto"
            width={200}
            height={100} alt="image"
          />
          <h2 className="text-center text-xl lg:text-[1rem]">
            There is nothing in your Bag. Add some items.
          </h2>
        </div>
      )}
      {bagData.length !== 0 && ( 
                <div className="lg:hidden block">

                <div className="shadow p-5">
                  <div className="p-5">
                    <h1 className="font-semibold text-2xl lg:text-xl">Price Details</h1>
                  </div>
                  <hr />

                  <div className="p-5">
                    <div className="flex justify-between text-2xl lg:text-[12px]">
                      <h2>Price ({bagData.length} items)</h2>
                      <h2>₹{totalAmount}</h2>
                    </div>

                    <div className="flex justify-between pt-5 text-2xl lg:text-xl">
                      <h2>Delivery Charges</h2>
                      <h2>₹40</h2>
                    </div>
                  </div>

                  <hr />

                  <div className="p-5 flex justify-between text-2xl lg:text-xl">
                    <h2>Total Amount</h2>
                    <h2>₹{totalAmount + 40}</h2>
                  </div>

                  <div className="mt-5">
                    {curUser ? <Link href="/checkout/addresses"> <button className="bg-blue-400 text-white rounded p-5 text-xl w-full">
                      Place Order
                    </button> </Link>  : <Link href={{pathname: "/login", query: {reference : "thisisfromcart"}}}>
                    <button className="bg-blue-400 text-white text-xl rounded p-5 w-full">
                      Place Order
                    </button>
                    </Link>}
                  </div>
                </div>

                </div>
              )}
    </div>
     </div>
  );
}

export default Bag;
