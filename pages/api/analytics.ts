// Import axios, a popular promise-based HTTP client for making asynchronous HTTP requests
// Also import NextApiRequest and NextApiResponse for handling API requests and responses
import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";
import logger from "@/lib/logger";

// Define our data structure to organize fetched data
interface DataObject {
  category: string;
  stat: string;
  data: { name: string; value: number }[];
}

// This export default function handles the fetching of user details and formatting of fetched data
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Fetch random users data from Random User Generator API
    const usersResponse = await axios.get(
      "https://randomuser.me/api/?results=5",
    );

    // Process user data into our desired format
    const data: DataObject[] = usersResponse.data.results.map(
      (user: any, index: number) => {
        const category = `Category ${index + 1}`;
        const stat = `Statistic ${index + 1}`;
        const data = [
          { name: `/${user.name.first} ${user.name.last}`, value: index + 1 },
        ];
        return { category, stat, data };
      },
    );

    // Once processing completes, respond with the user data
    res.status(200).json(data);
  } catch (error: any) {
    logger.error("Failed to fetch analytics data", error);
    // In case of any error in fetching or processing data, respond with the error message
    res.status(500).json({ error: error.message });
  }
}
