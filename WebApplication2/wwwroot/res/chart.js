$(function () {

  

  var chart = document.getElementById('myChart');
  Chart.defaults.global.animation.duration = 2000; // Animation duration
  Chart.defaults.global.title.display = false; // Remove title
  Chart.defaults.global.title.text = "Chart"; // Title
  Chart.defaults.global.title.position = 'bottom'; // Title position
  Chart.defaults.global.defaultFontColor = '#999'; // Font color
  Chart.defaults.global.defaultFontSize = 10; // Font size for every label

  // Chart.defaults.global.tooltips.backgroundColor = '#FFF'; // Tooltips background color
  Chart.defaults.global.tooltips.borderColor = 'white'; // Tooltips border color
  Chart.defaults.global.legend.labels.padding = 0;
  Chart.defaults.scale.ticks.beginAtZero = true;
  Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
  Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';

  Chart.defaults.global.legend.display = false;

  var myChart = new Chart(chart, {
    type: 'bar',
    data: {
      labels: ["January", "February", "March", "April", "May", 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: "Lost",
        fill: false,
        lineTension: 0,
        data: [45, 25, 40, 20, 45, 20,45, 25, 40, 20, 45, 20,],
        pointBorderColor: "#4bc0c0",
        borderColor: '#4bc0c0',
        borderWidth: 2,
        showLine: true,
      }, {
        label: "Succes",
        fill: false,
        lineTension: 0,
        startAngle: 2,
        data: [20, 40, 20, 45, 25, 60,45, 25, 40, 20, 45, 20,],
        // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
        backgroundColor: "transparent",
        pointBorderColor: "#ff6384",
        borderColor: '#ff6384',
        borderWidth: 2,
        showLine: true,
      }]
    },
  });

 new Chart(document.getElementById("pieChart"),{
  type:"pie",
  data:{
    labels:["Sold","Available"],
    datasets:[{"label":"My First Dataset","data":[300,150],"borderWidth":[0],"backgroundColor":["rgb(54, 162, 235)","rgb(255, 205, 86)"]}
    ]},
       options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)',
                fontSize: 13,
                padding: 10,
                boxWidth: 60
            }
        }
    }

  });

  new Chart(document.getElementById("pieChart2"),{
  type:"pie",
  data:{
    labels:["Income","Outcome"],
    datasets:[{"label":"My First Dataset","data":[300,150],"borderWidth":[0],"backgroundColor":["#5cb85c","#d9534f"]}
    ]},
       options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)',
                fontSize: 13,
                padding: 10,
                boxWidth: 60
            }
        }
    }

  });
   

});