import React from 'react'
import { getUsers } from '@/app/actions/users'

export default async function DisplayUsers() {
  const users = await getUsers()

  if (users.length === 0) {
    return <p className="text-gray-500">No users found.</p>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          
            {users.map((user)=>(
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              </tr>
            )

            )}
         
        </tbody>
      </table>
    </div>
  )
}

