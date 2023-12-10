
"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

function layout({children}) {

  const [active, setActive] = useState("")

  useEffect(() => {
    const activemenu = localStorage.getItem("ordertab");
    if(activemenu){
    setActive(JSON.parse(activemenu))
    }

  }, [])

  const handleClick = (menu)=> {

    setActive(menu)
    localStorage.setItem("ordertab", JSON.stringify(menu))
  }

  return (
    <div className='select-none'>
      <div className='pt-10'>
                <ul className="flex gap-5">
                  <li>
                    <Link onClick={() => {handleClick("All Orders")}}
                      href="/admin/orders/allorders"
                      className={`font-semibold p-2 hover:text-blue-500 hover:border-b-2 hover:border-solid hover:border-blue-500 ${active === "All Orders" ? "text-blue-500 border-b-2 border-solid border-blue-500 bg-blue-50" : null}`}
                    >
                      All Orders
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => {handleClick("Completed")}} href="/admin/orders/completed" className={`font-semibold p-2 hover:text-blue-600 hover:border-b-2 hover:border-solid hover:border-blue-500 ${active === "Completed" ? "text-blue-500 border-b-2 border-solid border-blue-500 bg-blue-50" : null}`}>
                      Completed
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => {handleClick("Pending")}} href="/admin/orders/pending" className={`font-semibold p-2 hover:text-blue-500 hover:border-b-2 hover:border-solid hover:border-blue-500 ${active === "Pending" ? "text-blue-500 border-b-2 border-solid border-blue-500 bg-blue-50" : null}`}>
                      Pending
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => {handleClick("Cancel")}} href="/admin/orders/cancel" className={`font-semibold p-2 hover:text-blue-500 hover:border-b-2 hover:border-solid hover:border-blue-500 ${active === "Cancel" ? "text-blue-500 border-b-2 border-solid border-blue-500 bg-blue-50" : null}`}>
                      Cancel
                    </Link>
                  </li>
                </ul>
              </div>
      {children}
    </div>
  )
}

export default layout
