// Importing relevant modules and components
import { User } from "@prisma/client"; // user model from Prisma client
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react"; // UI components from tremor/react

// Prop types for UsersTable
type Props = {
  // receive an array of users as props
  users: User[];
};

export default function UsersTable({ users }: Props) {
  // Main function to render the table
  return (
    <Table>
      <TableHead>
        <TableRow>
          {/* Header cell for "Name" */}
          <TableHeaderCell>Name</TableHeaderCell>
          {/* Header cell for "Email" */}
          <TableHeaderCell>Email</TableHeaderCell>
          {/* Header cell for "Created at" */}
          <TableHeaderCell>Created At</TableHeaderCell>
        </TableRow>
      </TableHead>

      {/* User ID is used as a unique key for each row */}
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            {/* Cell value for name */}
            <TableCell>{user.name}</TableCell>
            {/* Cell value for email */}
            <TableCell>{user.email}</TableCell>
            {/* Cell value for creation date */}
            <TableCell>
              {new Intl.DateTimeFormat("en-US").format(user.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
