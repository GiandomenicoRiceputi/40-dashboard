"use client";
// Required libraries and hooks
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarList, Card, Flex, Grid, Metric, Text, Title } from "@tremor/react";
import Chart from "@/components/Chart";

// Defining the structure of the response data
interface CategoryData {
  name: string;
  value: number;
}

interface DataItem {
  category: string;
  stat: string;
  data: CategoryData[];
}

// Component for displaying Analytics Data
const Analytics = () => {
  // State variables for the fetched data, loading state, and error
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetching the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the data
        const result = await axios.get("/api/analytics");

        setData(result.data); // setting the data fetched from api to the state
      } catch (error) {
        // Display fetch error
        setError("Failed to fetch data");
        console.error(error);
      } finally {
        // Set loading to false when finished
        setLoading(false);
      }
    };

    // Execute the fetching function
    fetchData().catch((error) => {
      console.error("Error in fetchData:", error);
    });
  }, []);

  // Loading state render
  if (loading) return <div>Loading...</div>;

  // Render on error
  if (error) return <div>{error}</div>;

  // Render when data is loaded
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6" numItemsSm={2} numItemsLg={3}>
        {data.map((item) => (
          <Card className="ba" key={item.category}>
            <Title>{item.category}</Title>
            <Metric>{item.stat}</Metric>
            {item.data.map(({ name, value }, index) => (
              <Flex
                key={index}
                justifyContent="start"
                alignItems="baseline"
                className="space-x-2"
              >
                <Text>{name}</Text>
                <Metric>{value}</Metric>
              </Flex>
            ))}
            <BarList data={item.data} className="mt-2" />
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
  );
};

// Default export for the Analytics component
export default Analytics;
