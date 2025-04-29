import Link from "next/link"
import Hero from "@/components/cars/Hero"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Features from "@/components/cars/Features"
import UserProfile from "@/components/user/Profile"
import Notifications from "@/components/shared/Notifications"
import DisplayCars from "./(dashboard)/user/cars/DisplayCars"
import Pagination from "@/components/shared/Pagination"
import { getAllCars } from "@/actions/cars"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/auth"
import { Home, Car, Heart, Search, LayoutDashboard } from "lucide-react"

const getNavLinks = ( role ="customer") => {
  const basePath = role === "customer" ? "/user" : "/vendor"
  return [
   {label: <Home/>, href: "/"},
   {label: <LayoutDashboard/>, href: basePath},
   {label: <Car/>, href: `${basePath}/cars`},
   { label: <Heart />, href: "#" },
  ]
}

const page = async (props:{
  searchParams?: Promise<{
    page?: string
  }>
}) =>{
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page)|| 1
  const {cars, totalPages} = await getAllCars(currentPage)
   const session = await getServerSession(authOptions);
   const user = session?.user

  return (

    <div>
      <Header
          title="AutoNex"

          navLinks={getNavLinks(user?.role)}
          rightContent={
            <div className="flex justify-between items-center gap-14 flex-wrap">
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Notifications userId={user.id} role={user.role || "customer"} />
                    <UserProfile/>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="text-AppPrimary font-medium hover:underline"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          }
        />
      <Hero/>
      <DisplayCars cars={cars}/>
      <div className="mb-4">
        {totalPages > 1 && <Pagination totalPages={totalPages}/>}
      </div>
      
      <Features/>
      <Footer/>
      </div>
  )
}
export default page