import React from 'react'
import { redirect } from 'next/navigation'


function page() {

  redirect("/admin/orders/allorders")
  return (
    <div>
      
    </div>
  )
}

export default page;
