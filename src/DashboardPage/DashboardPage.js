
import React from "react";
import PieChart from "../PieChart/PieChart.js";
import DonutChart from "../DonutChart/DonutChartBudget.js";
import BarChart from "../BarChart/BarChart.js";

function DashboardPage() {
  return (
    <div>
        <h1>Dashboard</h1>
        <PieChart />
        <DonutChart />
        <BarChart />
      {/* Other components for the dashboard page */}
    </div>
  );
}

export default DashboardPage;
