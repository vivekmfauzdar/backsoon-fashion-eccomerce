"use client";

import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { dbfs } from "./firebase";
import { Toaster, toast } from "react-hot-toast";
import { Input } from "@material-tailwind/react";

function Newaddaccount({ curUserId, cancelBtn }) {
  const uuid = v4();
  const [id, setId] = useState("");
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
    setId(uuid);

    setData((prev) => {
      return {
        ...prev,
        id: uuid,
      };
    });
  }, []);

  const gettingDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const saveData = () => {
    setFormErr(validation(data));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErr).length === 0 && isSubmit) {
      dbfs
        .collection("Orders")
        .doc(curUserId)
        .collection("addresses")
        .doc(id)
        .set(data)
        .then(() => {
          cancelBtn(false);
          toast.success("Address Added");
        });
    }
  }, [formErr]);

  // handling the errors in the form
  const validation = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is Required!";
    }

    if (!values.phoneno) {
      errors.phoneno = "Phone No is Required!";
    }

    if (!values.address) {
      errors.address = "Address is Required!";
    }

    if (!values.locality) {
      errors.locality = "Locality is Required!";
    }

    if (!values.pincode) {
      errors.pincode = "Pincode is Required!";
    }

    if (!values.city) {
      errors.city = "City is Required!";
    }

    if (!values.state) {
      errors.state = "State is Required!";
    }

    return errors;
  };

  const cnclBtn = () => {
    cancelBtn(false);
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 2000 }} />
      <div className="flex gap-3 p-4">
        <input type="radio" className="accent-red-400" name="address" />
        <h1 className="font-semibold py-4">ADD NEW ADDRESS</h1>
      </div>

      <div className="col-span-2 flex flex-col gap-3 border-[1px] border-solid rounded p-5">
        <h1 className="py-3">Contact Details</h1>

        <div className="flex flex-col gap-3">
          <Input
            size="sm"
            name="name"
            className="broder-[2px]"
            value={data.name}
            label="Name*"
            onChange={gettingDetails}
          />
          <span className="text-red-500 text-[12px]">{formErr.name} </span>

          <Input
            size="sm"
            name="phoneno"
            className="broder-[2px]"
            value={data.phoneno}
            label="Mobile No*"
            onChange={gettingDetails}
          />
          <span className="text-red-500 text-[12px]">{formErr.phoneno} </span>

          <h1 className="py-3">Address</h1>

          <Input
            size="sm"
            name="address"
            className="broder-[2px]"
            value={data.address}
            label="Address(House no., Building, Street)*"
            onChange={gettingDetails}
          />
          <span className="text-red-500 text-[12px]">{formErr.address} </span>

          <Input
            size="sm"
            name="locality"
            className="broder-[2px]"
            value={data.locality}
            label="Locality/Town*"
            onChange={gettingDetails}
          />
          <span className="text-red-500 text-[12px]">{formErr.locality} </span>

          <Input
            size="sm"
            name="pincode"
            className="broder-[2px]"
            value={data.pincode}
            label="Pincode*"
            onChange={gettingDetails}
          />
          <span className="text-red-500 text-[12px]">{formErr.pincode} </span>

          <Input
            size="sm"
            name="city"
            className="broder-[2px]"
            value={data.city}
            label="City/District*"
            onChange={gettingDetails}
          />
          <span className="text-red-500 text-[12px]">{formErr.city} </span>

          <Input
            size="sm"
            name="state"
            className="broder-[2px]"
            value={data.state}
            label="State*"
            onChange={gettingDetails}
          />
          <span className="text-red-500 text-[12px]">{formErr.state} </span>

          <Input
            size="sm"
            name="landmark"
            className="broder-[2px]"
            value={data.landmark}
            label="Landmark"
            onChange={gettingDetails}
          />
          <span className="text-red-500 text-[12px]">{formErr.landmark} </span>

          <Input
            size="sm"
            name="alternatemobile"
            className="broder-[2px]"
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
        </div>

        <div className="flex gap-3 items-center">
          <button className="bg-red-400 text-white p-2 mt-3" onClick={saveData}>
            Save & Deliver Here
          </button>

          <button
            className="text-white p-2 mt-3 bg-blue-500"
            onClick={() => cnclBtn()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newaddaccount;
