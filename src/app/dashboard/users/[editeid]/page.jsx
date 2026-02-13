import React from 'react'

async function page({params}) {
     const userId = (await params).editeid;
   
  return (
    <div>page</div>
  )
}

export default page