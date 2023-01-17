let allTasks = [];
let allCategorys = [];
let allSubtasks = [];
let allContacts = [];
let assignedChackedBox = [];
let selectedSubtasks = [];
let allLiCategory;
let currentSelectedCategory;
let currentDraggedElement;
let currentCategoryColor;
let newCategorySelected = false;

function watchTask(){
    document.getElementById('task-board').innerHTML ='';
    document.getElementById('task-board').innerHTML =`<b>${allTasks.length}</b>`;

    document.getElementById('task-progress').innerHTML ='';
    document.getElementById('task-progress').innerHTML =`<b>${allTasks.length}</b>`;

    document.getElementById('task-feedback').innerHTML ='';
    document.getElementById('task-feedback').innerHTML =`<b>${allTasks.length}</b>`;

    document.getElementById('task-urgent').innerHTML ='';
    document.getElementById('task-urgent').innerHTML =`<b>${allTasks.length}</b>`;

    document.getElementById('task-todo').innerHTML ='';
    document.getElementById('task-todo').innerHTML =`<b>${allTasks.length}</b>`;

    document.getElementById('task-done').innerHTML ='';
    document.getElementById('task-done').innerHTML =`<b>${allTasks.length}</b>`;
}


let allContactsTest = [{
        'color': '#3FB1C6',
        'email': 'waldemar@gmx.de',
        'name': 'Waldemar Neumann',
        'phone': '15512 523555156',
        // 'checked': false
    },
    {
        'color': '#448243',
        'email': 'david@gmx.de',
        'name': 'David Osipov',
        'phone': '15512 523555156',
        // 'checked': false
    },
    {
        'color': '#73EE11',
        'email': 'artur@gmx.de',
        'name': 'Artur Marbach',
        'phone': '15512 523555156',
        // 'checked': false
    },
    {
        'color': '#BD012A',
        'email': 'Jakob@gmx.de',
        'name': 'Jakob Neumann',
        'phone': '15512 523555156',
        // 'checked': false
    },
    {
        'color': '#017637',
        'email': 'nikita@gmx.de',
        'name': 'Nikita Neumann',
        'phone': '15512 523555156',
        // 'checked': false
    }
];


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

    openAllContacts()
}


function addTaskRight() {
    document.getElementById('addTaskRight').classList.remove('d-none');
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
    let dueDates = document.getElementById('dueDate').value;
    // let assignedTos = document.getElementById('assignedTo').value;
    // let prios = document.getElementById('prio').value;
    // let subtasks = document.getElementById('subtask').value;

    let task = {
        'title': titles,
        'description': descriptions,
        'category': allLiCategory,
        'dueDates': dueDates,
        'assignedTo': assignedChackedBox,
        'prio': colorArray,
        'subtask': selectedSubtasks,
        'id': new Date().getTime(),
        'list': 'todo'

    };

    allTasks.push(task);


    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
    console.log('Inhalt von allTasks', allTasks);

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

        let nameParts = element['assignedTo'];
        let initialsContainer = '';

        for (let j = 0; j < nameParts.length; j++) {
            let name = nameParts[j].split(' ');
            initialsContainer += /*html*/ `
            <div class="assignTask">
                <div class="divAssignTask">${name[0][0]}${name[1][0]}</div>
            </div>
          `;
        }


        containerTodo.innerHTML += /*html*/ `
        <div onclick="openCheckTask(${i})" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <div class="addCategoryInTask ${element['category']['color']}">
                <p>${element['category']['name']}</p>
            </div>
            <div>
                <p>${element['title']}</p>
            </div>
            <div>
                <p>${element['description']}</p>
            </div>
            <div class="assignTaskSelect">
                <div class="assignTaskSelectName">
                    ${initialsContainer}
                </div>
                <div class="assignTaskSelectImage">
                   <img src="${element['prio']['coloredImage']}">
                </div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < progresses.length; i++) {
        const element = progresses[i];

        let nameParts = element['assignedTo'];
        let initialsContainer = '';

        for (let j = 0; j < nameParts.length; j++) {
            let name = nameParts[j].split(' ');
            initialsContainer += `
            <div class="assignTask">
                <div class="divAssignTask">${name[0][0]}${name[1][0]}</div>
            </div>
          `;
        }

        containerProgress.innerHTML += /*html*/ `
        <div onclick="openCheckTask(${i})" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <div class="addCategoryInTask ${element['category']['color']}">
                <p>${element['category']['name']}</p>
            </div>
            <div>
                <p>${element['title']}</p>
            </div>
            <div>
                <p>${element['description']}</p>
            </div>
            <div class="assignTaskSelect">
                <div class="assignTaskSelectName">
                    ${initialsContainer}
                </div>
                <div class="assignTaskSelectImage">
                   <img src="${element['prio']['coloredImage']}">
                </div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < feedbacks.length; i++) {
        const element = feedbacks[i];

        let nameParts = element['assignedTo'];
        let initialsContainer = '';

        for (let j = 0; j < nameParts.length; j++) {
            let name = nameParts[j].split(' ');
            initialsContainer += `
            <div class="assignTask">
                <div class="divAssignTask">${name[0][0]}${name[1][0]}</div>
            </div>
          `;
        }

        containerFeedback.innerHTML += /*html*/ `
        <div onclick="openCheckTask(${i})" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <div class="addCategoryInTask ${element['category']['color']}">
                <p>${element['category']['name']}</p>
            </div>
            <div>
                <p>${element['title']}</p>
            </div>
            <div>
                <p>${element['description']}</p>
            </div>
            <div class="assignTaskSelect">
                <div class="assignTaskSelectName">
                    ${initialsContainer}
                </div>
                <div class="assignTaskSelectImage">
                   <img src="${element['prio']['coloredImage']}">
                </div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < dones.length; i++) {
        const element = dones[i];

        let nameParts = element['assignedTo'];
        let initialsContainer = '';

        for (let j = 0; j < nameParts.length; j++) {
            let name = nameParts[j].split(' ');
            initialsContainer += `
            <div class="assignTask">
                <div class="divAssignTask">${name[0][0]}${name[1][0]}</div>
            </div>
          `;
        }


        containerDone.innerHTML += /*html*/ `
       <div onclick="openCheckTask(${i})" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <div class="addCategoryInTask ${element['category']['color']}">
                <p>${element['category']['name']}</p>
            </div>
            <div>
                <p>${element['title']}</p>
            </div>
            <div>
                <p>${element['description']}</p>
            </div>
            <div class="assignTaskSelect">
                <div class="assignTaskSelectName">
                    ${initialsContainer}
                </div>
                <div class="assignTaskSelectImage">
                   <img src="${element['prio']['coloredImage']}">
                </div>
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
    document.getElementById('dueDate').value = '';
    document.getElementById('assignedAddContact').innerHTML = '';
    resetCheckboxes()
    resetSettingsCategory()
    resetSettingsChangeColor()
    resetSubtasks()
}

/** Area for Category */

function openCategory() {

    if (newCategorySelected) {
        return; // Funktion abbrechen
    }

    // Öffnen - Wird nicht ausgeführt nach einem return
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
    const selectedElement = document.getElementById(id);
    const name = selectedElement.querySelector('.taskCategory').innerHTML;
    const color = selectedElement.querySelector('.categoryMedia').classList[1];
    allLiCategory = ({ name, color });

    let ulCategory = document.getElementById("categoryList");
    let category = document.getElementById(id).innerHTML;

    document.getElementById('selectTaskCategory').style = 'display: flex; align-items: center; list-style-type: none; margin-left: -18px;';
    document.getElementById("selectTaskCategory").innerHTML = category;


    ulCategory.classList.add('d-none');
    document.getElementById('borderButton').classList.remove('borderButton');




}

function selectNewCategory() {

    let selectNewCategory = document.getElementById('selectNewCategory');
    selectNewCategory.value = ``;
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

    newCategorySelected = true;
}

function resetSettingsCategory() {
    let selectTaskCategory = document.getElementById("selectTaskCategory");
    document.getElementById("selectTaskCategory").innerHTML = '';
    document.getElementById('selectTaskCategory').style = 'margin-left: 0px;';
    selectTaskCategory.innerHTML = "Select Task Category";
}

function selectNewCatagoryCancel() {
    document.getElementById('selectNewCategoryImg').classList.add('d-none');
    document.getElementById('containerColorPicker').classList.add('d-none');
    document.getElementById('selectNewCategory').classList.add('d-none');
    document.getElementById('selectTaskCategory').classList.remove('d-none');
    document.getElementById('selectTaskCategoryImg').classList.remove('d-none');
    document.getElementById('categoryList').classList.remove('d-none');
    newCategorySelected = false;

}

function createNewCategory() {
    newCategory = document.getElementById('selectNewCategory').value;

    let jsonColor = {
        'name': newCategory,
        'color': currentCategoryColor,
    }

    if (newCategory.length > 0) {
        if (currentCategoryColor) {
            let categoryExists = allCategorys.some(category => category.name === newCategory && category.color === currentCategoryColor);
            if (!categoryExists) {
                allCategorys.push(jsonColor);
                selectNewCatagoryCancel();
                createnewCategoryAll();
                newCategorySelected = false;
            } else {
                alert("Eine Kategorie mit demselben Namen und derselben Farbe existiert bereits.");
            }
        } else {
            alert("Bitte wählen Sie eine Farbe für die neue Kategorie aus.");
        }
    }


    document.getElementById('bg-pink').style = 'box-shadow: none;';
    document.getElementById('bg-orange').style = 'box-shadow: none;';
    document.getElementById('bg-green').style = 'box-shadow: none;';
    document.getElementById('bg-turquoise').style = 'box-shadow: none;';
    document.getElementById('bg-yellow').style = 'box-shadow: none;';
    document.getElementById('bg-blue').style = 'box-shadow: none;';
}

function createnewCategoryAll() {
    newCategorys = document.getElementById('createNewTategory');
    newCategorys.innerHTML = '';

    for (let i = 0; i < allCategorys.length; i++) {
        const element = allCategorys[i];

        newCategorys.innerHTML += /*html*/ `
            <div onclick="selectCategory(id)" id="${element['name']}" class="categoryMediaDivSmoll">
                <li class="taskCategory">${element['name']}</li>
                <div class="categoryMedia ${element['color']}"></div>
            </div>
        `;
    }

}

function newCategorySelectColor(id) {
    currentCategoryColor = id;
    let colorPickers = document.getElementsByClassName('colorPicker')

    for (let item of colorPickers) {
        item.style = '';
    }

    document.getElementById(id).style = 'box-shadow: 0px 10px 12px -6px #000000;';

}


/** Area for Assigned To */

function openContacts() {
    let allContacts = document.getElementById('assignedToList');

    if (allContacts.classList.contains('d-none')) {
        allContacts.classList.remove('d-none');
        document.getElementById('openContact').classList.add('assignedDivBorderToEdit');
    } else {
        allContacts.classList.add('d-none');
        document.getElementById('openContact').classList.remove('assignedDivBorderToEdit');

    }
}

function selectContacted(id, i) {

    let chackedBox = document.getElementById(id);

    if (chackedBox.checked) {
        assignedChackedBox.push(chackedBox.value);
    } else {
        //remove value from array when it is unchecked
        assignedChackedBox = assignedChackedBox.filter(e => e !== chackedBox.value);
    }

    addContact(i);

}

function addContact(i) {
    let assignedAddContact = document.getElementById('assignedAddContact');


    let contact = allContactsTest[i];
    // Abrufen der Farbe des Kontakts
    let color = contact.color;
    console.log('Das ist die Farbe', color)


    assignedAddContact.innerHTML = '';

    for (let j = 0; j < assignedChackedBox.length; j++) {
        const element = assignedChackedBox[j];
        const firstLetters = getFirstLetters(element);

        assignedAddContact.innerHTML += /*html*/ `
       <div class="assignedAddContactDivs" style="background-color: ${color}">
        <p class="assignedAddContactLetters">${firstLetters}</p>          
        </div>
        `;

    }

}

function resetCheckboxes() {
    assignedChackedBox = [];

    // Get all checkbox elements in the document
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Iterate over the checkboxes and set the checked property to false
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

function getFirstLetters(str) {
    const words = str.split(' ');
    const firstLetters = words.map(word => word[0]);
    return firstLetters.join('');
}

function openAllContacts() {
    let assignedToList = document.getElementById('assignedToList');
    assignedToList.innerHTML = '';

    for (let i = 0; i < allContactsTest.length; i++) {
        const element = allContactsTest[i];

        assignedToList.innerHTML += /*html*/ `
        <label class="assignedToListBox">
            <li class="taskAssignedTo">${element['name']}</li>
            <input  onclick="selectContacted(id, ${i})" class="inputCheckbox" type="checkbox" value="${element['name']}" id="${element['name']}">
        </label>
    `;
    }

}

/** Area for Subtask */

function openSubtask() {
    document.getElementById('subtasksAddImg').classList.add('d-none');
    document.getElementById('subtsasksCancelImg').classList.remove('d-none');
    document.getElementById('subtasksSubLine').classList.remove('d-none');
    document.getElementById('subtasksChackImg').classList.remove('d-none');

}

function subtasksCancel() {
    document.getElementById('subtasksAddImg').classList.remove('d-none');
    document.getElementById('subtsasksCancelImg').classList.add('d-none');
    document.getElementById('subtasksSubLine').classList.add('d-none');
    document.getElementById('subtasksChackImg').classList.add('d-none');
    document.getElementById('openSubtasks').value = '';
}

function addSubtasks() {
    let openSubtasks = document.getElementById('openSubtasks').value;


    if (openSubtasks.length > 0) {
        allSubtasks.push(openSubtasks);
        Subtasks()
    }

    document.getElementById('openSubtasks').value = '';
}


function Subtasks() {
    let allAddSubtasks = document.getElementById('allAddSubtask');
    allAddSubtasks.innerHTML = '';

    for (let i = 0; i < allSubtasks.length; i++) {
        const element = allSubtasks[i];

        allAddSubtasks.innerHTML += /*html*/ `
      <div class="checkboxSubtasksContainer">
          <input id="subtask-${i}" class="checkboxSubtasks" type="checkbox" data-value="${element}">
          <p class="subtasksComent">${element}</p>
      </div>
      `;
    }

    document.querySelectorAll('.checkboxSubtasks').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const value = this.dataset.value;
            if (this.checked) {
                selectedSubtasks.push(value);
            } else {
                const index = selectedSubtasks.indexOf(value);
                if (index > -1) {
                    selectedSubtasks.splice(index, 1);
                }
            }
        });
    });

    subtasksCancel();
}

function resetSubtasks() {
    document.getElementById('allAddSubtask').innerHTML = '';
    selectedSubtasks = [];
    allSubtasks = [];
}

/** Area for openCheckTask */

function openCheckTask(taskIndex) {
    document.getElementById('closeContainer2').classList.remove('d-none');
    let container = document.getElementById('checkTaskSmall');
    container.innerHTML = '';

    let names = allTasks[taskIndex];
    let nameParts = (names.assignedTo);
    let initialsContainer = '';
    for (let j = 0; j < nameParts.length; j++) {
        let name = nameParts[j].split(' ');
        initialsContainer += /*html*/ `
        <div class="openCheckAssignTask">
            <div class="openCheckDivAssignTask">${name[0][0]}${name[1][0]}</div>
        </div>
      `;
    }

    let fullNames = allTasks[taskIndex];
    let fullNameParts = (fullNames.assignedTo);
    let fullNameInitialsContainer = '';
    for (let j = 0; j < fullNameParts.length; j++) {
        let name = nameParts[j];
        fullNameInitialsContainer += /*html*/ `
        <div class="openCheckAssignTaskDivFullName">
            <p class="openCheckAssignTaskFullName">${name}</p>
        </div>    
      `;
    }


    let task = allTasks[taskIndex];
    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    container.innerHTML = /*html*/ `
        <div class="openCheckTaskBigDiv">
            <div class="openCheckTasksCategory ${task.category.color}">
                <p class="openCheckTasksCategoryTesx" >${task.category.name}</p>
            </div>

            <div class="openCheckTasksTitle">
                <p class="openCheckTasksTitleTest">${task.title}</p>
            </div>

            <div class="openCheckTasksDescription">
                <p class="openCheckTasksDescriptionTest">${task.description}</p>
            </div>

            <div class="openCheckTasksDateDiv">
                <p class="openCheckTasksDateText">Due date:</p> <p class="openCheckTasksDateFormat">${formattedDate}</p>
            </div>

            <div class="openCheckTasksPrioDiv">
                <div>
                    <p class="openCheckTasksPrioText">Priority:</p>
                </div>
                <div class="openCheckTasksPrioTextDiv ${task.prio.color}">
                    <p class="openCheckTasksPrioTextText">${task.prio.text}</p>
                    <img  class="openCheckTasksPrioTextImage" src="${task.prio.whiteImage}">
                </div>
            </div>

            <div>
                <p class="openCheckTasksAssignedToTitle">Assigned To:</p>
                <div class="openCheckTasksAssignedToSmallDiv">
                    <div>
                        ${initialsContainer}
                    </div>
                    <div class="openCheckTasksAssignedToBoxFullName">
                       ${fullNameInitialsContainer}
                    </div>
                </div>
            </div>

            <button class="toEditTaskButton">
                <img onclick="openTaskToEdit(${taskIndex})" class="toEditTaskImage" src="/asseds/img/Group 8.png">
            </button>
          <div onclick="closeContainer1()" class="closes2">&times;</div>
        </div>
       
    `;
}


function openTaskToEdit(taskIndex) {
    document.getElementById('checkTaskSmall').classList.add('d-none');
    document.getElementById('toEditTaskMainDiv').classList.remove('d-none');
    // let toEditTask = document.getElementById('toEditTaskMainDiv');
    // toEditTask.innerHTML = '';

    let task = allTasks[taskIndex];

    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toISOString().substring(0, 10);

    // let nameParts = (task.assignedTo);
    // let initialsContainer = '';

    // for (let j = 0; j < nameParts.length; j++) {
    //     let name = nameParts[j].split(' ');
    //     initialsContainer += /*html*/ `
    //         <div class="assignTask">
    //             <div class="divAssignTask">${name[0][0]}${name[1][0]}</div>
    //         </div>
    //       `;
    // }

    let nameParts = (task.assignedTo);
    let assignedToList = document.getElementById('assignedToListToEdit');

    for (let j = 0; j < nameParts.length; j++) {
        let name = nameParts[j].split(' ');

        let label = document.createElement('label');
        label.classList.add('assignedToListBox');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = name;
        checkbox.id = name + 'ToEdit';
        checkbox.classList.add('inputCheckbox');
        checkbox.setAttribute('onclick', "selectContactedToEdit(id, " + taskIndex + ")");
        checkbox.checked = true;

        let li = document.createElement('li');
        li.classList.add('taskAssignedTo');
        li.textContent = name;

        let div = document.createElement('div');
        div.classList.add('divAssignTask');
        div.textContent = name[0][0] + name[1][0];

        label.appendChild(checkbox);
        label.appendChild(div);
        label.appendChild(li);


        console.log('das ist der assignedToList Wert', assignedToList);

        assignedToList.appendChild(label);
    }

    let toEditTaskMainDiv = document.getElementById('toEditTaskMainDiv');
    toEditTaskMainDiv.innerHTML = /*html*/ `
        <div class="toEditopenCheckTaskBigDiv" id="editTaskForm">
            <div class="toEditTaskTitleDiv">
                <label class="titleInputFields" for="editTaskTitle">Title</label>
                <input class="toEditTaskTitelInput" type="text" id="editTaskTitle" value="${task.title}">
            </div>
            
            <div class="toEditTaskTitleDiv">
                <label class="titleInputFields" for="editTaskDescription">Description</label>
                <textarea class="toEditTaskDescriptionInput" id="editTaskDescription">${task.description}</textarea>
            </div>

            <div class="toEditTaskTitleDiv">
                <label class="titleInputFields" for="editTaskDueDate">Due date</label>
                <input class="toEditTaskTitelInput" type="date" id="editTaskDueDate" value="${formattedDate}">
            </div>

            <p class="titleInputFields">Prio</p>
            <div id="prio" class="prio">
                <div id="toEditRed" onclick="toEditChangeColor(id)" class="prioContainer">Urgent
                    <img id="toEditRedImg" src="/asseds/img/pfeil-oben-rot.png">
                </div>
                <div id="toEditYellow" onclick="toEditChangeColor(id)" class="prioContainer">Medium
                    <img id="toEditYellowImg" class="medium" src="/asseds/img/medium-gelb.png">
                </div>
                <div id="toEditGreen" onclick="toEditChangeColor(id)" class="prioContainer">Low
                    <img id="toEditGreenImg" src="/asseds/img/pfeil-unten-grün.png">
                </div>
            </div>

            <p class="titleInputFields">Assigned to</p>
            <div id="openContactToEdit" onclick="openContactsToEdit()" class="assignedDiv">
                <p class="assignedContactsSelectToEdit" id="assignedContactsSelect">Select contacts to assigt</p>
                <img id="assignedContactImg" src="/asseds/img/Vector 2.png">
            </div>

            <ul id="assignedToListToEdit" class="assignedToListToEdit d-none">
                <label class="assignedToListBox">
                    <li class="taskAssignedTo">You</li>
                    <input onclick="selectContactedToEdit('You')" class="inputCheckbox" type="checkbox" value="You" id="You">
                </label>


                <label class="assignedToListBox">
                    <li class="taskAssignedTo">Artur Marbach</li>
                    <input  onclick="selectContactedToEdit(id, ${taskIndex})" class="inputCheckbox" type="checkbox" value="Artur Marbach" id="Artur_MarbachToEdit">
                </label>

                <label class="assignedToListBox">
                    <li class="taskAssignedTo">David Osipov</li>
                    <input onclick="selectContactedToEdit(id, ${taskIndex})" class="inputCheckbox" type="checkbox" value="David Osipov" id="David_OsipovToEdit">
                </label>

                <label class="assignedToListBox">
                    <li class="taskAssignedTo">Waldemar Neumann</li>
                    <input onclick="selectContactedToEdit(id, ${taskIndex})" class="inputCheckbox" type="checkbox" value="Waldemar Neumann" id="Waldemar_NeumannToEdit">
                </label>

                <label class="assignedToListBox">
                    <li class="taskAssignedTo">Jakob Neumann</li>
                    <input onclick="selectContactedToEdit(id, ${taskIndex})" class="inputCheckbox" type="checkbox" value="Jakob Neumann" id="Jakob_NeumannToEdit">
                </label>

                <label class="assignedToListBox">
                    <li class="taskAssignedTo">Oscar Neumann</li>
                    <input onclick="selectContactedToEdit(id, ${taskIndex})" class="inputCheckbox" type="checkbox" value="Oscar Neuamnn" id="Oscar_NeumannToEdit">
                </label>

            </ul>

            <div class="assignedAddContactToEdit" id="assignedAddContact">
                ${initialsContainer}
            </div>

            <button class="toEditTaskSaveButton" onclick="closeTaskToEdit()">
                <p class="toEditTaskButtonText">Ok</p>
                <img class="toEditTaskImage" src="/asseds/img/check.png">
            </button>

            <div onclick="closeContainer1()" class="closes2">&times;</div>
        </div>
    `;

    if (task.prio.text === 'Urgent') {
        document.getElementById('toEditRed').classList.add('red');
        document.getElementById('toEditRedImg').src = '/asseds/img/pfeil-oben-weiss.png';
    } else if (task.prio.text === 'Medium') {
        document.getElementById('toEditYellow').classList.add('yellow');
        document.getElementById('toEditYellowImg').src = '/asseds/img/medium-weiss.png';
    } else if (task.prio.text === 'Low') {
        document.getElementById('toEditGreen').classList.add('green');
        document.getElementById('toEditGreenImg').src = '/asseds/img/pfeil-unten-weiss.png';
    }
}

function closeTaskToEdit() {
    document.getElementById('checkTaskSmall').classList.remove('d-none');
    document.getElementById('toEditTaskMainDiv').classList.add('d-none');
}

function openContactsToEdit() {
    let allContacts = document.getElementById('assignedToListToEdit');

    if (allContacts.classList.contains('d-none')) {
        allContacts.classList.remove('d-none');
        document.getElementById('openContactToEdit').classList.add('assignedDivBorder');
    } else {
        allContacts.classList.add('d-none');
        document.getElementById('openContactToEdit').classList.remove('assignedDivBorder');
    }
}

function selectContactedToEdit(id, taskIndex) {
    let checkedBox = document.getElementById(id);
    let value = checkedBox.value;

    if (checkedBox.checked) {
        // Only add value to the array if it is not already present
        if (!allTasks[taskIndex].assignedTo.find(item => item === value)) {
            allTasks[taskIndex].assignedTo.push(value);
        }
    } else {
        // Remove value from the array when it is unchecked
        allTasks[taskIndex].assignedTo = allTasks[taskIndex].assignedTo.filter(item => item !== value);
    }

    // openTaskToEdit();
    // addTasking()
}



// function openTaskToEdit(taskIndex) {
//     document.getElementById('checkTaskSmall').classList.add('d-none');
//     document.getElementById('toEditTaskMainDiv').classList.remove('d-none');
//     // let toEditTask = document.getElementById('toEditTaskMainDiv');
//     // toEditTask.innerHTML = '';

//     let task = allTasks[taskIndex];

//     let toEditTaskMainDiv = document.getElementById('toEditTaskMainDiv');
//     toEditTaskMainDiv.innerHTML = /*html*/ `
//         <div class="toEditopenCheckTaskBigDiv" id="editTaskForm">
//             <div class="toEditTaskTitleDiv">
//                 <label class="titleInputFields" for="editTaskTitle">Title</label>
//                 <input class="toEditTaskTitelInput" type="text" id="editTaskTitle" value="${task.title}">
//             </div>

//             <div class="toEditTaskTitleDiv">
//             <label class="titleInputFields" for="editTaskDescription">Description</label>
//             <textarea class="toEditTaskDescriptionInput" id="editTaskDescription">${task.description}</textarea>
//         </div>

//             <div class="toEditTaskTitleDiv">
//                 <label class="titleInputFields" for="editTaskDueDate">Due date</label>
//                 <input class="toEditTaskTitelInput" type="date" id="editTaskDueDate" value="${task.dueDate}">
//             </div>


//             <label for="editTaskPrio">Priority:</label>
//             <select id="editTaskPrio">
//                 <option value="low" ${task.prio === 'low' ? 'selected' : ''}>Low</option>
//                 <option value="medium" ${task.prio === 'medium' ? 'selected' : ''}>Medium</option>
//                 <option value="high" ${task.prio === 'high' ? 'selected' : ''}>High</option>
//             </select>
//             <br>
//             <label for="editTaskAssignedTo">Assigned to:</label>
//             <input type="text" id="editTaskAssignedTo" value="${task.assignedTo.join(', ')}">
//             <br>
//             <input type="submit" value="Save">
//             <div onclick="closeContainer1()" class="closes2">&times;</div>
//         </div>
//     `;

//     let form = document.getElementById('editTaskForm');
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();

//         let newTitle = document.getElementById('editTaskTitle').value;
//         let newDescription = document.getElementById('editTaskDescription').value;
//         let newDueDate = document.getElementById('editTaskDueDate').value;
//         let newPrio = document.getElementById('editTaskPrio').value;
//         let newAssignedTo = document.getElementById('editTaskAssignedTo').value.split(',').map(s => s.trim());

//         allTasks[taskIndex].title = newTitle;
//         allTasks[taskIndex].description = newDescription;
//         allTasks[taskIndex].dueDate = newDueDate;
//         allTasks[taskIndex].prio = newPrio;
//         allTasks[taskIndex].assignedTo = newAssignedTo;

//         // Update the task's details in the user interface
//         // (e.g. by calling a function to render the updated task)
//     });

// }