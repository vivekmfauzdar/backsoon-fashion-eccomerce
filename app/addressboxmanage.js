"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { dbfs } from "./firebase";
import { v4 } from "uuid";
import { Toaster, toast } from "react-hot-toast";

function Addressboxmanage({
  curUser,
  index,
  sendingInputData,
  sendingChildData,
}) {
  const {
    name,
    phoneno,
    address,
    city,
    locality,
    addresstype,
    landmark,
    pincode,
    state,
    alternatemobile,
    id,
  } = sendingInputData;

  const [data, setData] = useState({
    name: "",
    phoneno: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatemobile: "",
    addresstype: "",
    id: "",
  });

  const [formErr, setFormErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (sendingInputData) {
      setData({
        name: name,
        phoneno: phoneno,
        pincode: pincode,
        locality: locality,
        address: address,
        city: city,
        state: state,
        landmark: landmark,
        alternatemobile: alternatemobile,
        addresstype: addresstype,
        id: id,
      });
    }
  }, [sendingInputData]);

  const saveData = () => {
    setFormErr(validation(data));
    setIsSubmit(true);
  };

  const gettingDetails = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(formErr).length === 0 && isSubmit) {
      dbfs
        .collection("Orders")
        .doc(curUser)
        .collection("addresses")
        .doc(id)
        .update(data)
        .then(() => {
          sendingChildData({ open: false, i: index });
          toast.success("Adress Updated");
        });
    }
  }, [formErr]);

  const cancelBtn = (index) => {
    sendingChildData({ open: false, i: index });
  };

  // error handling
  const validation = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required!";
    }

    if (!values.phoneno) {
      errors.phoneno = "Mobile No. is required!";
    }

    if (!values.address) {
      errors.address = "Address is required!";
    }

    if (!values.locality) {
      errors.locality = "Locality is required!";
    }

    if (!values.pincode) {
      errors.pincode = "Pin Code is Required!";
    }

    if (!values.city) {
      errors.city = "City is Required";
    }

    if (!values.state) {
      errors.state = "State is Required";
    }

    if (!values.addresstype) {
      errors.addresstype = "Address Type Selection is required!";
    }

    return errors;
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 2000 }} />
      <div className="col-span-2 flex flex-col gap-3 border-[1px] border-solid rounded p-5">
        <h1 className="py-3">Contact Details</h1>

        {
          <div className="flex flex-col gap-3">
            <Input
              size="md"
              name="name"
              className="border-[2px]"
              value={data.name}
              label="Name*"
              onChange={gettingDetails}
            />
            <span className="text-red-500 text-[12px]">{formErr.name} </span>

            <Input
              size="md"
              name="phoneno"
              type="number"
              className="border-[2px]"
              value={data.phoneno}
              label="Mobile No*"
              onChange={gettingDetails}
            />
            <span className="text-red-500 text-[12px]">{formErr.phoneno} </span>

            <h1 className="py-3">Address</h1>

            <Input
              size="md"
              name="address"
              className="border-[2px]"
              value={data.address}
              label="Address(House no., Building, Street)*"
              onChange={gettingDetails}
            />
            <span className="text-red-500 text-[12px]">{formErr.address} </span>

            <Input
              size="md"
              name="locality"
              className="border-[2px]"
              value={data.locality}
              label="Locality/Town*"
              onChange={gettingDetails}
            />
            <span className="text-red-500 text-[12px]">
              {formErr.locality}{" "}
            </span>

            <Input
              size="md"
              name="pincode"
              className="border-[2px]"
              value={data.pincode}
              label="Pincode*"
              onChange={gettingDetails}
            />
            <span className="text-red-500 text-[12px]">{formErr.pincode} </span>

            <Input
              size="md"
              name="city"
              className="border-[2px]"
              value={data.city}
              label="City/District*"
              onChange={gettingDetails}
            />
            <span className="text-red-500 text-[12px]">{formErr.city} </span>

            <Input
              size="md"
              name="state"
              className="border-[2px]"
              value={data.state}
              label="State*"
              onChange={gettingDetails}
            />
            <span className="text-red-500 text-[12px]">{formErr.state} </span>

            <Input
              size="md"
              name="landmark"
              className="border-[2px]"
              value={data.landmark}
              label="Landmark"
              onChange={gettingDetails}
            />

            <Input
              size="md"
              name="alternatemobile"
              type="number"
              className="border-[2px]"
              value={data.alternatemobile}
              label="Aleternate Mobile(Optional)"
              onChange={gettingDetails}
            />

            <div className="mt-5">
              <h1>Address Type</h1>
              <div
                className="grid grid-cols-2 buttons"
                role="group"
                onChange={gettingDetails}
              >
                <input
                  label="Home"
                  type="radio"
                  name="addresstype"
                  value="Home"
                />
                <input
                  label="Work"
                  type="radio"
                  name="addresstype"
                  value="Work"
                />
              </div>
            </div>
            <span className="text-red-500 text-[12px]">
              {formErr.addresstype}{" "}
            </span>
          </div>
        }

        <div className="flex gap-3 items-center">
          <button className="bg-green-400 rounded text-white p-2 mt-3" onClick={saveData}>
            Save & Deliver Here
          </button>

          <button
            className="text-white rounded p-2 mt-3 bg-blue-500"
            onClick={() => cancelBtn(index)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addressboxmanage;
