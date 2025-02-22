// "use client";
// import React, { useEffect, useState } from "react";
// import { getOneOrder, updateOrderStatus } from "@/services/actions/order";

// interface PreviewOrderProps {
//   orderId: string;
//   onClose: () => void;
//   onStatusUpdate: (newStatus: string) => void;
// }

// export default function PreviewOrder({ orderId, onClose, onStatusUpdate }: PreviewOrderProps) {
//   const [order, setOrder] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       const fetchedOrder = await getOneOrder(orderId);
//       setOrder(fetchedOrder);
//       setLoading(false);
//     };

//     fetchOrder();
//   }, [orderId]);

//   const handleStatusChange = async (newStatus: string) => {
//     const success = await updateOrderStatus(orderId, newStatus);
//     if (success) {
//       onStatusUpdate(newStatus);
//       setOrder((prevOrder: any) => ({ ...prevOrder, status: newStatus })); 
//     } else {
//       alert("Failed to update order status.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Order Details</h2>
//       <p><strong>Name:</strong> {order.userName}</p>
//       <p><strong>Car:</strong> {order.carName}</p>
//       <p><strong>Model:</strong> {order.carModel}</p>
//       <p><strong>Email:</strong> {order.email}</p>
//       <p><strong>ID Card:</strong> {order.idcard}</p>
//       <p><strong>Date:</strong> {order.date}</p>
//       <p><strong>Time:</strong> {order.time}</p>
//       <p><strong>Address:</strong> {order.address}</p>

//       <div className="mt-4">
//         <label className="block mb-1 font-medium">Status</label>
//         <select
//           className="border p-2 rounded w-full"
//           value={order.status}
//           onChange={(e) => handleStatusChange(e.target.value)}
//         >
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="dispatched">Dispatched</option>
//           <option value="delivered">Delivered</option>
//         </select>
//       </div>

//       <div className="mt-4 flex justify-end gap-2">
//         <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }
