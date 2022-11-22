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

    let containerTodo = document.getElementById('containerTodo');
    let containerProgress = document.getElementById('containerProgress');
    let containerFeedback = document.getElementById('containerFeedback');
    let containerDone = document.getElementById('containerDone');

    containerTodo.innerHTML = '';
    containerProgress.innerHTML = '';
    containerFeedback.innerHTML = '';
    containerDone.innerHTML = '';


    for (let i = 0; i < todos.length; i++) {
        const title = todos[i];
        const description = todos[i];
        const category = todos[i];
        const dueDate = todos[i];
        const assignedTo = todos[i];
        const prio = todos[i];
        const subtask = todos[i];
        const id = todos[i];


        containerTodo.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${id})" class="containerBlock">
            <img src="/asseds/img/Frame 113.png">
            <p>${title['title']}</p>
            <p>${description['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }



    for (let i = 0; i < progresses.length; i++) {
        const title = progresses[i];
        const description = progresses[i];
        const category = progresses[i];
        const dueDate = progresses[i];
        const assignedTo = progresses[i];
        const prio = progresses[i];
        const subtask = progresses[i];
        const id = progresses[i];

        containerProgress.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${id})" class="containerBlock">
            <!-- <img src="/asseds/img/Frame 113.png">
            <p>${title['title']}</p>
            <p>${description['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div> -->
        </div>
        `;

    }

    for (let i = 0; i < feedbacks.length; i++) {
        const title = feedbacks[i];
        const description = feedbacks[i];
        const category = feedbacks[i];
        const dueDate = feedbacks[i];
        const assignedTo = feedbacks[i];
        const prio = feedbacks[i];
        const subtask = feedbacks[i];
        const id = feedbacks[i];

        containerFeedback.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${id})" class="containerBlock">
            <!-- <img src="/asseds/img/Frame 113.png">
            <p>${title['title']}</p>
            <p>${description['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div> -->
        </div>
        `;

    }



    for (let i = 0; i < dones.length; i++) {
        const title = dones[i];
        const description = dones[i];
        const category = dones[i];
        const dueDate = dones[i];
        const assignedTo = dones[i];
        const prio = dones[i];
        const subtask = dones[i];
        const id = dones[i];

        containerDone.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${id})" class="containerBlock">
            <!-- <img src="/asseds/img/Frame 113.png">
            <p>${title['title']}</p>
            <p>${description['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div> -->
            </div>
        </div>
        `;

    }



}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(category) {
    allTasks[currentDraggedElement]['list'] = category;
    addTasking()
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