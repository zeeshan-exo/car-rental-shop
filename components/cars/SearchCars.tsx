"use client"
import React, {useState, useEffect} from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuContent,  DropdownMenuGroup,  DropdownMenuItem, DropdownMenuSeparator ,DropdownMenuTrigger } from '../ui/dropdown-menu'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { getAllCars } from '@/actions/cars'
import TimePicker from 'react-time-picker'
import { CarType } from '@/lib/definations/carDefinations'
import { Icon, Search, ShieldAlert } from 'lucide-react'

const Time = [
  {value: "06:00 AM", label: "06:00 AM"},
  {value: "07:00 AM", label: "07:00 AM"},
  {value: "08:00 AM", label: "08:00 AM"},
  {value: "09:00 AM", label: "09:00 AM"},
  {value: "10:00 AM", label: "10:00 AM"},
  {value: "11:00 AM", label: "11:00 AM"},
  {value: "Noon", label: "Noon"},
  {value: "01:00 PM", label: "01:00 PM"},
  {value: "02:00 PM", label: "02:00 PM"},
  {value: "03:00 PM", label: "03:00 PM"},
  {value: "04:00 PM", label: "04:00 PM"},
  {value: "05:00 PM", label: "05:00 PM"},
  {value: "07:00 PM", label: "07:00 PM"},
  {value: "08:00 PM", label: "08:00 PM"},
  {value: "09:00 PM", label: "09:00 PM"},
  {value: "10:00 PM", label: "10:00 PM"},
  {value: "11:00 PM", label: "11:00 PM"},
]

const SearchCars = () => {
  const [carsData, setCarsData] = useState<CarType[]>([])
  const [city, setCity] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [dropTime, setDropTime] = useState("")

  useEffect(() => {
    const fetchCars = async () => {
      const {cars} = await getAllCars()
      console.log("Cars Data:", cars)
      setCarsData(cars)
    }
    fetchCars()
  }, [])

  const cities = [...new Set(carsData.map((car)=> car.city ))]
  return (
    <div className='w-full'>
        <div className='p-8 bg-AppPrimary text-AppLight'>
            <div>
                <h1 className='text-4xl font-bold mb-1'>Search for Cars</h1>
                <p className='text-2xl mb-4'>Find the best and affordable cars</p>
            </div>
            <div >
                <RadioGroup>
                  <div className='flex flex-wrap gap-4 mb-4'>
                  <div className='flex flex-row gap-2'>
                    <RadioGroupItem value="Within City" />
                    <Label>Within City</Label>
                  </div>
                  <div className='flex flex-row gap-2 '>
                    <RadioGroupItem value='Out of City' />
                    <Label>Out of City</Label>
                  </div>
                  </div>
                </RadioGroup>
                <hr></hr>
                <br></br>
                
            </div>
            <div>
              <div className='flex flex-row gap-2 justify-center '>
                <DropdownMenu >
                  <DropdownMenuTrigger asChild>
                  <Input type='text'
                   value={city}
                   className='bg-AppLight text-AppSecondary ' placeholder='select city'/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                  
                  align='center'
                  className='w-56'>
                    {cities.map((city)=> (
                      <DropdownMenuItem key={city} onSelect={()=> setCity(city)}>{city}</DropdownMenuItem>
                    ))}
                    
                  </DropdownMenuContent>
                </DropdownMenu>

                <Input type='date' 
                className='bg-AppLight text-AppSecondary ' placeholder='Pickup Date'/>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                     <Input type='text' 
                     value={pickupTime}
                     className='bg-AppLight text-AppSecondary w-56' 
                     placeholder='select time'/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                  side='top'
                  className='w-56'
                  >
                      {Time.map((time)=>(
                      <DropdownMenuItem key={time.value} onSelect={() => setPickupTime(time.value)}>{time.label}</DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Input type='date' className='bg-AppLight text-AppSecondary ' placeholder='Dropoff Date'/>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                     <Input type='text' 
                     value={dropTime}
                     className='bg-AppLight text-AppSecondary w-56' 
                     placeholder='Drop off Time'/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                   side='top'
                   align='center'
                   className=' overflow-y-auto w-56'
                  >
                      {Time.map((time)=>(
                      <DropdownMenuItem key={time.value} onSelect={() => setDropTime(time.value)}>{time.label}</DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                className='bg-AppAccent'>
                  <Search/>
                  Search
                </Button>

              </div>
            </div>
        </div>
        <div className='bg-AppLight mb-4 p-6 border border-gray-400'>
          {/* {checked && checked === ""} */}
          <div className=''>
              <div className='p-4'>
                <div className='mb-2 '>
                <h1 className='text-AppSecondary text-2xl flex items-center gap-2'> <ShieldAlert className='text-AppSecondary'/>Highlights for intracity</h1>
                </div>
                <ul className='text-AppDark list-disc'>
                  <li className=''>
                    <p><span className=''>Fuel and Charges: </span>Customers are responsible for fuel consumption, toll taxes, and parking fees. No fuel charges for pickup and drop-off within a 10 km range of the driver’s location; otherwise, fuel charges apply.</p>
                  </li>
                  <li><span>Rental Duration:</span> Vehicle use is limited to up to 12 hours or until 12 AM, whichever is less. For Karachi City, the duration is up to 10 hours and till 10 PM.</li>
                  <li>E-Challan: The chauffeur covers e-challan fees, but if the customer requests fast driving leading to a violation, the customer will be responsible for the e-challan.</li>
                  <li>Bookme holds the right to offboard the customer for unethical or social unacceptable behaviour without any refund.</li>
                </ul>
              </div>

          </div>
        </div>
    </div>
  )
}

export default SearchCars