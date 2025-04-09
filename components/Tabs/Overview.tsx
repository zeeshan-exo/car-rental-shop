import React from 'react'
import { Button } from '../ui/button'
import StatCard from '../StatCard'
import { Ticket } from 'lucide-react'

const Overview = () => {
  return (
   
    <div>
      <div  className='flex flex-row gap-6'>
           <StatCard
          title='Current Reservation'
          value="1"
          change='3'
          icon={<Ticket />}
          />
           <StatCard
          title='Boking Status'
          value="1"
          change='3'
          icon={<Ticket />}
          />
          <StatCard
          title='Current Reservation'
          value="1"
          change='3'
          icon={<Ticket />}
          />
           <StatCard
          title='Boking Status'
          value="1"
          change='3'
          icon={<Ticket />}
          />
          </div>
    </div>
  )
}

export default Overview