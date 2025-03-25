"use client"
import SearchModal from '@/components/layout/SearchModal'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const page = () => {
    const[isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()

    const handleOpenModal = () =>{
      setIsOpen(true)
    }

    const handleOnCLose =() =>{
      setIsOpen(false)
    }

    const searchQuery = searchParams && searchParams.get("q")

    
  return (
    <div>
        <Button
        variant="outline"
        onClick={handleOpenModal}
        >
         <Search/>
        </Button>
        <SearchModal
        isOpen={isOpen}
        onClose={handleOnCLose}
        defaultValue={searchQuery}
        />
    </div>
  )
}

export default page
