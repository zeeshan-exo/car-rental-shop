"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getVendorCars } from "@/actions/cars";
import { useEffect, useState } from "react";

const fallbackData = [
  { name: "Honda", value: 12 },
  { name: "Toyota", value: 8 },
  { name: "BMW", value: 5 },
  { name: "Mercedes", value: 4 },
  { name: "Ford", value: 5 }
];

const COLORS = {
  bar: "#2563eb",
  hover: "#1d4ed8"
};

const BarChartComponent = () => {
  const [carData, setCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await getVendorCars();
        if (fetchedData && fetchedData.length > 0) {
         
          const brandCounts = {};

          fetchedData.forEach(car => {
            const brand = car.brand;
            const quantity = parseInt(car.carQuantity) || 1;
            
            if (brandCounts[brand]) {
              brandCounts[brand] += quantity;
            } else {
              brandCounts[brand] = quantity;
            }
          });
          
          // Convert to format needed for bar chart
          const transformedData = Object.keys(brandCounts).map(brand => ({
            name: brand,
            value: brandCounts[brand]
          }));
          
          // Sort by value descending for better visualization
          transformedData.sort((a, b) => b.value - a.value);
          
          setCarData(transformedData);
        } else {
          setCarData(fallbackData);
        }
      } catch (error) {
        console.error("Failed to fetch car data:", error);
        setError("Failed to load data");
        setCarData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCarData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <p>Loading car data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  
  const displayData = carData || fallbackData;
  
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={displayData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={60} 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            formatter={(value) => [`${value} cars`, 'Inventory']}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <Bar 
            dataKey="value" 
            name="Car Count" 
            fill={COLORS.bar} 
            radius={[4, 4, 0, 0]} 
            barSize={40}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;