"use client"

import React from 'react'
import Navigation from '../navigation'
import Footer from '../footer'
import { useSelector } from 'react-redux'

function layout({children}) {

  const data = useSelector(((cur) => cur.cartData))


  return (
    <>
    <div className='max-w-[1270px] min-w-[600px] mx-auto'>
    <Navigation cartd={data.length}/>
      {children}
     <Footer /> 
     </div>
    </>
  )
}

export default layout
