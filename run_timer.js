var timer = document.getElementById('timer');
var toggleb = document.getElementById('toggle');
var resetb = document.getElementById('reset');

var watch = new Timer(timer);

toggleb.addEventListener('click', function(){
    if (watch.on){
        watch.stop();
    }else
    {
        watch.start();
    }
});

resetb.addEventListener('click', function(){
    watch.reset();
});