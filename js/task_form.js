let colorArray = [];

// function changeColor(color) {

//     document.getElementById('red').classList.remove('red');
//     document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
//     document.getElementById('yellow').classList.remove('yellow');
//     document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
//     document.getElementById('green').classList.remove('green');
//     document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';

//     if (color === 'red') {
//         document.getElementById('red').classList.add('red');
//         document.getElementById('redImg').src = '/asseds/img/pfeil-oben-weiss.png';
//         colorArray = { color: color, image: '/asseds/img/pfeil-oben-rot.png' };
//     } else if (color === 'yellow') {
//         document.getElementById('yellow').classList.add('yellow');
//         document.getElementById('yellowImg').src = '/asseds/img/medium-weiss.png';
//         colorArray = { color: color, image: '/asseds/img/medium-gelb.png' };
//     } else if (color === 'green') {
//         document.getElementById('green').classList.add('green');
//         document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-weiss.png';
//         colorArray = { color: color, image: '/asseds/img/pfeil-unten-grün.png' };
//     }


// }

function changeColor(color) {
    const redElement = document.getElementById('red');
    const yellowElement = document.getElementById('yellow');
    const greenElement = document.getElementById('green');

    // Remove the "red", "yellow", and "green" classes from all three div elements
    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');

    // Reset the src attributes of the three images to their default values
    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';

    let text;
    let coloredImage;
    let whiteImage;
    if (color === 'red') {
        redElement.classList.add('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim(); // Extract the text from the red element
        coloredImage = '/asseds/img/pfeil-oben-rot.png';
        whiteImage = '/asseds/img/pfeil-oben-weiss.png';
    } else if (color === 'yellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim(); // Extract the text from the yellow element
        coloredImage = '/asseds/img/medium-gelb.png';
        whiteImage = '/asseds/img/medium-weiss.png';
    } else if (color === 'green') {
        greenElement.classList.add('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim(); // Extract the text from the green element
        coloredImage = '/asseds/img/pfeil-unten-grün.png';
        whiteImage = '/asseds/img/pfeil-unten-weiss.png';
    }

    // Update the colorArray object with the text, coloredImage, and whiteImage properties
    colorArray = { color: color, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}

function toEditChangeColor(color) {
    const redElement = document.getElementById('toEditRed');
    const yellowElement = document.getElementById('toEditYellow');
    const greenElement = document.getElementById('toEditGreen');

    // Remove the "red", "yellow", and "green" classes from all three div elements
    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');

    // Reset the src attributes of the three images to their default values
    document.getElementById('toEditRedImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('toEditYellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('toEditGreenImg').src = '/asseds/img/pfeil-unten-grün.png';

    let text;
    let coloredImage;
    let whiteImage;
    if (color === 'toEditRed') {
        redElement.classList.add('red');
        document.getElementById('toEditRedImg').src = '/asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim(); // Extract the text from the red element
        coloredImage = '/asseds/img/pfeil-oben-rot.png';
        whiteImage = '/asseds/img/pfeil-oben-weiss.png';
    } else if (color === 'toEditYellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('toEditYellowImg').src = '/asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim(); // Extract the text from the yellow element
        coloredImage = '/asseds/img/medium-gelb.png';
        whiteImage = '/asseds/img/medium-weiss.png';
    } else if (color === 'toEditGreen') {
        greenElement.classList.add('green');
        document.getElementById('toEditGreenImg').src = '/asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim(); // Extract the text from the green element
        coloredImage = '/asseds/img/pfeil-unten-grün.png';
        whiteImage = '/asseds/img/pfeil-unten-weiss.png';
    }

    // Update the colorArray object with the text, coloredImage, and whiteImage properties
    colorArray = { color: color, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}



function resetSettingsChangeColor() {
    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('green').classList.remove('green');
    document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
}