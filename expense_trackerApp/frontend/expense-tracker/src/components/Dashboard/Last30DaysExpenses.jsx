import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpenses = ({ data }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        // Prepare bar chart data whenever "data" changes
        const result = prepareExpenseBarChartData(data)
        setChartData(result)

        return () => {}; // empty cleanup
    }, [data]);

    return (
        <div className='card col-span-1'> 
            {/* Header */}
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>

            {/* Bar Chart Component */}
            <CustomBarChart data={chartData} />
        </div>
    )
}

export default Last30DaysExpenses;
