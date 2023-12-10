"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { dbfs } from "../../firebase";
import { Button } from 'flowbite-react';
import { collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { Select, Option } from "@material-tailwind/react";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/app/modal";
import toast,{Toaster} from "react-hot-toast";

function page() {
  const router = useRouter()
  const [firebaseData, setFirebaseData] = useState([]);
  const [totalProducts, setTotalProducts]= useState("")
  const [lastVisible, setLastVisible] = useState(null)
  const [category, setCategory] = useState("")
  const [loaderEnable, setLoaderEnable]= useState(true)
  const [showModal, setShowModal] = useState(false)
  const [credentials, setCredentials] = useState({})

  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const getDataChild = (showModal)=> {
    setShowModal(showModal)
  }

  useEffect(() => {

    FetchData()

    const f = async()=> {
      const productsCollection = collection(dbfs, 'AllProducts');
      const querySnapshot = await getDocs(productsCollection);
      const totalProducts = querySnapshot.size;
      setTotalProducts(totalProducts)
    }
    f()
  }, []);

    const FetchData = async() => {

    try{
         
        let query = dbfs.collection("AllProducts");

        if(lastVisible){

          query = query.startAfter(lastVisible);

        }

        const snapshot =  query.limit(5).onSnapshot((snapshot) => {
          const arr = []
          snapshot.forEach((cur) => {
              setFirebaseData((p)=> [...p, cur.data()])
              setLoaderEnable(false)
             })
       

        if(snapshot.docs.length > 0){
          setLastVisible(snapshot.docs[snapshot.docs.length - 1])
        }else{
          setLastVisible(null)
        } });


        return snapshot;
      }catch(error){
      }
    }

    const LoadMore = async()=> {

      const un  = await FetchData()
    }



    const editProduct = (i, id) => {

      router.push("/admin/catalogue/updateproduct")
    

    }

    const deleteProduct = (id, collectionName) => {
 
      setShowModal(true)
      setCredentials({id: id, colName: collectionName})

    }


    // getting the data according to the category filter
    const getData = (e) =>{

      const cat = e.target.value
  

      try{
        const docRef = dbfs.collection("Products").doc('NILXeILBXJS2tULfuNSR').collection(cat);
        const snapshot = docRef.onSnapshot((snapshot) => {

          const arr = []
          snapshot.forEach((cur) => {
            arr.push(cur.data())
          })
          setFirebaseData(arr)
        })

        return () => {
          snapshot()
        }
      }catch(error){
        console.error(error)
      }
    }

  
  return (
    <div>
      <div>
        <div className="w-[100%] caret-transparent pt-5 shadow bg-bgback">
          <div className="lg:max-w-[970px] min-w-[400px] p-5 mx-auto text-black select-none">
            {firebaseData.length !== 0 ? <div className="">
             <div className="flex items-center justify-between pb-5">
              <h1 className="text-xl font-bold">
                <span className="text-gray-400 font-semibold">
                  {totalProducts} Products
                </span>
              </h1>
              <select
              onChange={getData} 
              name="category"
              className="custom-select border-solid w-[150px] border-gray-500 border-[1px] rounded p-2 outline-none"

            >
              <option value="">Category</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Jacket">Jacket</option>
              <option value="Jeans">Jeans</option>
              <option value="Shirts">Shirt</option>
              <option value="Shoes">Shoes</option>
              <option value="Sunglasses">Sunglass</option>
              <option value="Sweater">Sweater</option>
              <option value="Tshirts">Tshirt</option>
              <option value="watch">Watch</option>
            </select>
             
             
            </div>
              <div class="flex flex-col overflow-x-auto">
                <div class="sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-left text-sm font-light">
                        <thead class="border-b text-gray-600 font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" class="px-6 py-4">
                              #
                            </th>
                          
                            <th scope="col" class="px-6 py-4">
                              Name
                            </th>
                            <th scope="col" class="px-6 py-4">
                              Price
                            </th>
                            <th scope="col" class="px-6 py-4">
                              Stock
                            </th>
                            <th scope="col" class="px-6 py-4">
                              Date
                            </th>
                            <th scope="col" class="px-6 py-4">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {firebaseData.length !== 0
                            ? firebaseData.map((curOrders, index) => {
                             
                                return (
                                 
                                  <tr class="border-b dark:border-neutral-500" key={index}>
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">
                                      {index ? index +1 : 1}
                                    </td>

                                    <td class="whitespace-nowrap px-6 py-5 flex items-center">
                                      <Image
                                       objectFit="center"
                                       objectPosition="contain"
                                        className="w-[40px] h-[40px]" alt="image"
                                        src={
                                          curOrders &&
                                          curOrders.images &&
                                          curOrders.images[0]
                                        }
                                        width={100}
                                        height={100}
                                      />
                                      {curOrders.title}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                    ₹ {curOrders.discountedprice} /-
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                     In Stock
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                      21 November 2023
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 gap-4 flex items-center">
                                    <Link href={{pathname:'/admin/catalogue/updateproduct', query: {pid: curOrders.id}}}><MdOutlineModeEdit className="cursor-pointer" onClick={() => editProduct()} size={25} color="green"/></Link> 

                                    <MdOutlineDelete size={25} color="red" className="cursor-pointer" onClick={() => deleteProduct(curOrders.id, curOrders?.colletionN)}/>
                                    </td>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            <div className="flex overflow-x-auto sm:justify-center pt-5">
            <Button size="sm" className="rounded bg-black" onClick={LoadMore}>Load More</Button>
            </div>
            </div> : <div className="flex flex-col justify-center items-center h-[90vh]">
     <PulseLoader
              color="#FF3F6C"
              loading={loaderEnable}
              cssOverride={CSSProperties}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
         <h1 className="text-pink-400 font-semibold text-xl">Getting Data...</h1>   
     </div>}
     {
               showModal ? <Modal onChildData={getDataChild} credentials={credentials}/> : null
            }
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
