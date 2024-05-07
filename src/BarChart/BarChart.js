
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
Chart.register(...registerables);

const BarChart = () => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    const [data, setData] = useState({
      labels: [],
      datasets: [
        {
          label: 'Budget',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    });
  
    useEffect(() => {
      async function getChartData() {
        let titles = [];
        let budgets = [];


       try {
        const userID=localStorage.getItem('UserID');
        const response = await axios.post('http://18.216.241.25:3001/budget', { userID });
        console.log('Server response:', response);
        const budgetData = response?.data;
         console.log("budgetData-->",budgetData);
          titles = budgetData?.map((item) => item.title);
          budgets = budgetData?.map((item) => item.budget);
       }
       catch(error){
        console.error('An error occurred:', error); 
       }
     
     
  
        const backgroundColors = [
          'rgba(191, 149, 0, 0.6)',
          'rgba(171, 29, 29, 0.6)',
          'rgba(49, 69, 123, 0.6)',
          'rgba(94, 42, 76, 0.6)',
          'rgba(10, 15, 20, 0.7)',
          'rgba(88, 17, 28, 0.6)',
          'rgba(24, 96, 77, 0.6)',
        ];
        const borderColors = [
          '#b43c00',
          '#ae1d1d',
          '#31457b',
          '#5e2a4c',
          '#58111c',
          '#18614d',
        ];

setData({
    labels: titles,
    datasets: [
      {
        ...data.datasets[0],
        data: budgets,
        backgroundColor: budgets?.map((_, i) => backgroundColors[i % backgroundColors.length]),
        borderColor: budgets?.map((_, i) => borderColors[i % borderColors.length]),
      },
    ],
  });
}
getChartData();
}, []);

useEffect(() => {
if (chartContainer && chartContainer.current) {
  const newChartInstance = new Chart(chartContainer.current, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  chartInstance.current = newChartInstance;
}

return () => {
  if (chartInstance.current) {
    chartInstance.current.destroy();
  }
};
}, [data]);

return <canvas ref={chartContainer} />;
};

export default BarChart;