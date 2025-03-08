"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getUsers } from "@/actions/users";
import DeleteButton from "@/components/DeleteButton";
import Loading from "@/components/Loading";
import { Edit } from "lucide-react";



type UserRole = "customer" | "vendor";

export default function DisplayUsers() {
  const [activeTab, setActiveTab] = useState<UserRole>("customer");

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="customer" 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as UserRole)}
        className="w-full"
      >
        <TabsList className="grid w-full md:w-80 grid-cols-2">
          <TabsTrigger value="customer">Customers</TabsTrigger>
          <TabsTrigger value="vendor">Vendors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="customer" className="mt-6">
          <UserTable role="customer" />
        </TabsContent>
        
        <TabsContent value="vendor" className="mt-6">
          <UserTable role="vendor" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserTable({ role }: { role: UserRole }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers(role);
        setUsers(data || []);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, [role]);


  if (loading) {
    return (
      <div className="relative h-64">
        <Loading 
          isVisible={true} 
          message={`Loading ${role}s...`} 
          fullScreen={true} 
          transparent={false}
          variant="default"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-600">
        <p>{error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.location.reload()} 
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-md border border-gray-200 text-center">
        <p className="text-gray-500">No {role}s found in the system.</p>
        {/* You could add a button to create new users here */}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        {/* <h2 className="text-xl font-semibold text-gray-800">{capitalizedRole}s</h2> */}
        <p className="text-sm text-gray-500">Total {users.length} {role}s</p>
      </div>
      
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user._id.toString()} 
                className="bg-white border-b hover:bg-gray-50 transition-colors"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => {/* Handle edit */}}
                  >
                    <Edit/>
                  </Button>
                  <DeleteButton Id={user._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}