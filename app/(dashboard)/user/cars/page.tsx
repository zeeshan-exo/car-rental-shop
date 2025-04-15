
import { getAllCars } from "@/actions/cars"
import Displaycars from "./displayCars"
import Pagination from "@/components/Pagination"


const page = async (props:{
  searchParams?: Promise<{
    page?: string
  }>
}) => {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page)|| 1
  const {cars, totalPages} = await getAllCars(currentPage)

  return (

    <div>
      <Displaycars cars={cars}/>
      <div>
        {totalPages > 1 && <Pagination totalPages={totalPages}/>}
      </div>
      </div>
  )
}
 export default page