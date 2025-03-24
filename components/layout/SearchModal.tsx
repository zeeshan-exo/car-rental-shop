"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
    defaultValue?: string
}

const SearchModal = ({defaultValue = "", isOpen, onClose}: SearchModalProps) => {
    const router = useRouter()

    const [inputValue, setValue] = useState(defaultValue)

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const inputValue = e.target.value

        setValue(inputValue)
    }

    const handleSearch =() =>{
        if(inputValue) return router.push(`/?q=${encodeURIComponent(inputValue)}`)
            onClose()

        if(!inputValue) return router.back()
    }

    const handleKeyPress = (e: {key: any}) => {
       if(e.key === "Enter") handleSearch()
    }

    if(!isOpen) return null
  return (
    <div className='min-h-screen flex items-center justify-between bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 z-50'>

        <Card >
            <CardHeader>
                <CardTitle>Search</CardTitle>
                <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
                <CardDescription>Search what you looking for.</CardDescription>
            </CardHeader>
            <CardContent>
                   
        <Input 
        type='search' 
        placeholder='search'
        value={inputValue || ""}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        autoFocus
        />
        <Button onClick={handleSearch}>
           <Search/>
        </Button>
            </CardContent>
        </Card>

    </div>
  )
}

export default SearchModal