let red = false;
let yellow = false;
let green = false;





function changeColorRed() {

    if (red) {
        document.getElementById('red').classList.remove('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
        red = false;
        yellow = false;
        green = false;

        document.getElementById('yellow').classList.remove('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';

        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';


    } else {
        document.getElementById('red').classList.add('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-weiss.png';
        red = true;
        green = false;
        yellow = false;

        document.getElementById('yellow').classList.remove('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';

        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
    }

}

function changeColorYellow() {


    if (yellow) {
        document.getElementById('yellow').classList.remove('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
        red = false;
        yellow = false;
        green = false;

        document.getElementById('red').classList.remove('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';

    } else {
        document.getElementById('yellow').classList.add('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-weiss.png';
        yellow = true;
        red = false;
        green = false;


        document.getElementById('red').classList.remove('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
    }

}

function changeColorGreen() {

    if (green) {
        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
        red = false;
        yellow = false;
        green = false;


        document.getElementById('red').classList.remove('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

        document.getElementById('yellow').classList.remove('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';

    } else {
        document.getElementById('green').classList.add('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-weiss.png';
        green = true;
        red = false;
        yellow = false;

        document.getElementById('red').classList.remove('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

        document.getElementById('yellow').classList.remove('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
    }

}