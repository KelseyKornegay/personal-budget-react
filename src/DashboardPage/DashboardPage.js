
import React from "react";
import PieChart from "../PieChart/PieChart";
import DonutChart from "../DonutChart/DonutChartBudget";
import BarChart from "../BarChart/BarChart";

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
