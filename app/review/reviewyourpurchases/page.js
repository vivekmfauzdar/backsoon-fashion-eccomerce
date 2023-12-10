import React from 'react'
import { redirect } from 'next/navigation'

function page() {

  redirect("/")
  return (
    <div>
       <h1>this is review page</h1>
    </div>
  )
}

export default page
