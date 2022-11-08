let allTasks = [];

/**
 * Create Task and put it to the JSON allTasks
 * 
 */
function addTask(){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let dueDate = document.getElementById('dueDate').value;

    let task = {
        'title': title,
        'description': description,
        'category' : category,
        'DueDate': dueDate
    };


    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}


function changeColorRed(){
    document.getElementById('red').classList.add('red');
    document.getElementById('redImg').src = 'asseds/img/pfeil-oben-weiss.png';

    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = 'asseds/img/medium-gelb.png';

    document.getElementById('green').classList.remove('green');
    document.getElementById('greenImg').src = 'asseds/img/pfeil-unten-grün.png';
}

function changeColorYellow(){
    document.getElementById('yellow').classList.add('yellow');
    document.getElementById('yellowImg').src = 'asseds/img/medium-weiss.png';

    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = 'asseds/img/pfeil-oben-rot.png';

    document.getElementById('green').classList.remove('green');
    document.getElementById('greenImg').src = 'asseds/img/pfeil-unten-grün.png';
}

function changeColorGreen(){
    document.getElementById('green').classList.add('green');
    document.getElementById('greenImg').src = 'asseds/img/pfeil-unten-weiss.png';

    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = 'asseds/img/pfeil-oben-rot.png';

    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = 'asseds/img/medium-gelb.png';

    
}