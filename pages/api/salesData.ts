import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";

// Define structure for SalesDataObject interface
interface SalesDataObject {
  Month: string;
  Sales: number;
  Profit: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Fetching data from JSONPlaceholder's /posts endpoint
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );

    // Transforming the fetched data to match the SalesDataObject structure
    const transformedData: SalesDataObject[] = response.data
      .slice(0, 3)
      .map((item: { userId: number; id: number }, index: number) => ({
        Month: `2021-${index + 1 < 10 ? "0" : ""}${index + 1}`, // Format: YYYY-MM
        Sales: item.userId * 1000, // Example transformation
        Profit: item.id * 100, // Example transformation
      }));

    // Send the transformed data as the response of the API with status 200 (OK)
    res.status(200).json(transformedData);
  } catch (error: any) {
    logger.error("Failed to fetch sales data", error);
    // If there are any errors in the try block then return error with status 500 (Internal Server Error)
    res.status(500).json({ error: error.message });
  }
}
