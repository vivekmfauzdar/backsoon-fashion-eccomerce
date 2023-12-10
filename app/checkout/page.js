
import React from 'react'
import { redirect } from 'next/navigation'

function Chcekout() {

  redirect("/checkout/cart")
 
  return (
    <div>
       <h1>this is checkout pgae.</h1>
    </div>
  )
}

export default Chcekout
