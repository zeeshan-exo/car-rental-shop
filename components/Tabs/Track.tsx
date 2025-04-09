"use client"
import React, { useState } from 'react'
import Map from '../Map'
import { MapProvider } from '@/provider/map-provider'

const Track = () => {
  return (
    <div>
      <div>
        <p className='text-AppLight'>Track your vehicle location</p>
      </div>
        <div>
            <MapProvider>
                <Map/>
            </MapProvider>
        </div>
    </div>
  )
}

export default Track