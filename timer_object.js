function Timer(elem){

    var time = 0;
    //serve as ID returned by setInterval() to clear it
    var interval;
    var diff;

    //PRIVATE FUNCTIONS
    //update the time displayed by timer
    function update(){
        time += timepassed();
        var timeconverted = timeConversion(time);
        elem.textContent = timeconverted;
    }

    //calculates & returns time passed
    function timepassed(){
        var now = Date.now();       //number of milliseconds since base date that have passed
        var newdiff = now - diff;
        diff = now;
        return newdiff;
    }

    function timeConversion(init){
        /*var h = Math.floor(init/3600000).toString();
        var m = Math.floor((init/60000) - (h * 60)).toString();
        var s = Math.floor(init/1000 - (m * 60) - (h * 3600)).toString(); */

        var time = new Date(init);
        var h = Math.floor(init/3600000).toString();
        var m = time.getMinutes().toString();
        var s = time.getSeconds().toString();


        if (h.length < 2){
            h = '0' + h;
        }

        if (m.length < 2){
            m = '0' + m;
        }

        if (s.length < 2){
            s = '0' + s;
        }

        return h + " : " + m + " : " + s;
    }


    this.on = false;

    this.start = function(){
        if (!this.on){
            interval = setInterval(update, 10);
            diff = Date.now();
            this.on = true;
        }
    };

    this.stop = function(){
        if (this.on){
            clearInterval(interval);
            interval = null;
            this.on = false;
        }
    };

    this.reset = function(){
        time = 0;
    };
}