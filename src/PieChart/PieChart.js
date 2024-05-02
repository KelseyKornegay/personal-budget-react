

'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'budget',
        data: [],
        backgroundColor: [
          'rgba(191, 149, 0, 0.6)',
          'rgba(171, 29, 29, 0.6)',
          'rgba(49, 69, 123, 0.6)',
          'rgba(94, 42, 76, 0.6)',
          'rgba(10, 15, 20, 0.7)',
          'rgba(88, 17, 28, 0.6)',
          'rgba(24, 96, 77, 0.6)',
        ],
        borderColor: [
          '#b43c00',
          '#ae1d1d',
          '#31457b',
          '#5e2a4c',
          '#58111c',
          '#18614d',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function getChartData() {
      const url = 'http://localhost:3001/budget';
      const userID=localStorage.getItem('UserID');
      const res = await axios.post(url,{userID});
      console.log(res.data);
      const budgetData = res.data;
      const titles = budgetData.map((item) => item.title);
      const budgets = budgetData.map((item) => item.budget);
     
      const updatedData = {
        ...data,
        labels: titles,
        datasets: [
          {
            ...data.datasets[0],
            data: budgets
          }
        ]
      }
      setData(updatedData)
    }
    getChartData()
  }, []);


  
  return (
    <div className='pie-chart-container'>
      <div className='pie-chart-wrapper'>
        <Pie data={data} options={{ responsive: true }} />
      </div>
    </div>
  )
}