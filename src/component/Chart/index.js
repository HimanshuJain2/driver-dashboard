import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Chart.css";

const BarChart = (props) => {
  const { categories, data } = props;
  const chartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: categories,
    },
  };

  const chartData = [
    {
      name: "Series",
      data: data,
    },
  ];

  return (
    <div className="chart">
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={150}
      />
    </div>
  );
};

export default BarChart;
