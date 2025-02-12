
import React from 'react'
import { getUsers, deleteUser } from '@/app/actions/users'
import DeleteUserButton from './deleteButton';

export default async function DisplayUsers() {
  const users = await getUsers()

  if (users.length === 0) {
    return <p className="text-gray-500">No users found.</p>;
  }

  return (
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Role
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
          { users.map((user)=>(
               <tr key={user._id} className="bg-white border-b  border-gray-200 text-gray-700">
               <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
               {user.name}
               </th>
               <td className="px-6 py-4">
                   {user.email}
               </td>
               <td className="px-6 py-4">
                  {user.role}
               </td>
               <td className="px-6 py-4">
                  {user.status}
               </td>
               <DeleteUserButton userId = {user._id.toString()}/>
               </tr>
          )) 
          }
           
        </tbody>
    </table>
   </div>

  )
}

