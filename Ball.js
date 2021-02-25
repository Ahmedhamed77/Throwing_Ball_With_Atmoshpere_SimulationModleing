class Ball {


    dt = 0.01;
    g = 9.81;
    c = 0.15;
    rho = 1.29;

    a;
    v0;
    y0;
    m;
    s;
    t;
    x1;
    y1;
    vx;
    vy;
    k;


    totalTime;

    timeout;

    clicked = false;

    start(chart) {

        if (this.clicked === true) {

            this.timeout = setInterval(() => this.addData(chart), 150);
            this.clicked = false;


        } else {

            this.removeData(chart);
            this.a = parseFloat(document.getElementById("angleText").value); //angle
            this.v0 = parseFloat(document.getElementById("speedText").value); //speed
            this.y0 = parseFloat(document.getElementById("heightText").value); //height
            this.m = parseFloat(document.getElementById('WeightText').value); //weight
            this.s = parseFloat(document.getElementById('SquareText').value); //square


            this.t = 0;
            this.x1 = 0;
            this.y1 = this.y0;

            this.k = 0.5 * this.c * this.s * this.rho / this.m;

            this.vx = this.v0 * Math.cos(this.a * Math.PI / 180.0);
            this.vy = this.v0 * Math.sin(this.a * Math.PI / 180.0);

            this.timeout = setInterval(() => this.addData(myLine), 150);
        }

    }

    removeData(chart) {  // FUNCTION OF REMOVING THE OLD DATA FROM THE CHART SO WE CAN DRAW A NEW ONE
        config.data.labels.length = 0;
        config.data.datasets.forEach((dataset) => {
            dataset.data.length = 0;
        });
        clearInterval(this.timeout);
        chart.update();

    };

    addData(chart) {

        this.t = this.t + this.dt;  // TIME
        this.vx = this.vx - this.k * this.vx * Math.sqrt(this.vx * this.vx + this.vy + this.vy) * this.dt;
        this.vy = this.vy - (this.g + this.k * this.vy * Math.sqrt(this.vx * this.vx + this.vy + this.vy)) * this.dt;


        this.x1 = this.x1 + this.vx * this.dt;
        this.y1 = this.y1 + this.vy * this.dt;

        this.pushData(chart, this.x1, this.y1);


        chart.update();
        if (this.y1 <= 0) {  // WHEN THE Y1 BECOME LESS THAN OR EQUAL ZERO WE CLEAR THE INTERVAL AND STOP.
            clearInterval(this.timeout);
        }
    }

    pushData(chart, x1, y1) {
        chart.data.datasets[0].data.push({x: x1, y: y1});
    }

    pause() {
        if (this.clicked === false) {
            clearInterval(this.timeout);
            this.clicked = true;
        }
    }

}