import React from 'react'
import BioForm from '@/components/user/BioForm'
import Reports from '@/components/dashboard/Report'

const Page = () => {


  const content = () => {
    return (
      <div>
        <p>hi</p>
      </div>
    )
  }

  return (
    // <div><BioForm/></div>
    <>

  
    <Reports title="Traffic" description='Track Your Users activity.' content={content()}  />
    </>
  )
}

export default Page