import React from 'react'

async function page({params}) {
     const departmentId = (await params).editeid;
   
  return (
    <div>page</div>
  )
}

export default page