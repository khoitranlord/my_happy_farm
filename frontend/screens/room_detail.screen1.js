import BBC_LIGHT from "../../mockup_data/BBC_LIGHT.csv"
import BBC_MOISTURE from "../../mockup_data/BBC_MOISTURE.csv"
import BBC_TEMP from "../../mockup_data/BBC_TEMP.csv"

import Papa from "papaparse"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

function drawGraph() {
  const [chartData, setChartData] = useState({
    datasets: []
  });
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    Papa.parse(BBC_LIGHT, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: ((result) => {
        console.log(result)
        setChartData({
          labels: result.data.map((item, index) => [item[' "created_at"']]).filter(String),
          datasets: [
            {
              label: "",
              data: result.data.map((item, index) => [item[' "value"']]).filter( Number ),
              borderColor: "black",
              backgroundColor: "red"
            }
          ]
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: "VALUE OVER THE PAST 24 HOURS"
            }
          }
        })
      }) 
    })
  }, [])

  return (
    <Line options={chartOptions} data={chartData}/>
  );
}

export default drawGraph;