"use client"
import SearchModal from '@/components/layout/SearchModal'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const page = () => {
    const[isSearchOpen, setIsOpen] = useState(true)
    const searchParams = useSearchParams()

    const searchQuery = searchParams && searchParams.get("q")

    
  return (
    <div>
        <p>Hey</p>
        <SearchModal/>
    </div>
  )
}

export default page
