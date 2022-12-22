let colorArray;

function changeColor(color) {

    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('green').classList.remove('green');
    document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';

    if (color === 'red') {
        document.getElementById('red').classList.add('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-weiss.png';
        colorArray = { color: color, image: '/asseds/img/pfeil-oben-rot.png' };
    } else if (color === 'yellow') {
        document.getElementById('yellow').classList.add('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-weiss.png';
        colorArray = { color: color, image: '/asseds/img/medium-gelb.png' };
    } else if (color === 'green') {
        document.getElementById('green').classList.add('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-weiss.png';
        colorArray = { color: color, image: '/asseds/img/pfeil-unten-grün.png' };
    }


}

function resetSettingsChangeColor() {
    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('green').classList.remove('green');
    document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
}