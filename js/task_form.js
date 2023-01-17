let colorArray = [];


function changeColor(color) {
    const redElement = document.getElementById('red');
    const yellowElement = document.getElementById('yellow');
    const greenElement = document.getElementById('green');

    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');

    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';

    let text;
    let coloredImage;
    let whiteImage;
    if (color === 'red') {
        redElement.classList.add('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim();
        coloredImage = '/asseds/img/pfeil-oben-rot.png';
        whiteImage = '/asseds/img/pfeil-oben-weiss.png';
    } else if (color === 'yellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim();
        coloredImage = '/asseds/img/medium-gelb.png';
        whiteImage = '/asseds/img/medium-weiss.png';
    } else if (color === 'green') {
        greenElement.classList.add('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim();
        coloredImage = '/asseds/img/pfeil-unten-grün.png';
        whiteImage = '/asseds/img/pfeil-unten-weiss.png';
    }

    colorArray = { color: color, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}

function toEditChangeColor(color) {
    const redElement = document.getElementById('toEditRed');
    const yellowElement = document.getElementById('toEditYellow');
    const greenElement = document.getElementById('toEditGreen');

    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');

    document.getElementById('toEditRedImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('toEditYellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('toEditGreenImg').src = '/asseds/img/pfeil-unten-grün.png';

    let text;
    let coloredImage;
    let whiteImage;
    let actualColor;
    if (color === 'toEditRed') {
        redElement.classList.add('red');
        document.getElementById('toEditRedImg').src = '/asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim();
        coloredImage = '/asseds/img/pfeil-oben-rot.png';
        whiteImage = '/asseds/img/pfeil-oben-weiss.png';
        actualColor = 'red';
    } else if (color === 'toEditYellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('toEditYellowImg').src = '/asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim();
        coloredImage = '/asseds/img/medium-gelb.png';
        whiteImage = '/asseds/img/medium-weiss.png';
        actualColor = 'yellow';
    } else if (color === 'toEditGreen') {
        greenElement.classList.add('green');
        document.getElementById('toEditGreenImg').src = '/asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim();
        coloredImage = '/asseds/img/pfeil-unten-grün.png';
        whiteImage = '/asseds/img/pfeil-unten-weiss.png';
        actualColor = 'green';
    }

    colorArray = { color: actualColor, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}



function resetSettingsChangeColor() {
    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('green').classList.remove('green');
    document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
}