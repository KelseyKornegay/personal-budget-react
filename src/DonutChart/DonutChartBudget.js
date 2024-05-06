import React, { useEffect, useState } from 'react'
import DonutChart from './DonutChart.js'
import { defaultData } from './DonutData.js'
import axios from 'axios'

export default function DonutChartComponent() {
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    async function getDonutData() {
      const url = 'http://52.15.66.45:3001/budget';
      const userID=localStorage.getItem('UserID');
      const res = await axios.post(url,{userID});
      console.log(res.data, "A random string");
      const budgetData = res.data;
      const updatedData = budgetData.map((item) => {
        console.log(item);
        return (
          {
            name: item.title,
            value: item.budget
          }
        );
      });
      console.log(updatedData);
      setData(updatedData);
    }
    getDonutData();
  }, []);

  return (
    <DonutChart data={data} width={600} height={350} />
  )
}