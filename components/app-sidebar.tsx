import { Car, Home, ShoppingCart, Settings,Bell, Users, HelpCircle } from "lucide-react";
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

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Cars", url: "/vendor/products", icon: Car },
  { title: "Orders", url: "/vendor/orders", icon: ShoppingCart },
  { title: "Notifications", url: "/notifications", icon: Bell },

];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 hidden md:block h-full ">
      <SidebarContent  className="bg-AppTertiary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold px-4 py-6">
            <span className="flex items-center gap-2">
              <Car className="h-6 w-6" />
              AutoNex
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-2  hover:bg-AppMutedGray transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-AppTertiary">
        <SidebarMenuButton>
        <Settings/>Settings
        </SidebarMenuButton>
       
        </SidebarFooter>
    </Sidebar>
  );
}