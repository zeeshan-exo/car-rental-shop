
import React from 'react'
import { Tabs, TabsList, TabsContent, TabsTrigger } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface TabsItem{
    value: string, 
    tabTitle: string,
    cardTitle: string
    cardDescription: string
    cardContent: string
}

interface CustomTabsProps{
    tabs : TabsItem[]
}

const CustomTabs: React.FC<CustomTabsProps>=({tabs}) => {
  return (
    <Tabs defaultValue= {tabs[0]?.value} className='mb-6'>
      <TabsList className='grid grid-cols-3 md:grid-cols-5 lg:w-[500px]'>
        {tabs.map((tab)=>(
            <TabsTrigger key={tab.value} value={tab.value}>{tab.tabTitle}</TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab)=>(
        <TabsContent key={tab.value} value={tab.value}>
        <Card>
            <CardHeader>
                <CardTitle>{tab.cardTitle}</CardTitle>
                <CardDescription>{tab.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
      </TabsContent>
      ))} 
    </Tabs>
  )
}

export default CustomTabs