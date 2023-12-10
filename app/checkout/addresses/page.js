"use client";

import React, { useEffect, useState } from "react";
import { dbfs } from "../../firebase";
import { Input } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import {toast, Toaster} from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import Addressbox from "@/app/addressbox";
import Newaddress from "@/app/newaddress";

function Addresses() {


  const router = useRouter()
  const [addressData, setAddressData] = useState([])
  const [curUserId, setCurUserUid] = useState("")
  const [open, setOpen] = useState(false)
  const [btnopen, setBtnOpen] = useState(false)
  const [index, setIndex] = useState('')
  const [btnindex, setBtnIndex] = useState('')
  const[newAddBtn, setNewAddBtn] = useState(false)
  const [cartData, setCartData] = useState([])
  const [data, setData] = useState({
    name: "",
    phoneno:"",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatemobile: "",
    addresstype: "",
  });


  // const gettingChildData = (childData) => {

  //   setOpen(childData.open)
  //   setIndex(childData.ival)

  // }

  // const gettingNewAddData = (childData) => {


  //    setNewAddBtn(childData)

  // }


  // getting the current user
  useEffect(()=> {
    const auth = getAuth()
   
    let curUser = auth.onAuthStateChanged((user)=> {
   
      if(user){
   
         setCurUserUid(user.uid)
         
      }
      else{
        setCurUserUid(null)
        router.push("/login")
   
      }
    })
    }, [])


    useEffect(() => {

      if(curUserId){

          try{

          const colRef = dbfs.collection("Orders").doc(curUserId);
          colRef.collection("addresses").onSnapshot((snapshot) => {

            const arr = []
            snapshot.forEach((curData) => {

              arr.push({
                curElm: curData.data()
              })
            })
            setAddressData(arr)

          })
        }catch(error){
          console.error(error)
        }


      }


    }, [curUserId])


  const gettingDetails = (e) => {

    // const name = e.target.name;
    // const value = e.target.value;

    // setData((prev) => {
    //   return { ...prev, [name]: value };
    // });
 
  };

  //getting the cart item details
  // useEffect(() => {

  //     const cartData = localStorage.getItem("cartData");
  //     if(cartData){
  //       setCartData(JSON.parse(cartData))
  //     }

  // }, [])


  // const saveData = () => {

  //   try{
  //   const ref = dbfs.collection("Orders").doc(curUserId).collection("addresses").add(data)
  //  .then((docRef) => {
           
  //   toast.success("Address Added!!")
  //  });
  // }catch(error){
  //   console.error(error)
  // }

  // };

  // const placeOrder = ()=> {

  //   router.push("/checkout/payments")
  // }

  // const openClose = (index) => {

        //  setOpen(true)
        //  setIndex(index)
        
  // }

  // const getButtons = (index, curElm ) => {

    // setBtnOpen(true)
    // setBtnIndex(index)
    // const obj = {name : curElm.name, phone: curElm.phoneno, address: curElm.address, city : curElm.city,landmark : curElm.landmark, locality : curElm.locality, pincode : curElm.pincode,state : curElm.state, alternatemobile :curElm.alternatemobile, addresstype : curElm.addresstype}
    // localStorage.setItem("Selected Address", JSON.stringify(obj))

  // }

  // const newAddress = () => {

      //  setNewAddBtn(true)

  // }

  // const removeAddress = (index) => {

  //   try{
  //    const docRef = dbfs.collection("Orders").doc(curUserId);
  //   docRef.collection("addresses").doc(index).delete().then(() => {

  //     toast.success("Address Removed");

  //   }).catch((error) => {

  //     console.error(error)
  //   })
  // }catch(error){
  //   console.error(error)
  // }

  // }

  // const totalAmount = cartData?.reduce((accumulator, currenValue) => {
  //   return accumulator + currenValue.productprice;
  // }, 0);

  return (
    <div className="max-w-[900px] min-w-[600px] grid lg:grid-cols-3 grid-cols-1 p-5 gap-4 mx-auto py-10 ">

    <Toaster toastOptions={{duration:2000}}/>
      <div className="col-span-2 hidden  flex-col gap-3 border-[1px] border-solid rounded p-5">
        <h2 className="text-xl font-semibold">Manage Address</h2>

        <h1 className="py-3">Contact Details</h1>
        <Input
          size="md" name="name"
          className="broder-[2px]"
          label="Name*"
          onChange={gettingDetails}
        />

        <Input
          size="md" name="phoneno"
          className="broder-[2px]"
          label="Mobile No*"
          onChange={gettingDetails}
        />

        <h1 className="py-3">Address</h1>

        <Input
          size="md" name="address"
          className="broder-[2px]"
          label="Address(House no., Building, Street)*"
          onChange={gettingDetails}
        />

        <Input
          size="md" name="locality"
          className="broder-[2px]"
          label="Locality/Town*"
          onChange={gettingDetails}
        />
       
        <Input
          size="md" name="pincode"
          className="broder-[2px]"
          label="Pincode*"
          onChange={gettingDetails}
        />

        <Input
          size="md" name="city"
          className="broder-[2px]"
          label="City/District*"
          onChange={gettingDetails}
        />

        <Input
          size="md" name="state"
          className="broder-[2px]"
          label="State*"
          onChange={gettingDetails}
        />
       
        <Input
          size="md" name="landmark"
          className="broder-[2px]"
          label="Landmark"
          onChange={gettingDetails}
        />

        <Input
          size="md" name="alternatemobile"
          className="broder-[2px]"
          label="Aleternate Mobile(Optional)"
          onChange={gettingDetails}
        />

        <div className="mt-5">
          <h1>Address Type*</h1>
          <div
            className="grid grid-cols-2 buttons"
            role="group"
            onChange={gettingDetails}
          >
            <input label="Home" type="radio" name="addresstype" value="Home" />
            <input label="Work" type="radio" name="addresstype" value="Work" />
          </div>
        </div>

        <button
          className="bg-red-400 text-white w-full p-2 mt-3 rounded"
          // onClick={saveData}
        >
          Save
        </button>
      </div>


      <div className="col-span-2">
       
       <h1 className="text-xl font-semibold">Select Delivery Address</h1>

      { addressData.length !== 0 ?
        addressData.map(({curElm}, i) => {

        return(
         <div key={i}>
  
          <div  className={`shadow-lg rounded-lg p-4`}>
         
        <div className={`${index === i && open ? "hidden" : "flex"}`}>
        <div>
         <div className={`flex gap-3`} role="group"> 
            <input type="radio" className= "accent-red-400" name="address"/>
            <h1 className="font-semibold">{curElm?.name}</h1>
            <span className="border-[1px] p-1 rounded border-green-500 text-green-500 text-[12px]">Home</span>
         </div>

         <div className="py-2">
            <p className="text-[14px]">{`${curElm?.address}, ${curElm?.city}, ${curElm?.landmark}, ${curElm?.locality}, ${curElm?.pincode}`}</p>
         </div>

         <div>
            <h1 className="text-[14px]">Mobile: {curElm?.phoneno}</h1>
         </div>

         <div>
           <Button size="md" variant="outlined">Edit</Button>
           <Button size="md" variant="outlined" >Remove</Button>
         </div>

          </div> 

          </div>
          {/* {
             index === i && open ? <Addressbox curUser={curUserId} index = {i} sendingInputData={curElm}  sendDatatoChild={gettingChildData} /> : null
          } */}
          </div>
          </div>
        )

        }) : null

      }
      

       <div className=" border-[1px] border-gray-300 border-solid rounded mt-3">

        {/* {
           newAddBtn ? <Newaddress curUserId={curUserId} cancelBtn={gettingNewAddData}/> :  <h1 className="text-pink-400 font-semibold p-4 cursor-pointer" onClick={newAddress}>+ Add New Address</h1>

        } */}
       </div>

      </div>

     {cartData.length !== 0 && <div>
        <div className="shadow p-5">
          <div className="p-5">
            <h1 className="font-semibold">Price Details</h1>
          </div>
          <hr />

          <div className="p-5">
            <div className="flex justify-between">
              <h2>Price ({cartData.length})</h2>
              {/* <h2>₹ {totalAmount}</h2> */}
            </div>

            <div className="flex justify-between pt-5">
              <h2>Delivery Charges</h2>
              <h2>₹40</h2>
            </div>
          </div>

          <hr />

          <div className="p-5 flex justify-between">
            <h2>Total Amount</h2>
            {/* <h2>₹ {totalAmount + 40}</h2> */}
          </div>

          <div className={`${btnopen ? "flex" : "hidden"} mt-3`}>
            <button className={`bg-blue-400 text-white rounded p-2 w-full`}>
              Continue
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Addresses;
