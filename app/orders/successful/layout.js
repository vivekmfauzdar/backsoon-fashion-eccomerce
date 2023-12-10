import React from 'react'
import Navigation from '../../navigation'
import Footer from '../../footer'

function layout({children}) {

  return (
    <>
    <div className='max-w-[1270px] min-w-[600px]'>
    <Navigation />
      {children}
     <Footer /> 
     </div>
    </>
  )
}

export default layout
