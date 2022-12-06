let allTasks = [];
let currentDraggedElement;
let liCategory;
let gbPink = false;
let gbOrange = false;
let gbGreen = false;
let gbTurquoise = false;
let gbYellow = false;
let gbBlue = false;

async function init() {
    await includeHTML();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function addTaskRight() {
    document.getElementById('addTaskRight').classList.remove('d-none');
}

function openCheckTask() {
    document.getElementById('closeContainer2').classList.remove('d-none');
}

function closeContainer1() {
    document.getElementById('closeContainer2').classList.add('d-none');
}

function closeContainer() {
    document.getElementById('addTaskRight').classList.add('d-none');

}

function onSubmit(event) {
    event.preventDefault();
    createTask();
    closeContainer()
}

/** Area for Drag and Drop */

function createTask() {
    let titles = document.getElementById('title').value;
    let descriptions = document.getElementById('description').value;
    let categorys = document.getElementById('categoryList').value;
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


function allowDrop(ev) {
    ev.preventDefault();
}

function drop(categorys) {
    let droppedTask = allTasks.filter(x => x.id == currentDraggedElement)
    droppedTask[0]['list'] = categorys;
    addTasking();
}



function drag(id) {
    currentDraggedElement = id;
}


function inputfieldValue() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('categoryList').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('assignedTo').value = '';
    document.getElementById('prio').value = '';
    document.getElementById('subtask').value = '';
}

/** Area for Category */

function openCategory() {
    let category = document.getElementById('categoryList');
    if (category.classList.contains('d-none')) {
        category.classList.remove('d-none');
        document.getElementById('borderButton').classList.add('borderButton');
    } else {
        category.classList.add('d-none');
        document.getElementById('borderButton').classList.remove('borderButton');
    }
}

function selectCategory(id) {
    liCategory = id;
    let ulCategory = document.getElementById("categoryList");
    let category = document.getElementById(id).innerHTML;

    document.getElementById('selectTaskCategory').style = 'display: flex; align-items: center; list-style-type: none; margin-left: -18px;';
    document.getElementById("selectTaskCategory").innerHTML = category;


    ulCategory.classList.add('d-none');
    document.getElementById('borderButton').classList.remove('borderButton');

}

function selectNewCategory() {
    let selectNewCategory = document.getElementById('selectNewCategory');
    if (selectNewCategory.classList.contains('d-none')) {
        selectNewCategory.classList.remove('d-none');
        document.getElementById('selectTaskCategory').classList.add('d-none');
        document.getElementById('categoryList').classList.add('d-none');
        document.getElementById('borderButton').classList.remove('borderButton');
        document.getElementById('containerColorPicker').classList.remove('d-none');
        document.getElementById('selectNewCategoryImg').classList.remove('d-none');
        document.getElementById('selectTaskCategoryImg').classList.add('d-none');

    } else {
        selectNewCategory.classList.add('d-none');
        document.getElementById('selectTaskCategory').classList.remove('d-none');
        document.getElementById('categoryList').classList.remove('d-none');
        document.getElementById('borderButton').classList.add('borderButton');
        document.getElementById('containerColorPicker').classList.add('d-none');
        document.getElementById('selectNewCategoryImg').classList.add('d-none');
        document.getElementById('selectTaskCategoryImg').classList.remove('d-none');
    }

}

function newCategorySelectColorPink(id) {
    if (gbPink) {
        document.getElementById('bg-pink').style = 'box-shadow:  none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;
    } else {
        document.getElementById('bg-pink').style = 'box-shadow: 0px 10px 12px -6px #000000;';
        document.getElementById('bg-orange').style = 'box-shadow: none';
        document.getElementById('bg-green').style = 'box-shadow:  none';
        document.getElementById('bg-turquoise').style = 'box-shadow:  none';
        document.getElementById('bg-yellow').style = 'box-shadow:  none';
        document.getElementById('bg-blue').style = 'box-shadow:  none';
        gbPink = true;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;

    }
}

function newCategorySelectColorOrange(id) {
    if (gbOrange) {
        document.getElementById('bg-orange').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;
    } else {
        document.getElementById('bg-orange').style = 'box-shadow: 0px 10px 12px -6px #000000;';
        document.getElementById('bg-pink').style = 'box-shadow: none';
        document.getElementById('bg-green').style = 'box-shadow:  none';
        document.getElementById('bg-turquoise').style = 'box-shadow: none';
        document.getElementById('bg-yellow').style = 'box-shadow: none';
        document.getElementById('bg-blue').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = true;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;
    }
}

function newCategorySelectColorGreen(id) {
    if (gbGreen) {
        document.getElementById('bg-green').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;
    } else {
        document.getElementById('bg-green').style = 'box-shadow: 0px 10px 12px -6px #000000;';
        document.getElementById('bg-orange').style = 'box-shadow: none';
        document.getElementById('bg-pink').style = 'box-shadow: none';
        document.getElementById('bg-turquoise').style = 'box-shadow: none';
        document.getElementById('bg-yellow').style = 'box-shadow: none';
        document.getElementById('bg-blue').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = true;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;
    }
}

function newCategorySelectColorTurquoise(id) {
    if (gbTurquoise) {
        document.getElementById('bg-turquoise').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;
    } else {
        document.getElementById('bg-turquoise').style = 'box-shadow: 0px 10px 12px -6px #000000;';
        document.getElementById('bg-green').style = 'box-shadow: none';
        document.getElementById('bg-orange').style = 'box-shadow: none';
        document.getElementById('bg-pink').style = 'box-shadow: none';
        document.getElementById('bg-yellow').style = 'box-shadow: none';
        document.getElementById('bg-blue').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = true;
        gbYellow = false;
        gbBlue = false;
    }
}

function newCategorySelectColorYellow(id) {
    if (gbYellow) {
        document.getElementById('bg-yellow').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;
    } else {
        document.getElementById('bg-yellow').style = 'box-shadow: 0px 10px 12px -6px #000000;';
        document.getElementById('bg-turquoise').style = 'box-shadow: none';
        document.getElementById('bg-green').style = 'box-shadow: none';
        document.getElementById('bg-orange').style = 'box-shadow: none';
        document.getElementById('bg-pink').style = 'box-shadow: none';
        document.getElementById('bg-blue').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = true;
        gbBlue = false;
    }
}

function newCategorySelectColorBlue(id) {
    if (gbBlue) {
        document.getElementById('bg-blue').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = false;
    } else {
        document.getElementById('bg-blue').style = 'box-shadow: 0px 10px 12px -6px #000000;';
        document.getElementById('bg-yellow').style = 'box-shadow: none';
        document.getElementById('bg-turquoise').style = 'box-shadow: none';
        document.getElementById('bg-green').style = 'box-shadow: none';
        document.getElementById('bg-orange').style = 'box-shadow: none';
        document.getElementById('bg-pink').style = 'box-shadow: none';
        gbPink = false;
        gbOrange = false;
        gbGreen = false;
        gbTurquoise = false;
        gbYellow = false;
        gbBlue = true;
    }
}