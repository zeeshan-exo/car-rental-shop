import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface CarItems {
   title: string,
   count: number,
   description: string,
   buttonText?: string,
   icon?: React.ReactNode
   iconBgColor?: string
   borderColor?:string
   onButtonClick?: () => void
}


const StatusCards: React.FC<CarItems> = ({title,count, description, icon, buttonText, iconBgColor, borderColor}) => {
  return (
    <Card className={`bg-AppLight rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border-l-4 ${borderColor}`}>
        <CardHeader>
            <div className='flex justify-between'>
               <CardTitle>{title}</CardTitle>
               <CardDescription>
                <div className={`h-12 w-12 rounded-full ${iconBgColor} flex items-center justify-center`}>
                    {icon}
                </div>
               </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
        <div>
          <p className="text-3xl font-bold text-AppSecondary">{count}</p>
          <p className="text-gray-500 text-sm mt-1"> {description}</p>
          {buttonText &&
             <Button 
             variant="outline" 
             size="sm" 
             className="mt-3 text-xs rounded-md text-AppAccent border-AppAccent hover:bg-amber-50"
             >
               {buttonText}
             </Button>
          }
         </div>

        </CardContent>

    </Card>
  )
}

export default StatusCards