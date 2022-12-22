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

function openCheckTask(taskIndex) {
    document.getElementById('closeContainer2').classList.remove('d-none');
    let container = document.getElementById('checkTaskSmall');
    container.innerHTML = '';

    let task = allTasks[taskIndex];

    container.innerHTML = /*html*/ `
    <div>
      <h2>${task.title}</h2>
      <p>${task.description}</p>
      <p>Category: ${task.category.name}</p>
      <p>Due Date: ${task.dueDate}</p>
    </div>
    `;
    // // container.classList.add('visible');
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
            initialsContainer += `
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
                   <img src="${element['prio']['image']}">
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
                   <img src="${element['prio']['image']}">
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
                   <img src="${element['prio']['image']}">
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
                   <img src="${element['prio']['image']}">
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
        document.getElementById('openContact').classList.add('assignedDivBorder');
    } else {
        allContacts.classList.add('d-none');
        document.getElementById('openContact').classList.remove('assignedDivBorder');

    }
}

function selectContacted(id) {

    let chackedBox = document.getElementById(id);

    if (chackedBox.checked) {
        assignedChackedBox.push(chackedBox.value);
    } else {
        //remove value from array when it is unchecked
        assignedChackedBox = assignedChackedBox.filter(e => e !== chackedBox.value);
    }

    addContact()

}

function addContact() {
    let assignedAddContact = document.getElementById('assignedAddContact');

    assignedAddContact.innerHTML = '';

    for (let i = 0; i < assignedChackedBox.length; i++) {
        const element = assignedChackedBox[i];
        const firstLetters = getFirstLetters(element);

        assignedAddContact.innerHTML += /*html*/ `
        <div class="assignedAddContactDivs">
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