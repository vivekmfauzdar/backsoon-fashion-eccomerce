
"use client"

import React from 'react'
import { useSearchParams, usePathname } from 'next/navigation'

function Product() {
  

    const search = usePathname()
    console.log("this is " ,search)
    return (
    <div>
       <h1>This is product page.</h1>
    </div>
  )
}

export default Product
