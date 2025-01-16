import { Bar } from 'react-chartjs-2';
// needed even tho not in use
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

export const HumidityBarGraph = ({ history, range }) => {
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

  const maxHumidity = parseInt(process.env.NEXT_PUBLIC_MAX_HUMIDITY_GRAPH, 10);
  const humidityData = history.map((entry) => ({
    x: entry.time,
    y: entry.humidity,
    backgroundColor: 'rgba(21, 177, 222, 0.8)',
    borderColor: '',
    borderWidth: 1,
    grouped: true,
  }));

  const barChartData = {
    labels: history.map((x) => x.time), // Use dataPoints instead of fixedLabels
    datasets: [
      {
        label: 'Humidity',
        data: humidityData,
        backgroundColor: humidityData.map((d) => d.backgroundColor),
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
            return `Time: ${moment(entry.time).format('DD MMM YY HH:mm:ss A')}\nHumidity: ${entry.humidity}%`;
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
        ticks: {
          display: true,
        },
        grid: {
          display: true,
          offset: false,
        },
      },
      y: {
        min: 0,
        max: maxHumidity,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="ml-1 h-full rounded-md bg-white px-2 drop-shadow-md">
      <Bar options={options} data={barChartData} />
    </div>
  );
};
