import Chart from "chart.js/auto"
const RoomDetail = ({module_name}) => {
  const filename =  `../../mockup_data/BBC_${module_name}.csv`;
  
  d3.csv(filename).then(function(loadedData) {
    console.log(loadedData);
    
    let data =   [];
    let labels = [];
    
    for (let i=0; i<loadedData.length; i++) {
      console.log(loadedData[i]);
      
      let time = loadedData[i].created_at;
      let value = loadedData[i].value;
      console.log(value);
      
      labels.push(time);
      
      data.push(value);    
    }
    
    let options = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
          borderColor: 'rgb(100,100,100)'
        }]
      }
    };
    
    return Chart(document.getElementById('canvas'), options);
  });
}
export default RoomDetail;