import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/currency"
import Image from "next/image"
import Pagination from "@/components/shared/Pagination"

const CarsList = ({cars, totalCars, totalPages}) => {
    

    return (
        <>
        <div>
            <div className="p-4 text-AppDark">
                <p>Total Cars {totalCars}</p>
            </div>
        </div>
        
        <Table className="p-2 border-spacing-3 border-black">
            <TableCaption>Total {totalCars} Cars </TableCaption>
            <TableHeader className="bg-gray-200 hover:bg-AppDark">
                <TableRow>
                   
                    <TableHead>Image</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Modal</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>RenatlRate</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="mt-2">
              
            {cars?.map ((car) => (
                <TableRow key={car._id}>
                     
                    <TableCell>
                        {car.images[0]?.cloudinaryUrl && (
                            
                             <img
                             src={car.images[0]?.cloudinaryUrl}
                             width={90}
                             height={80}
                             alt="car image"
                             />
                        )}
                           
                        
                       </TableCell>
                       <TableCell>{car._id.split(4)}</TableCell>
                    <TableCell>{car.carName}</TableCell>
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.modelYear}</TableCell>
                    <TableCell>{car.vendor?.vendorName}</TableCell>
                    <TableCell>{car.city}</TableCell>
                    <TableCell>{formatCurrency(car.rentalRate)}</TableCell>
                    
                </TableRow>
            ))}
                
            </TableBody>
        </Table>
        {/* <div>
            {totalPages > 1 && <Pagination totalPages={totalPages}/>}
        </div> */}
        </>
    )
}

export default CarsList