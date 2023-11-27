"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { AreaChart, Card, Text, Title } from "@tremor/react";

// Define the shape of the sales data
interface SalesDataObject {
  Month: string;
  Sales: number;
  Profit: number;
}

export default function Chart() {
  // Initialize the state for sales data
  const [data, setData] = useState<SalesDataObject[]>([]);

  // Fetch sales data when the component mounts
  useEffect(() => {
    const fetchSalesData = async () => {
      // Fetch the sales data from our custom API (/api/salesData)
      const response = await axios.get("/api/salesData");
      // Update the state with the fetched data
      setData(response.data);
    };

    // Invoke our fetch function
    fetchSalesData();
  }, []);

  // Render the chart component
  return (
    <Card className="mt-8">
      <Title>Performance</Title>
      <Text>Comparison between sales and profit </Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={["Sales", "Profit"]}
        index="Month"
        colors={["indigo", "fuchsia"]}
      />
    </Card>
  );
}
