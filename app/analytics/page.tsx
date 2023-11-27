import Analytics from "@/components/Analytics";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  // Getting the user's session
  const session = await getServerSession(authOptions);

  // If user isn't authenticated, perform server-side redirection
  if (!session) {
    redirect("api/auth/signin");
  }

  // Render AnalyticsComponent with the fetched data
  return <Analytics />;
}
