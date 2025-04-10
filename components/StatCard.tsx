import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  value: number | string | ReactNode,
  change: string,
  icon: ReactNode;
}

const StatCard = ({ title, value, change, icon }: CardProps) => {

  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-AppLight rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 rounded-full bg-sky-100">
          {icon}
        </div>
        <h2 className="text-gray-700 font-medium">{title}</h2>
      </div>
      
      <div className="mt-3">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">from last week</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;