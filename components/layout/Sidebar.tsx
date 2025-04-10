"use client"
import React, { useState } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuItem, SidebarMenuButton, SidebarGroupContent, SidebarGroupAction, SidebarGroupLabel  } from '../ui/sidebar'
import { Car } from 'lucide-react'

interface SidebarItems {
  title: string,
  url: string,
  icon: React.ComponentType<{className?: string}>
}

interface SidebarProps {
  items: SidebarItems[],
  header?: React.ReactNode,
  footerItems?: SidebarItems[],
  defaultActiveItems?: string
}

const AppSidebar = ({items, header, footerItems, defaultActiveItems = items[0]?.title} : SidebarProps)  => {
  const [activeItem, setActiveItem] = useState(defaultActiveItems)
  return (
    <Sidebar className='w-60 hidden md:flex flex-col bg-AppLight shadow-lg h-screen'>
      <SidebarContent className='flex flex-grow overflow-y-auto'>
        <SidebarGroup>
          <SidebarGroupLabel className='p-6'>
            {header || 
            <div className='flex flex-1'>
              <span className='flex text-2xl items-center gap-3 font-bold text-AppSecondary'>
                <Car className='h-8 w-8 text-AppPrimary'/>
                AutoNex
              </span>
            </div>
            }
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem 
                key={item.title}
                className={`
                  group relative mb-1 
                  ${activeItem === item.title 
                    ? "bg-blue-50 text-AppPrimary" 
                    : "hover:bg-gray-100 text-AppSecondary"}
                `}
                onClick={() => setActiveItem(item.title)}
                >
                  <SidebarMenuButton asChild>
                     <a href={item.url}
                     className="flex items-center justify-between w-full px-6 py-3"
                     >
                      <div className='flex items-center gap-4'>
                        <item.icon
                        className={`
                          h-5 w-5 
                          ${activeItem === item.title 
                            ? "text-AppPrimary" 
                            : "text-AppDark group-hover:text-AppSecondary"}
                        `}
                        />
                        <span className="font-medium">{item.title}</span>
                      </div>
                     </a>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {footerItems && 
      <SidebarFooter className="border-t border-gray-200 px-6 py-4">
        {footerItems.map((item) => (
          <SidebarMenuButton
          key={item.title}
          className="flex items-center gap-4 w-full px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors mb-2 last:mb-0"
        >
          <item.icon className="h-5 w-5 text-AppDark" />
          <span className="text-AppSecondary font-medium">{item.title}</span>
        </SidebarMenuButton>
        ))}
      </SidebarFooter>
      }
    </Sidebar>
  )
}

export default AppSidebar