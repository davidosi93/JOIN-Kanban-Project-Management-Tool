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
    let progresses = allTasks.filter(t => t['list'] == 'progress');
    let feedbacks = allTasks.filter(t => t['list'] == 'feedback');
    let dones = allTasks.filter(t => t['list'] == 'done');

    let containerTodo = document.getElementById('containerTodos');
    let containerProgress = document.getElementById('containerProgresses');
    let containerFeedback = document.getElementById('containerFeedbacks');
    let containerDone = document.getElementById('containerDones');

    containerTodo.innerHTML = '';
    containerProgress.innerHTML = '';
    containerFeedback.innerHTML = '';
    containerDone.innerHTML = '';


    for (let i = 0; i < todos.length; i++) {
        const element = todos[i];

        containerTodo.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${element['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < progresses.length; i++) {
        const element = progresses[i];

        containerProgress.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
        <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${element['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < feedbacks.length; i++) {
        const element = feedbacks[i];


        containerFeedback.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${element['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < dones.length; i++) {
        const element = dones[i];

        containerDone.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${element['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }



}

// function generateTodoHTML(element) {
//     return
// }

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(categorys) {
    allTasks[currentDraggedElement]['list'] = categorys;
    addTasking();
}

function drag(id) {
    currentDraggedElement = id;
}


function onSubmit(event) {
    event.preventDefault();
    createTask();
    closeContainer();

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