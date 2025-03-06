
import { getAllCars } from "@/services/actions/cars"
import Displaycars from "./displayCars"
import Search from "@/components/Search"
import Pagination from "@/components/Pagination"


export default async function (props:{
  searchParams?: Promise<{
    query?:string,
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page)|| 1
  const {cars, totalPages} = await getAllCars(query, currentPage)

  return (

    <div >
       <div className="mb-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Cars"/>
      </div>
      
      <Displaycars cars={cars}/>
      <div>
        {totalPages > 1 && <Pagination totalPages={totalPages}/>}
      </div>
      </div>
  )
}
