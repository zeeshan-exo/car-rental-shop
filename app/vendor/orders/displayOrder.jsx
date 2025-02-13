import { getOrders } from "@/app/actions/order";

export default async function DisplayOrder() {
    const orders = await getOrders(); 
    if (orders.length === 0) {
        return <p className="text-gray-500">No orders found.</p>;
      }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Car name</th>
                        <th scope="col" className="px-6 py-3">Model</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Id Card</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Time</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="bg-white border-b text-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">{order.userName}</th>
                            <td className="px-6 py-4">{order.productName}</td>
                            <td className="px-6 py-4">{order.carModel}</td>
                            <td className="px-6 py-4">{order.email}</td>
                            <td className="px-6 py-4">{order.idcard}</td>
                            <td className="px-6 py-4">{order.date}</td>
                            <td className="px-6 py-4">{order.time}</td>
                            <td className="px-6 py-4">{order.address}</td>
                            <td className="px-6 py-4">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}