import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const UserList = ({users}) =>{ 
    return(
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Country</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {users.map((user) => (
            <TableRow key={user._id}>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.status}</TableCell>
                <TableCell>{user?.country || "Not Set"}</TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
    )
}

export default UserList