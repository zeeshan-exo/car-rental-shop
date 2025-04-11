import React from 'react'
import { Card, CardHeader, CardTitle, CardContent,  } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const CategoriesCard = () => {
  return (
    <div>
        <Card className=" rounded-none border-none text-AppDark">
           <CardHeader>
                <CardTitle className='text-xl text-AppSecondary'>Categories</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col gap-2">
            <div className="flex items-center space-x-2" >
              <Checkbox id="economy"/>
              <Label htmlFor="economy">Economy</Label>
            </div>
            <div className="flex items-center space-x-2">
               <Checkbox id="standard"/>
               <Label htmlFor="standard">Standard</Label>
            </div>
            <div className="flex items-center space-x-2">
               <Checkbox id="commercial"/>
               <Label htmlFor="comercial">Comercial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="luxury"/>
              <Label htmlFor="luxury">Luxury</Label>
            </div>
         </CardContent>
        </Card>
    </div>
  )
}

export default CategoriesCard