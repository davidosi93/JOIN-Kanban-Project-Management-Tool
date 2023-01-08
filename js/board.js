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
let allContactsTest = [{
        'color': '#3FB1C6',
        'email': 'waldemar@gmx.de',
        'name': 'Waldemar Neumann',
        'phone': '15512 523555156',

    },
    {
        'color': '#448243',
        'email': 'david@gmx.de',
        'name': 'David Osipov',
        'phone': '15512 523555156',

    },
    {
        'color': '#73EE11',
        'email': 'artut@gmx.de',
        'name': 'Artur Marbach',
        'phone': '15512 523555156',

    },
    {
        'color': '#BD012A',
        'email': 'Jakob@gmx.de',
        'name': 'Jakob Neumann',
        'phone': '15512 523555156',

    },
    {
        'color': '#017637',
        'email': 'nikita@gmx.de',
        'name': 'Nikita Neumann',
        'phone': '15512 523555156',

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

        let totalNames = element['allTasks'].length;

        let nameParts = element['assignedTo'];
        let initialsContainer = '';

        for (let j = 0; j < nameParts.length; j++) {
            let name = nameParts[j]['name'].split(' ');
            let color = nameParts[j]['color'];
            initialsContainer += /*html*/ `
                <div class="assignTask">
                    <div class="divAssignTask" style="background-color: ${color}">${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}</div>
                </div>
            `;
        }

        let names = element['subtask'];
        let progress = (names.length / element['totalNames']) * 100;


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

            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${progress}%;"></div>
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
            let name = nameParts[j]['name'].split(' ');
            let color = nameParts[j]['color'];
            initialsContainer += /*html*/ `
                <div class="assignTask">
                    <div class="divAssignTask" style="background-color: ${color}">${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}</div>
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
            let name = nameParts[j]['name'].split(' ');
            let color = nameParts[j]['color'];
            initialsContainer += /*html*/ `
                <div class="assignTask">
                    <div class="divAssignTask" style="background-color: ${color}">${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}</div>
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
            let name = nameParts[j]['name'].split(' ');
            let color = nameParts[j]['color'];
            initialsContainer += /*html*/ `
                <div class="assignTask">
                    <div class="divAssignTask" style="background-color: ${color}">${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}</div>
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

function selectContacted(id) {
    let chackedBox = document.getElementById(id);

    if (chackedBox.checked) {
        // Add name and color to the assignedChackedBox array
        let elementIndex = allContactsTest.findIndex(element => element.name === chackedBox.value);
        let elementColor = allContactsTest[elementIndex]['color'];
        assignedChackedBox.push({
            'name': chackedBox.value,
            'color': elementColor
        });
    } else {
        // Remove name and color from the assignedChackedBox array when it is unchecked
        assignedChackedBox = assignedChackedBox.filter(e => e.name !== chackedBox.value);
    }

    addContact();
}


function addContact() {
    let assignedAddContact = document.getElementById('assignedAddContact');

    assignedAddContact.innerHTML = '';

    for (let i = 0; i < assignedChackedBox.length; i++) {
        const element = assignedChackedBox[i];

        let nameParts = element['name'].split(' ');
        let firstName = nameParts[0];
        let lastName = nameParts[1];

        // Display only the first letter of the first and last name
        let abbreviatedName = firstName[0] + lastName[0];

        assignedAddContact.innerHTML += /*html*/ `
       <div class="assignedAddContactDivs" style="background-color: ${element['color']}">
        <p class="assignedAddContactLetters">${abbreviatedName}</p>          
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
            <input  onclick="selectContacted(id)" class="inputCheckbox" type="checkbox" value="${element['name']}" id="${element['name']}">
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
                if (!selectedSubtasks.includes(value)) {
                    selectedSubtasks.push(value);
                }
            } else {
                const index = selectedSubtasks.indexOf(value);
                if (index > -1) {
                    selectedSubtasks.splice(index, 1);
                }
            }
        });
    });

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

    let initialsName = openCheckTaskNames(taskIndex);
    let fullinitialsName = openCheckTaskFullNames(taskIndex);
    let subinitialContainer = openCheckTaskSubtasks(taskIndex);
    let dateFormatted = dateOpenCheckTask(taskIndex);

    let task = allTasks[taskIndex];

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
                <p class="openCheckTasksDateText">Due date:</p> <p class="openCheckTasksDateFormat">${dateFormatted}</p>
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
                        ${initialsName}
                    </div>
                    <div class="openCheckTasksAssignedToBoxFullName">
                       ${fullinitialsName}
                    </div>
                </div>
            </div>

            <div id="openCheckTasksAssignedToTitle">
                <p class="openCheckTasksAssignedToTitle">Subtasks:</p>
                ${subinitialContainer}
            </div>

            <button class="toEditTaskButton">
                <img onclick="openTaskToEdit(${taskIndex})" class="toEditTaskImage" src="/asseds/img/Group 8.png">
            </button>
          <div onclick="closeContainer1()" class="closes2">&times;</div>
        </div>
       
    `;

    openCheckTaskTakeInputValue()

}

function dateOpenCheckTask(taskIndex) {
    let task = allTasks[taskIndex];
    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formattedDate;
}

function openCheckTaskNames(taskIndex) {
    let names = allTasks[taskIndex];
    let nameParts = (names.assignedTo);
    let initialsContainer = '';
    for (let j = 0; j < nameParts.length; j++) {
        let name = nameParts[j]['name'].split(' ');
        let color = nameParts[j]['color'];
        initialsContainer += /*html*/ `
        <div class="openCheckAssignTask">
            <div class="openCheckDivAssignTask" style="background-color: ${color}">${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}</div>
        </div>
      `;
    }
    return initialsContainer;

}

function openCheckTaskFullNames(taskIndex) {
    let fullNames = allTasks[taskIndex];
    let fullNameParts = (fullNames.assignedTo);
    let fullNameInitialsContainer = '';
    for (let j = 0; j < fullNameParts.length; j++) {
        let name = fullNameParts[j]['name'];
        fullNameInitialsContainer += /*html*/ `
        <div class="openCheckAssignTaskDivFullName">
            <p class="openCheckAssignTaskFullName">${name}</p>
        </div>    
      `;
    }
    return fullNameInitialsContainer;
}

function openCheckTaskSubtasks(taskIndex) {
    let subtasks = allTasks[taskIndex];
    let addSubtask = (subtasks.subtask);
    let subtaskInitialsContainer = '';

    if (addSubtask.length > 0) {
        for (let i = 0; i < addSubtask.length; i++) {
            let element = addSubtask[i];

            subtaskInitialsContainer += /*html*/ `
            <div class="checkboxSubtasksContainer">
                <input id="subtask-${i}" class="openCheckboxSubtasks" type="checkbox" data-value="${element}">
                <p class="openSubtasksComent">${element}</p>
          </div>   
          `;
        }
        // } 'else {
        //     document.getElementById('openCheckTasksAssignedToTitle').classList.add('d-none');'
    }

    return subtaskInitialsContainer;
}

function openCheckTaskTakeInputValue() {
    document.querySelectorAll('.openCheckboxSubtasks').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const value = this.dataset.value;
            if (this.checked) {
                if (!selectedSubtasks.includes(value)) {
                    selectedSubtasks.push(value);
                }
            } else {
                const index = selectedSubtasks.indexOf(value);
                if (index > -1) {
                    selectedSubtasks.splice(index, 1);
                }
            }
        });
    });
}


function openTaskToEdit(taskIndex) {
    document.getElementById('checkTaskSmall').classList.add('d-none');
    document.getElementById('toEditTaskMainDiv').classList.remove('d-none');

    let task = allTasks[taskIndex];
    let addContacts = openTaskToEditContacts();
    let duaDate = openTaskToEditDate(taskIndex);


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
                <input class="toEditTaskTitelInput" type="date" id="editTaskDueDate" value="${duaDate}">
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

            <div id="assignedToListToEdit" class="assignedToListToEdit d-none">
             
            </div>

            <div class="assignedAddContactToEdit" id="assignedAddContact">
                ${addContacts}
            </div>

            <button class="toEditTaskSaveButton" onclick="closeTaskToEdit()">
                <p class="toEditTaskButtonText">Ok</p>
                <img class="toEditTaskImage" src="/asseds/img/check.png">
            </button>

            <div onclick="closeContainer1()" class="closes2">&times;</div>
        </div>
    `;

    openTaskToEditPrioImage(taskIndex)
    showContactsInToEdit(taskIndex);
}

function openTaskToEditDate(taskIndex) {
    let task = allTasks[taskIndex];
    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toISOString().substring(0, 10);
    return formattedDate;
}

function openTaskToEditContacts() {
    let initialsContainer = '';
    for (let j = 0; j < assignedChackedBox.length; j++) {
        let name = assignedChackedBox[j]['name'].split(' ');
        let color = assignedChackedBox[j]['color'];
        initialsContainer += /*html*/ `
            <div class="assignTask">
                <div class="divAssignTask" style="background-color: ${color}">${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}</div>
            </div>
          `;
    }

    return initialsContainer;
}

function openTaskToEditPrioImage(taskIndex) {
    let task = allTasks[taskIndex];

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
    // assignedChackedBox = [];
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


function selectContactedToEdit(id) {
    let contact = allContactsTest.find(contact => contact.name === id);

    let index = assignedChackedBox.findIndex(c => c.name === contact.name);
    if (index === -1) {

        assignedChackedBox.push({ name: contact.name, color: contact.color });
    } else {

        assignedChackedBox.splice(index, 1);
    }
}



function showContactsInToEdit(taskIndex) {
    let toEdit = document.getElementById('assignedToListToEdit');
    toEdit.innerHTML = '';

    let currentContacts = allTasks[taskIndex];

    for (let i = 0; i < allContactsTest.length; i++) {
        const element = allContactsTest[i];

        let isAssigned = false;
        for (let j = 0; j < currentContacts.assignedTo.length; j++) {
            if (currentContacts.assignedTo[j].name === element['name']) {
                isAssigned = true;
                break;
            }
        }

        if (isAssigned) {
            toEdit.innerHTML += /*html*/ `
              <label class="assignedToListBox">
                  <li class="taskAssignedTo">${element['name']}</li>
                  <input  onclick="selectContactedToEdit(id)" class="inputCheckbox" type="checkbox" value="${element['name']}" id="${element['name']}" checked>

              </label>
          `;
        } else {
            toEdit.innerHTML += /*html*/ `
              <label class="assignedToListBox">
                  <li class="taskAssignedTo">${element['name']}</li>
                  <input  onclick="selectContactedToEdit(id)" class="inputCheckbox" type="checkbox" value="${element['name']}" id="${element['name']}">
              </label>
          `;
        }
    }

    showContactsInToEditPushInAssigned()

}

function showContactsInToEditPushInAssigned() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        const name = checkbox.value;
        const color = allContactsTest.find(contact => contact.name === name).color;
        assignedChackedBox.push({
            name,
            color
        });
    }
}


//---

// let contacts = (task.assignedTo);
// let initialsContainer0 = '';
// for (let i = 0; i < allContactsTest.length; i++) {
//     const element = allContactsTest[i];

//     let isAssigned = false;
//     for (let j = 0; j < contacts.length; j++) {
//         if (contacts[j].name === element['name']) {
//             isAssigned = true;
//             break;
//         }
//     }

//     if (isAssigned) {
//         initialsContainer0.innerHTML += /*html*/ `
//           <label class="assignedToListBox">
//               <li class="taskAssignedTo">${element['name']}</li>
//               <input  onclick="selectContactedToEdit(id)" class="inputCheckbox" type="checkbox" value="${element['name']}" id="${element['name']}" checked>

//           </label>
//       `;
//     } else {
//         initialsContainer0.innerHTML += /*html*/ `
//           <label class="assignedToListBox">
//               <li class="taskAssignedTo">${element['name']}</li>
//               <input  onclick="selectContactedToEdit(id)" class="inputCheckbox" type="checkbox" value="${element['name']}" id="${element['name']}">
//           </label>
//       `;
//     }
// }

// const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
// for (let i = 0; i < checkboxes.length; i++) {
//     const checkbox = checkboxes[i];
//     const name = checkbox.value;
//     const color = allContactsTest.find(contact => contact.name === name).color;
//     assignedChackedBox.push({
//         name,
//         color
//     });
// }

//---