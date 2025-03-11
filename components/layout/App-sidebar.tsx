import { Car, Home, ShoppingCart, Settings, Bell, HelpCircle, ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

const sidebarItems = [
  { 
    title: "Home", 
    url: "/", 
    icon: Home,
    active: true 
  },
  { 
    title: "Dashboard", 
    url: "/vendor", 
    icon: ShoppingCart 
  },
  { 
    title: "My Cars", 
    url: "/vendor/cars", 
    icon: Car 
  },
  { 
    title: "Orders", 
    url: "/vendor/orders", 
    icon: ShoppingCart 
  },
  { 
    title: "Notifications", 
    url: "/notifications", 
    icon: Bell,
    notifications: 3 
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <Sidebar className="w-60 hidden md:flex flex-col bg-white shadow-lg h-screen">
      <SidebarContent className="flex-grow overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                <Car className="h-8 w-8 text-blue-600" />
                AutoNex
              </span>
              <ChevronDown className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem 
                  key={item.title}
                  className={`
                    group relative mb-1 
                    ${activeItem === item.title 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-700'}
                  `}
                  onClick={() => setActiveItem(item.title)}
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center justify-between w-full px-6 py-3"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon 
                          className={`
                            h-5 w-5 
                            ${activeItem === item.title 
                              ? 'text-blue-600' 
                              : 'text-gray-500 group-hover:text-gray-700'}
                          `} 
                        />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      
                      {item.notifications && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                          {item.notifications}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 px-6 py-4">
        <SidebarMenuButton 
          className="flex items-center gap-4 w-full px-4 py-3 
                     hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700 font-medium">Settings</span>
        </SidebarMenuButton>
        
        <SidebarMenuButton 
          className="flex items-center gap-4 w-full px-4 py-3 
                     hover:bg-gray-100 rounded-lg transition-colors mt-2"
        >
          <HelpCircle className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700 font-medium">Help & Support</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;