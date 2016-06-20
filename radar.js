//radar chart data
var radarData = {
	labels : ["Força","Resistência","Agilidade","Percepção","Vontade","Carisma"],
	datasets : [
		{
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
			data : [1,2,4,5,8,8]
		}
	]
};

var optionsData = {
	scale: {
		ticks: {
			beginAtZero: true
		}
	}
};

var ctx = document.getElementById("radarChart").getContext("2d");
var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: radarData,
    options: optionsData
});