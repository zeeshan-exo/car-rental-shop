
import React from 'react'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs'

interface TabsWrapperProps {
  defaultValue?: string, 
  value?:string,
  onValueChange?: (value: string) => void,
  children?: React.ReactNode,
  className?: string
}
export const TabsWrapper :React.FC<TabsWrapperProps> =({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
})=>{
  return(
    <Tabs
    defaultValue={defaultValue}
    value={value}
    onValueChange={onValueChange}
    className={className}
    >
      {children}
    </Tabs>
  )
}

export { TabsList, TabsTrigger, TabsContent };