import React from 'react'


interface CardProps{
    title:string,
    value: string,
    change:string
}
const StatCard = ({title, value, change}: CardProps) => {
  return (
    <div className='md:border-r md:border-gray-400 p-2'> 
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <div>
            <p className='text-xl font-semibold'>{value}</p>
            <p><span className='text-green-700 text-xl'>{change}</span>from last week</p>
        </div>
    </div>
  )
}

export default StatCard