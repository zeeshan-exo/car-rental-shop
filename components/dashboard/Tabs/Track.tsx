"use client"
import React, { useState } from 'react'
import Map from '../../shared/Map'
import { MapProvider } from '@/provider/MapProvider'

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