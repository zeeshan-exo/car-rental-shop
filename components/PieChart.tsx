"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getVendorCars } from "@/services/actions/products";

const data = [
  { name: "SUVs", value: 40 },
  { name: "Sedans", value: 25 },
  { name: "Hatchbacks", value: 15 },
  { name: "Electric", value: 20 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const RADIAN = Math.PI / 180;
  const x = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
  const y = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);
  
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${data[index].name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const PieChartWithCustomizedLabel = () => {
  return (
    <div className="w-full h-96 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartWithCustomizedLabel;
