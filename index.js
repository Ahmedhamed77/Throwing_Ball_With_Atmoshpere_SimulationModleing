let myChart = document.getElementById("myChart").getContext('2d');


let ball = new Ball();

let config = {
    type: 'scatter',
    data: {
        datasets: [{
            label: "# throwing a ball",
            showLine: true,
            data: [],
            pointRadius: 1,
            borderColor: '#0054A7'
        }]
    },
    options: {
        animation: {
            duration: 0 // general animation time
        },
        responsive: true,
        scales: {
            xAxes: [{
                gridLines: {
                    drawTicks: false
                },
            }],
            yAxes: [{

                gridLines: {
                    drawTicks: false
                }
            }]
        }
    }
};


window.onload = function () {
    window.myLine = new Chart(myChart, config);

};

document.getElementById('startBtn').addEventListener("click", function () {


    ball.start(myLine);

    window.myLine.update();

});

document.getElementById('pause').addEventListener("click", function () {

    ball.pause();
})