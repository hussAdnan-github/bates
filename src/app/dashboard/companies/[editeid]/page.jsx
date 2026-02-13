import React from 'react'

async function page({params}) {
     const companyId = (await params).editeid;
   
  return (
    <div>page</div>
  )
}

export default page