import { Car, Home, ChartNoAxesCombined, Mail, UserRoundCheck, Users, ShoppingCart, Settings, Bell, HelpCircle, ChevronDown, TicketCheck, LogOut } from "lucide-react";
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
    title: "Cars", 
    url: "/vendor/cars", 
    icon: Car 
  },
  { 
    title: "Bookings", 
    url: "/vendor/orders", 
    icon: TicketCheck 
  },
  { 
    title: "Messages", 
    url: "/notifications", 
    icon: Mail,
    notifications: 3 
  },
  { 
    title: "Tracking", 
    url: "/tracking", 
    icon: UserRoundCheck,
    notifications: 2
  },
  { 
    title: "Clients", 
    url: "/clients", 
    icon: Users
  },
  { 
    title: "Report", 
    url: "/reports", 
    icon: ChartNoAxesCombined
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar className={`${collapsed ? 'w-20' : 'w-64'} hidden md:flex flex-col bg-white shadow-xl border-r transition-all duration-300 h-screen`}>
      <SidebarContent className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                <Car className="h-8 w-8 text-blue-600" />
                {!collapsed && "AutoNex"}
              </span>
              <ChevronDown 
                className="h-5 w-5 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" 
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem 
                  key={item.title}
                  className={`
                    group relative mb-1 mx-2 rounded-lg transition-all duration-200
                    ${activeItem === item.title 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'hover:bg-gray-100 text-gray-700'}
                  `}
                  onClick={() => setActiveItem(item.title)}
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center justify-between w-full px-4 py-3"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon 
                          className={`
                            h-5 w-5 
                            ${activeItem === item.title 
                              ? 'text-blue-600' 
                              : 'text-gray-600 group-hover:text-blue-500'}
                          `} 
                        />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </div>
                      
                      {!collapsed && item.notifications && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                          {item.notifications}
                        </span>
                      )}
                      
                      {collapsed && item.notifications && (
                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[16px] text-center text-[10px]">
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
      
      <SidebarFooter className="border-t border-gray-200 px-4 py-4">
        <SidebarMenuButton 
          className="flex items-center gap-4 w-full px-4 py-3 
                     hover:bg-gray-100 rounded-lg transition-colors mb-2"
        >
          <Settings className="h-5 w-5 text-gray-600" />
          {!collapsed && <span className="text-gray-700 font-medium">Settings</span>}
        </SidebarMenuButton>
        
        <SidebarMenuButton 
          className="flex items-center gap-4 w-full px-4 py-3 
                     hover:bg-gray-100 rounded-lg transition-colors mb-2"
        >
          <HelpCircle className="h-5 w-5 text-gray-600" />
          {!collapsed && <span className="text-gray-700 font-medium">Help & Support</span>}
        </SidebarMenuButton>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <SidebarMenuButton 
            className="flex items-center gap-4 w-full px-4 py-3 
                      text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="font-medium">Log Out</span>}
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;