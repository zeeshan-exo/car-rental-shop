// "use client";
// import { useState, useEffect } from "react";
// import { Bell } from "lucide-react";
// import {socket} from "@/app/socket"

// export default function Notification() {
//   const [notifications, setNotifications] = useState<string[]>([]);

//   useEffect(() => {
//     socket.connect(); 

//     socket.on("notification", (data) => {
//       setNotifications((prev) => [data.message, ...prev]); 
//     });

//     return () => {
//       socket.off("notification"); 
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="relative">
//       <button className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300">
//         <Bell size={24} />
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//             {notifications.length}
//           </span>
//         )}
//       </button>

//       {notifications.length > 0 && (
//         <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
//           <h4 className="font-bold mb-2">Notifications</h4>
//           <ul>
//             {notifications.map((msg, index) => (
//               <li key={index} className="text-sm text-gray-700 border-b py-1">
//                 {msg}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
