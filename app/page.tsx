// Importing relevant components
import { Card, Text, Title } from "@tremor/react";
import Search from "@/components/Search";
import UsersTable from "@/components/UsersTable";

// Prop types for the Home functional component
type Props = {
  // The search paramater 'q', which would be used for searching users
  searchParams: {
    q?: string;
  };
};

// An async function for the Home component, which queries and displays users
export default async function Home({ searchParams }: Props) {
  // Fetch the query parameter from the searchParams
  const query = searchParams.q;

  // Use Prisma client to fetch the users matching the query in a case insensitive manner
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      email: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* Title of the page */}
      <Title>Users</Title>
      {/* Description of the page */}
      <Text>A table of users retrieve from our database.</Text>
      {/* A search bar for searching users */}
      <Search query={query} />
      {/* A card to display the users table */}
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
