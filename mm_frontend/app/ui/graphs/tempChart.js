import { Bar } from 'react-chartjs-2';
import React from 'react';
// needed even if not in use
import { AdapterDateFns } from 'chartjs-adapter-date-fns';
const moment = require('moment');

import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';

// for rendering
ChartJS.register(
  ...registerables,
  CategoryScale,
  TimeScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const TempBarGraph = ({ history, range }) => {
  // min and max date
  var startDate;
  var endDate;
  var unitTime = 'day';
  if (range[0] != undefined && range[1] != undefined) {
    startDate = new Date(new Date(range[0]).setHours(0, 0, 0, 0));
    endDate = new Date(
      new Date(range[1]).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000,
    );
    if (new Date(range[0]).getTime() === new Date(range[1]).getTime())
      unitTime = 'hour';
  } else {
    unitTime = 'hour';
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
  }

  const maxTemp = parseInt(process.env.NEXT_PUBLIC_MAX_TEMP_GRAPH, 10);
  const tempData = history.map((entry) => ({
    x: entry.time,
    y: entry.temp,
    backgroundColor: entry.temp > entry.threshold_temp ? 'red' : 'blue',
    borderColor: '',
    borderWidth: 1,
    grouped: true,
  }));

  const barChartData = {
    labels: history.map((x) => x.time), // Use dataPoints instead of fixedLabels
    datasets: [
      {
        type: 'line',
        label: 'Threshold Temp',
        data: history.map((x) => x.threshold_temp),
        backgroundColor: 'green',
        pointStyle: false,
        borderColor: 'green',
        borderWidth: 3,
        borderDash: [5, 5],
        animation: false,
        grouped: true,
        stepped: true,
      },
      {
        label: 'Temperature',
        data: tempData,
        backgroundColor: tempData.map((d) => d.backgroundColor),
        borderColor: 'rgb(192, 192, 192)',
        borderWidth: 0,
        grouped: true,
        animation: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            // Customize the title (header) of the tooltip
            return 'Data'; // You can customize this based on your needs
          },
          label: function (tooltipItem) {
            // Customize the label (content) of each tooltip item
            let entry = history[tooltipItem.dataIndex];
            return `Time: ${moment(entry.time).format('DD MMM YY HH:mm:ss A')}\nTemperature: ${entry.temp}°C\nThreshold: ${entry.threshold_temp}°C`;
          },
        },
      },
    },
    scales: {
      x: {
        min: startDate,
        max: endDate,
        type: 'time',
        beginAtZero: true,
        time: {
          unit: unitTime,
        },
        grid: {
          display: true,
          offset: false,
        },
      },
      y: {
        min: 0,
        max: maxTemp,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='h-full px-2 bg-white rounded-md drop-shadow-md ml-1'>
      <Bar options={options} data={barChartData} />
    </div>
  );
};

// Setting a display name for the component
TempBarGraph.displayName = 'TempBarGraph';

export { TempBarGraph };