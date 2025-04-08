
import { getUserOrders } from "@/actions/booking";
import UserBookings from "@/components/bookings/UserBookings";
import { Table,  } from "@/components/ui/table";

export default async function page () {
    const data = await getUserOrders()

    return(
        <div className="container mx-auto py-10">
            <UserBookings/>
        </div>
    )
}