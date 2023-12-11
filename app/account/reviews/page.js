"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import meninhoodie from "../../Images/meninhoodie.jpg";
import { dbfs } from "@/app/firebase";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import toast,{Toaster} from 'react-hot-toast'
import reviews from '../../Pictures/reviews.png'
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function MyReviews() {

  const router = useRouter()
  const [firebaseData, setFirebaseData] = useState([]);
  const [curUserUid, setCurUserUid] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurUserUid(user.uid);
          const db = dbfs.collection("Orders").doc(user.uid);
          db.collection("Reviews").onSnapshot((snapshot) => {
            const arr = [];
            snapshot.forEach((curReview) => {
              arr.push({
                curReview: curReview.data(),
              });
            });
            setFirebaseData(arr);
          });
      } else {
        setCurUserUid(null);
      }
    });
  }, []);

  useEffect(() => {

    if(curUserUid===null){
    router.push("/login")
  }

  }, [curUserUid])

  const shortentitle = (title, limit)=> {

    if(title?.length > limit){
      return title.slice(0, limit) + '...'
    }
    return title
  }

  const deleteReview = (uid, id)=> {

    const docRef =   dbfs.collection("Orders").doc(uid);
    docRef.collection("Reviews").doc(id).delete().then(() => {

      toast.success("Product Review Deleted.")

    }).catch((error) => {
          console.error(error)
    })

  }

  return (
    <div className="max-w-[700px] min-w-[600px] mx-auto p-5">

      <Toaster toastOptions={{duration:2000}}/>
      <h2 className="text-2xl lg:text-2xl font-semibold py-5 lg:py-0">
        My Reviews({firebaseData.length})
      </h2>

      {firebaseData.length !== 0
        ? firebaseData.map(({ curReview }, index) => {
            return (
              <div key={curReview.id} className="py-5 p-5"> 
                <div className="grid grid-cols-5 gap-3 pb-2">
                  <div>
                    <Image
                      src={curReview.imageurl}
                      width={400}
                      height={400}
                      className="w-[5rem] h-[5rem]" alt="product-image"
                    />
                  </div>
                  <div className="col-span-4">
                    <h1 className="text-[1rem] font-semibold">{shortentitle(curReview.producttitle, 30)}</h1>
                    <div className="flex gap-2 py-2">
                      <div className="bg-green-600 w-[30px] px-1 gap-1 rounded flex items-center text-white">
                        <h3 className="text-[1rem]">{curReview.rating}</h3>{" "}
                        <AiFillStar size={12} color="white" />
                      </div>
                      <h1 className="font-semibold text-gray-900 lg:text-[1rem] text-md">
                        {curReview.title}
                      </h1>
                    </div>
                    <p className="lg:text-[1rem] text-[1rem]">{curReview.description}</p>
                    <h4 className="text-[1rem] py-2 text-gray-600">
                      {curReview.name} | {curReview.date}
                    </h4>
                    <div className="flex gap-3 items-center">
                      <Link
                        href={`/review/reviewyourpurchases/${curReview.id}`}
                      >
                        <button className="text-blue-700 text-[1rem] font-semibold">
                          Edit
                        </button>
                      </Link>
                      <button className="text-blue-700 text-[1rem] font-semibold" onClick={()=> deleteReview(curReview.uid, curReview.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="border-[1px]"/>
              </div>
            );
          })
        :    <div className=''>
        <div className='flex flex-col h-[60vh] items-center gap-2 justify-center'>
          <Image className='w-[4rem]' src={reviews} width={400} height={400} alt="image"/>
          <h1 className='font-semibold text-xl lg:text-md'>You have no reviews</h1>
          <p className='text-md'>You can add review once you have ordered something.</p>
        </div>
       </div>}
    </div>
  );
}

export default MyReviews;
