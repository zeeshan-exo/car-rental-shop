import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/auth"
import { getAllCars } from "@/actions/cars"
import DisplayCars from "./DisplayCars"
import Hero from "@/components/cars/Hero"
import Footer from "@/components/layout/Footer"
import Features from "@/components/cars/Features"
import Pagination from "@/components/shared/Pagination"


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

    <>
      <Hero/>
      <DisplayCars cars={cars}/>
      <div className="mb-4">
        {totalPages > 1 && <Pagination totalPages={totalPages}/>}
      </div>
      
      <Features/>
      <Footer/>
      </>
  )
}
export default page