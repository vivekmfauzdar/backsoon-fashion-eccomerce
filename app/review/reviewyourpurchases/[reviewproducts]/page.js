"use client";

import React, { useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getAuth } from "firebase/auth";
import { dbfs } from "@/app/firebase";
import { Toaster, toast } from "react-hot-toast";
import { collection, onSnapshot, query, where } from "firebase/firestore";

function Reviewproducts() {
  const [rated, setRated] = React.useState(4);
  const [formErr, setFormErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [orders, setOrders] = useState([]);
  const [curUserUid, setCurUserUid] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const search = usePathname();
  const id = search.split("/").at(3);

  console.log(id)

  const getText = (rated) => {
    const textOptions = {
      1: { text: "Useless", color: "red-500" },
      2: { text: "Poor", color: "orange-500" },
      3: { text: "Ok", color: "green-500" },
      4: { text: "Good", color: "green-500" },
      5: { text: "Excellent", color: "green-500" },
    };
    return textOptions[rated] || { text: "Excellent", color: "green-500" };
  };

  useEffect(() => {
    const auth = getAuth();
    const curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurUserUid(user.uid);
        try{
        const q = query(
          collection(dbfs, "Orders", user.uid, "products"),
          where("id", "==", id)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setOrders(doc.data());
          });
        });
      }catch(error){
        console.error(error)
      }
    } else {
        setCurUserUid(null);
      }
    });
  }, [id]);

  useEffect(() => {
    const fetchReviews = () => {
      if (curUserUid) {
        try {
          const data = dbfs
            .collection("Orders")
            .doc(curUserUid)
            .collection("Reviews")
            .where("id", "==", id);

          data.onSnapshot((snapshot) => {
            snapshot.forEach((cur) => {
              setData({
                title: cur.get("title"),
                description: cur.get("description"),
                rating: cur.get("rating"),
              });
            });
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchReviews();
  }, [id, curUserUid]);

  const { text, color } = getText(rated);

  const gettingInputs = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitReview = (e) => {

    e.preventDefault()

    const fullRatingDetails = {
      ...data,
      rating: rated,
      name: orders.userInfo.name,
      id: id,
      producttitle: orders.title,
      imageurl: orders.images,
      uid: curUserUid,
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    console.log(fullRatingDetails)

    if (data.title !== "" && data.description !== "") {
      const reviewCollection = dbfs
        .collection("Orders")
        .doc(curUserUid)
        .collection("Reviews");
      reviewCollection
        .doc(id)
        .set(fullRatingDetails)
        .then(() => {
          toast.success(
            "Thank You for your Review. Your Review has been Saved."
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error(
        "Required data fields are missing. Unable to set the document."
      );
    }

  };


  return (
    <div className="max-w-[970px] min-w-[600px] mx-auto py-10 p-5 select-none">
      <Toaster toastOptions={{ duration: 2000 }} />
      <h1 className="font-semibold lg:text-xl text-2xl">Rate this Product</h1>
      <div className="py-5">
        <div className="flex gap-5 shadow justify-between rounded p-5">
          {orders.length !== 0 ? (
            <div className="flex gap-2">
              <div>
                <Image
                  className="w-[80px] h-[80px] bg-cover"
                  src={orders.images}
                  width={200}
                  height={200}
                  alt="product-image"
                />
              </div>

              <div>
                <h1 className="text-base font-semibold">{orders.title}</h1>
                <h2 className="text-sm font-semibold">₹ {orders.rightprice}</h2>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-2 font-bold text-blue-gray-500 pt-5 caret-transparent">
        <Rating value={4} name="rating" onChange={(value) => setRated(value)} />
        <h1 className={`font-semibold text-${color}`}>{text}</h1>
      </div>

     <form action="" onSubmit={submitReview}>
      <div className="flex flex-col gap-3 py-5">
        <label htmlFor="title" className="font-semibold">
          Review Title
        </label>
        <input
          className="outline-none p-5 border-[1px] border-solid border-black rounded"
          name="title"
          type="text"
          placeholder="Example: Easy to Use"
          onChange={gettingInputs} required
          value={data.title}
        />
      </div>

      <div className="flex flex-col gap-3 pb-5">
        <label htmlFor="description" className="font-semibold">
          Description (Some lines about product)
        </label>
        <textarea
          name="description"
          className="border-[1px] rounded bordere-solid border-black p-5 outline-none"
          id=""
          cols="10"
          placeholder="Write something about product"
          rows="5"
          value={data.description} required
          onChange={gettingInputs}
        ></textarea>
      </div>

      <div>
        <button type="submit"
          className="bg-pink-400 text-white rounded w-full p-3"
        >
          Submit Review
        </button>
      </div>
      </form>
    </div>
  );
}

export default Reviewproducts;
