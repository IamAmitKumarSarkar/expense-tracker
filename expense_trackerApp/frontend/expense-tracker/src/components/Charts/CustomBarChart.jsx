import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts"

const CustomBarChart = ({ data }) => {
    
    // Function to assign bar color
   const getBarColor = (index) => {
       // Check if index is even (0, 2, 4...) for one color, else another
       return  index % 2 ===  0 ? "#875cf5" : "#cfbefb"; // Changed the logic slightly for clarity
   }

   // Local Custom Tooltip Component (Renamed to avoid conflict)
    const LocalCustomTooltip = ({ active, payload }) => {
        
     if (active && payload && payload.length) {
        return (
            <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                <p className='text-xs font-semibold text-purple-800 mb-1'>
                    {/* Ensure 'catagory' data key exists in your 'data' array items */}
                    {payload[0].payload.catagory} 
                </p>
                <p className='text-sm text-gray-600'>
                    Amount: <span className='text-sm font-medium text-gray-900'>
                        ${payload[0].payload.amount}
                    </span>
                </p>
            </div>
        );
    }
    return null;
   };


    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />

                    {/* X Axis */}
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

                    {/* Y Axis */}
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' />

                    {/* Tooltip (Using the locally defined component name) */}
                    <Tooltip content={LocalCustomTooltip} />

                    {/* Bar Section */}
                    <Bar
                        dataKey="amount"
                        fill="#FF8042" // This fill color is overridden by the Cells
                        radius={[10, 10, 0, 0]}
                        // activeDot and activeStyle props are for Line charts, they don't apply here.
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart;
