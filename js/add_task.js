let allTasks = [];
let red = false;
let yellow = false;
let green = false;

/**
 * Create Task and put it to the JSON allTasks
 * 
 */
function addTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let dueDate = document.getElementById('dueDate').value;

    let task = {
        'title': title,
        'description': description,
        'category': category,
        'DueDate': dueDate
    };


    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}


function changeColorRed() {
    console.log('red', red)
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
    console.log('yellow', yellow)

    if (yellow) {
        document.getElementById('yellow').classList.remove('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
        red = false;
        yellow = false;
        green = false;
    } else {
        document.getElementById('yellow').classList.add('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-weiss.png';
        yellow = true;
        red = false;
        green = false;
    }



    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

    document.getElementById('green').classList.remove('green');
    document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
}

function changeColorGreen() {
    console.log('green', green)
    if (green) {
        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
        red = false;
        yellow = false;
        green = false;
    } else {
        document.getElementById('green').classList.add('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-weiss.png';
        green = true;
        red = false;
        yellow = false;
    }


    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';


}