// Importing required modules and components
import { getServerSession } from "next-auth"; // used to fetch session data on the server side
import { authOptions } from "@/pages/api/auth/[...nextauth]"; // the options for our authentication process
import Navbar from "@/components/Navbar"; // navigation bar component for our UI

// Main function
export default async function Nav() {
  // Fetch current session using authOptions
  const session = await getServerSession(authOptions);

  // Return Navbar component, passing it user data from the session (or 'undefined' for no session)
  return <Navbar user={session?.user} />;
}
