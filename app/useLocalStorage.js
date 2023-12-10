
"use client"

import React, { useEffect, useState } from 'react'

function useLocalStorage(key) {
  
  const [data, setData] = useState([])

  useEffect(() => {

    const updateCart = () => {

    const data = localStorage.getItem("cartData");
    if(data)
    {
       setData(JSON.parse(data.length))     
    }
  }

  updateCart()

  return data;

  }, [key])
  

  return (
    <div>
      
    </div>
  )
}

export default useLocalStorage
