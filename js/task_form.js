let allTasks = [];
let red = false;
let yellow = false;
let green = false;

let currentDraggedElement;


function createTask() {
    let titles = document.getElementById('title').value;
    let descriptions = document.getElementById('description').value;
    let categorys = document.getElementById('category').value;
    let dueDates = document.getElementById('dueDate').value;
    let assignedTos = document.getElementById('assignedTo').value;
    let prios = document.getElementById('prio').value;
    let subtasks = document.getElementById('subtask').value;

    let task = {
        'title': titles,
        'description': descriptions,
        'category': categorys,
        'dueDates': dueDates,
        'assignedTo': assignedTos,
        'prio': prios,
        'subtask': subtasks,
        'id': new Date().getTime(),
        'list': 'todo'

    };

    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
    console.log('Beginn', allTasks);

    addTasking()
    inputfieldValue()

}

function addTasking() {
    let todos = allTasks.filter(t => t['list'] == 'todo');

    let makeTask = document.getElementById('containerTodos');

    makeTask.innerHTML = '';

    for (let i = 0; i < todos.length; i++) {
        const element = todos[i];

        // const title = allTasks[i]['title'];
        // const description = allTasks[i]['description'];
        // const category = allTasks[i]['category'];
        // const dueDate = allTasks[i]['dueDate'];
        // const assignedTo = allTasks[i]['assignedTo'];
        // const prio = allTasks[i]['prio'];
        // const subtask = allTasks[i]['subtask'];
        // const id = allTasks[i]['id'];


        makeTask.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${id})" class="containerBlock">
            <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${description}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }


}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(catogory) {
    allTasks[currentDraggedElement]
}

function drag(id) {
    currentDraggedElement = id;
}


function onSubmit() {
    createTask();
    closeContainer();
    addTasking();
}


function inputfieldValue() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('assignedTo').value = '';
    document.getElementById('prio').value = '';
    document.getElementById('subtask').value = '';
}

function closeContainer() {
    document.getElementById('addTaskRight').classList.add('d-none');

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
    console.log('green', green)
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