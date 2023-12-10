
"use client"

import React from 'react'
import { Input } from "@material-tailwind/react";


function Newone() {
  

    const gettingDetails = () => {


    }

    const saveData = () => {

    }

    return (
    <div className='max-w-[600px] min-w-[600px] mx-auto py-[50px]'>

<div className="col-span-2 flex flex-col gap-3 border-[1px] border-solid rounded p-5">
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
          onClick={saveData}
        >
          Save
        </button>
      </div>
      
    </div>
  )
}

export default Newone
