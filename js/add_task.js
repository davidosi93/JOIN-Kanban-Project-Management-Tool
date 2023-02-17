let allCategorys = [];
let assignedChackedBoxes = [];
let colorArray = [];
let allSubtaskss = [];
let selectedSubtaskss = [];
let selectedSubtasksForProgreses = [];
let selectedSubtasksProgress = [];
let allLiCategorys;
let currentCategoryColor;
let currentIndex = 0;
let newCategorySelected = false;

function onSubmits(event) {
    event.preventDefault();
    addTasks()
}


// load all first functions for show the site

async function initLoadTasksAddTask() {
    includeHTML();
    await getAllTasks();
    openAllContactss();
    createnewCategoryAlls();
    loadActiveUsers();
    navBarHighlight(3);
    controllMediaQuery();
}



function controllMediaQuery() {
    let header = document.getElementById('userButton');
    let content = document.getElementById('addTaskatMobile');
    let x = window.matchMedia("(max-width: 900px)")
    if (x.matches) {
        // content.innerHTML = '';
        // watchAddTaskOnMobileVersion(content);
        header.classList.add('d-none');
        document.getElementById('createTask').classList.remove('d-none');
        document.getElementById('logoMobile').classList.remove('d-none');
    } else {
        document.getElementById('createTask').classList.add('d-none');
        document.getElementById('logoMobile').classList.add('d-none');
    }
}


// create a massege when the category array is empty

function addInfoToTakeCategory(task) {
    if (!task.category || task.category.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie eine Kategorie aus.';
        errorContainer.style.display = 'block';
        setTimeout(function() {
            errorContainer.style.display = 'none';
        }, 1000);
        return;
    }
    return true;
}


// create a massege when the assigned to array is empty

function addInfoToTakeAssignedTo(task) {
    if (!task.assignedTo || task.assignedTo.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie die Verantwortlichen.';
        errorContainer.style.display = 'block';
        setTimeout(function() {
            errorContainer.style.display = 'none';
        }, 1000);
        return;
    }
    return true;
}


// create a massege when the prio array is empty

function addInfoToTakePrio(task) {
    if (!task.prio || task.prio.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie eine Priorität.';
        errorContainer.style.display = 'block';
        setTimeout(function() {
            errorContainer.style.display = 'none';
        }, 1000);
        return;
    }
    return true;
}


// create a massege when create an task is done

function addInfoToTakeAnTask() {
    let successContainer = document.getElementById('div');
    successContainer.classList.remove('d-none');
    successContainer.innerHTML = 'Task wurde erfolgreich erstellt.';
    successContainer.style.display = 'block';
    setTimeout(function() {
        successContainer.style.display = 'none';
    }, 1000);

}


// return the information in create an task for massege

function validateTask(task) {
    if (!addInfoToTakeCategory(task)) {
        return false;
    }

    if (!addInfoToTakeAssignedTo(task)) {
        return false;
    }

    if (!addInfoToTakePrio(task)) {
        return false;
    }

    return true;
}



// preparing to create a task

async function addTasks() {
    let title = document.getElementById('titles').value;
    let description = document.getElementById('descriptions').value;
    let dueDate = document.getElementById('dueDates').value;

    let task = {
        'title': title,
        'description': description,
        'category': allLiCategorys,
        'dueDates': dueDate,
        'assignedTo': assignedChackedBoxes,
        'prio': colorArray,
        'subtask': selectedSubtaskss,
        'subtaskChecked': selectedSubtasksForProgreses,
        'id': new Date().getTime(),
        'list': 'todo',
    };

    if (!validateTask(task)) {
        return;
    }

    // allTasks.push(task);
    users[activeUser]['tasks'].push(task);
    await backend.setItem('users', JSON.stringify(users));
    addInfoToTakeAnTask()
    inputfieldsValues()



}


// load the active user

function loadActiveUsers() {
    let activeUsers = document.getElementById('headerContents');
    activeUsers.innerHTML = '';

    const name = users[activeUser]['initials'];
    const color = users[activeUser]['color'];
    activeUsers.innerHTML = loadActiveUsersHTML(name, color);
}


// open the help containe

function help() {
    document.getElementById('help').classList.remove('d-none');
    document.getElementById('mainContents').classList.add('d-none');
}


// close the help container

function goBacktoMainContainer() {
    document.getElementById('help').classList.add('d-none');
    document.getElementById('mainContents').classList.remove('d-none');
}


// reset all inputfield after create an task 

function inputfieldsValues() {
    document.getElementById('titles').value = '';
    document.getElementById('descriptions').value = '';
    document.getElementById('dueDates').value = '';
    document.getElementById('addTask_assignedAddContact').innerHTML = '';
    resetCheckboxes();
    resetSettingsCategorys();
    resetSettingsChangeColors();
    resetSubtaskss();


}



/** Area for Category */


// open the list for create and choose an category

function openCategory() {

    if (newCategorySelected) {
        return; // Funktion abbrechen
    }

    // Öffnen - Wird nicht ausgeführt nach einem return
    let category = document.getElementById('addTask_categoryList');
    if (category.classList.contains('d-none')) {
        category.classList.remove('d-none');
        document.getElementById('addTask_borderButton').classList.add('borderButton');
    } else {
        category.classList.add('d-none');
        document.getElementById('addTask_borderButton').classList.remove('borderButton');
    }

}


// open and close the field if ist is not open

function ifselectNewCategory() {
    document.getElementById('addTask_selectTaskCategory').classList.add('d-none');
    document.getElementById('addTask_categoryList').classList.add('d-none');
    document.getElementById('addTask_borderButton').classList.remove('borderButton');
    document.getElementById('addTask_containerColorPicker').classList.remove('d-none');
    document.getElementById('addTask_selectNewCategoryImg').classList.remove('d-none');
    document.getElementById('addTask_selectTaskCategoryImg').classList.add('d-none');
}


// open and close the field else ist is not open

function elseselectNewCategory() {
    document.getElementById('addTask_selectTaskCategory').classList.remove('d-none');
    document.getElementById('addTask_categoryList').classList.remove('d-none');
    document.getElementById('addTask_borderButton').classList.add('borderButton');
    document.getElementById('addTask_containerColorPicker').classList.add('d-none');
    document.getElementById('addTask_selectNewCategoryImg').classList.add('d-none');
    document.getElementById('addTask_selectTaskCategoryImg').classList.remove('d-none');
}


// open the field for create an new category

function selectNewCategory() {

    let selectNewCategory = document.getElementById('addTask_selectNewCategory');
    selectNewCategory.value = ``;
    if (selectNewCategory.classList.contains('d-none')) {
        selectNewCategory.classList.remove('d-none');
        ifselectNewCategory()

    } else {
        selectNewCategory.classList.add('d-none');
        elseselectNewCategory()
    }

    newCategorySelected = true;
}


// reset all collorpicker after create a new category

function resetAllColorpicker() {
    document.getElementById('bg-pink').style = 'box-shadow: none;';
    document.getElementById('bg-orange').style = 'box-shadow: none;';
    document.getElementById('bg-green').style = 'box-shadow: none;';
    document.getElementById('bg-turquoise').style = 'box-shadow: none;';
    document.getElementById('bg-yellow').style = 'box-shadow: none;';
    document.getElementById('bg-blue').style = 'box-shadow: none;';
}


// create a new category

async function createNewCategory() {
    const newCategory = document.getElementById('addTask_selectNewCategory').value;
    const currentCategoryColor = getCurrentCategoryColor();

    if (validateNewCategoryInput(newCategory, currentCategoryColor)) {
        const categoryExists = checkIfCategoryExists(newCategory, currentCategoryColor);

        if (!categoryExists) {
            const jsonColor = createJsonColor(newCategory, currentCategoryColor);
            addNewCategory(jsonColor);
            resetNewCategoryInput();
            showSuccessMessage('Eine neue Kategorie wurde erfolgreich erstellt.');
        } else {
            showErrorMessage('Eine Kategorie mit demselben Namen und derselben Farbe existiert bereits.');
        }
    }

    await backend.setItem('users', JSON.stringify(users));
    resetAllColorpicker();
}


// get current category color for create a category

function getCurrentCategoryColor() {
    return currentCategoryColor;
}


// validate New Category Input for creat a category

function validateNewCategoryInput(newCategory, currentCategoryColor) {
    if (!newCategory) {
        showErrorMessage('Bitte wählen Sie eine Kategorie aus');
        return false;
    }

    if (!currentCategoryColor) {
        showErrorMessage('Bitte wählen Sie eine Farbe für die neue Kategorie aus.');
        return false;
    }

    return true;
}


// check if category exists for create a category

function checkIfCategoryExists(newCategory, currentCategoryColor) {
    return users[activeUser]['categorys'].some(category => category.name === newCategory && category.color === currentCategoryColor);
}


// push the name and color in array JsonColor 

function createJsonColor(newCategory, currentCategoryColor) {
    return {
        'name': newCategory,
        'color': currentCategoryColor,
    };
}


// save the new category in activeuser and load a funktion for create a new category

function addNewCategory(jsonColor) {
    users[activeUser]['categorys'].push(jsonColor);
    createnewCategoryAlls();
}


// reset inputfield after create an new category

function resetNewCategoryInput() {
    currentCategoryColor = null;
    selectNewCatagoryCancel();
    newCategorySelected = false;
}


// show the massega - new category is create 

function showSuccessMessage(message) {
    showMessage(message, 'success');
}


// show the massega - plese choose a color for the new category 

function showErrorMessage(message) {
    showMessage(message, 'error');
}


// show massega - create a new category

function showMessage(message, type) {
    const container = document.getElementById('div');
    container.classList.remove('d-none');
    container.innerHTML = message;
    container.style.display = 'block';
    setTimeout(function() {
        container.style.display = 'none';
    }, 1000);
}





function newCategorySelectColor(id) {
    currentCategoryColor = id;
    let colorPickers = document.getElementsByClassName('addTask_colorPicker')

    for (let item of colorPickers) {
        item.style = '';
    }

    document.getElementById(id).style = 'box-shadow: 0px 10px 12px -6px #000000;';

}

function selectNewCatagoryCancel() {
    document.getElementById('addTask_selectNewCategoryImg').classList.add('d-none');
    document.getElementById('addTask_containerColorPicker').classList.add('d-none');
    document.getElementById('addTask_selectNewCategory').classList.add('d-none');
    document.getElementById('addTask_selectTaskCategory').classList.remove('d-none');
    document.getElementById('addTask_selectTaskCategoryImg').classList.remove('d-none');
    document.getElementById('addTask_categoryList').classList.remove('d-none');
    newCategorySelected = false;

}

function createnewCategoryAlls() {
    newCategorys = document.getElementById('addTask_createNewTategory');
    newCategorys.innerHTML = '';

    for (let i = 0; i < users[activeUser]['categorys'].length; i++) {
        const element = users[activeUser]['categorys'][i];

        newCategorys.innerHTML += /*html*/ `
            <div onclick="selectCategory(${currentIndex})" id="addTask_category-${currentIndex}" class="addTask_categoryMediaDivSmoll">
                <div class="addTask_categoryMediaDivSmollDiv">
                    <li class="addTask_taskCategory">${element['name']}</li>
                    <div class="addTask_categoryMedia ${element['color']}"></div>
                </div>
                <div onclick="deleteCategory(${i})" class="addTask_closes3">&times;</div>
            </div>
        `;
        currentIndex++;
    }
}


function selectCategory(id) {
    const selectedElement = document.getElementById(`addTask_category-${id}`);
    const name = selectedElement.querySelector('.addTask_taskCategory').innerHTML;
    const color = selectedElement.querySelector('.addTask_categoryMedia').classList[1];
    allLiCategorys = ({ name, color });

    let ulCategory = document.getElementById("addTask_categoryList");
    let category = selectedElement.querySelector('.addTask_categoryMediaDivSmollDiv').innerHTML;

    document.getElementById('addTask_selectTaskCategory').style = 'display: flex; align-items: center; list-style-type: none; margin-left: -18px;';
    document.getElementById("addTask_selectTaskCategory").innerHTML = category;

    ulCategory.classList.add('d-none');
    document.getElementById('addTask_borderButton').classList.remove('borderButton');
}

async function deleteCategory(i) {
    // allCategorys.splice(i, 1)
    users[activeUser]['categorys'].splice(i, 1);
    await backend.deleteItem('users', users);
    createnewCategoryAlls()
        // await backend.setItem('allCategorys', JSON.stringify(allCategorys));
    await backend.setItem('users', JSON.stringify(users));
}

function resetSettingsCategorys() {
    let selectTaskCategory = document.getElementById("addTask_selectTaskCategory");
    document.getElementById("addTask_selectTaskCategory").innerHTML = '';
    document.getElementById('addTask_selectTaskCategory').style = 'margin-left: 0px;';
    selectTaskCategory.innerHTML = "Select Task Category";
    allLiCategorys = [];
}

/** Area for Assigned To */

function openContactss() {
    let allContacts = document.getElementById('addTask_assignedToList');

    if (allContacts.classList.contains('d-none')) {
        allContacts.classList.remove('d-none');
        document.getElementById('addTask_openContact').classList.add('assignedDivBorderToEdit');
    } else {
        allContacts.classList.add('d-none');
        document.getElementById('addTask_openContact').classList.remove('assignedDivBorderToEdit');

    }
}

function openAllContactss() {
    let assignedToList = document.getElementById('addTask_assignedToList');
    assignedToList.innerHTML = '';

    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        const name = users[activeUser]['contacts'][i]['contactName'];

        assignedToList.innerHTML += /*html*/ `
        <label class="assignedToListBox">
            <li class="taskAssignedTo">${name}</li>
            <input  onclick="selectContacteds(id)" class="inputCheckbox" type="checkbox" value="${name}" id="${name}">
        </label>
    `;
    }

}

function selectContacteds(id) {
    let chackedBox = document.getElementById(id);

    if (chackedBox.checked) {

        let elementColor;
        for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
            if (users[activeUser]['contacts'][i].contactName === id) {
                elementColor = users[activeUser]['contacts'][i].contactColor;
                break;
            }
        }

        assignedChackedBoxes.push({
            'name': chackedBox.value,
            'color': elementColor
        });
    } else {

        assignedChackedBoxes = assignedChackedBoxes.filter(e => e.name !== chackedBox.value);
    }

    addContactss();
}



function addContactss() {
    let assignedAddContact = document.getElementById('addTask_assignedAddContact');

    assignedAddContact.innerHTML = '';

    for (let i = 0; i < assignedChackedBoxes.length; i++) {
        const element = assignedChackedBoxes[i];

        let nameParts = element['name'].split(' ');
        let firstName = nameParts[0];
        let lastName = nameParts[1];

        // Display only the first letter of the first and last name
        let addreviatedName = firstName[0] + lastName[0];

        assignedAddContact.innerHTML += /*html*/ `
       <div class="assignedAddContactDivs" style="background-color: ${element['color']}">
        <p class="assignedAddContactLetters">${addreviatedName}</p>          
        </div>
        `;

    }

}

function resetCheckboxes() {
    assignedChackedBoxes = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

/** Area for Prio */


// container for select the color and image of priority at to edit an task

function containerchangeColors() {
    const redElement = document.getElementById('addTask_Red');
    const yellowElement = document.getElementById('addTask_Yellow');
    const greenElement = document.getElementById('addTask_Green');

    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');

    document.getElementById('addRedImg').src = './asseds/img/pfeil-oben-rot.png';
    document.getElementById('addYellowImg').src = './asseds/img/medium-gelb.png';
    document.getElementById('addGreenImg').src = './asseds/img/pfeil-unten-grün.png';

    return { redElement, yellowElement, greenElement };
}

function changeColors(color) {
    const { redElement, yellowElement, greenElement } = containerchangeColors();

    let text;
    let coloredImage;
    let whiteImage;
    let actualColor;
    if (color === 'addTask_Red') {
        redElement.classList.add('red');
        document.getElementById('addRedImg').src = './asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim();
        coloredImage = './asseds/img/pfeil-oben-rot.png';
        whiteImage = './asseds/img/pfeil-oben-weiss.png';
        actualColor = 'red';
    } else if (color === 'addTask_Yellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('addYellowImg').src = './asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim();
        coloredImage = './asseds/img/medium-gelb.png';
        whiteImage = './asseds/img/medium-weiss.png';
        actualColor = 'yellow';
    } else if (color === 'addTask_Green') {
        greenElement.classList.add('green');
        document.getElementById('addGreenImg').src = './asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim();
        coloredImage = './asseds/img/pfeil-unten-grün.png';
        whiteImage = './asseds/img/pfeil-unten-weiss.png';
        actualColor = 'green';
    }

    colorArray = { color: actualColor, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}



function resetSettingsChangeColors() {
    document.getElementById('addTask_Red').classList.remove('red');
    document.getElementById('addRedImg').src = './asseds/img/pfeil-oben-rot.png';
    document.getElementById('addTask_Yellow').classList.remove('yellow');
    document.getElementById('addYellowImg').src = './asseds/img/medium-gelb.png';
    document.getElementById('addTask_Green').classList.remove('green');
    document.getElementById('addGreenImg').src = './asseds/img/pfeil-unten-grün.png';
    colorArray = [];
}

/** Area for Subtasks */

function openSubtasks() {
    document.getElementById('addTask_subtasksAddImg').classList.add('d-none');
    document.getElementById('addTask_subtsasksCancelImg').classList.remove('d-none');
    document.getElementById('addTask_subtasksSubLine').classList.remove('d-none');
    document.getElementById('addTask_subtasksChackImg').classList.remove('d-none');

}

function subtasksCancels() {
    document.getElementById('addTask_subtasksAddImg').classList.remove('d-none');
    document.getElementById('addTask_subtsasksCancelImg').classList.add('d-none');
    document.getElementById('addTask_subtasksSubLine').classList.add('d-none');
    document.getElementById('addTask_subtasksChackImg').classList.add('d-none');
    document.getElementById('addTask_openSubtasks').value = '';
}

function addSubtaskss() {
    let openSubtasks = document.getElementById('addTask_openSubtasks').value;


    if (openSubtasks.length > 0) {
        allSubtaskss.push(openSubtasks);
        Subtaskss()
    }

    document.getElementById('addTask_openSubtasks').value = '';
    subtasksCancels()
}

function Subtaskss() {
    let allAddSubtasks = document.getElementById('addTask_allAddSubtask');
    allAddSubtasks.innerHTML = '';

    for (let i = 0; i < allSubtaskss.length; i++) {
        const element = allSubtaskss[i];

        allAddSubtasks.innerHTML += /*html*/ `
      <div class="checkboxSubtasksContainer">
          <input id="addTask_subtask-${i}" class="checkboxSubtasks" type="checkbox" data-value="${element}">
          <p class="subtasksComent">${element}</p>
      </div>
      `;
    }

    document.querySelectorAll('.checkboxSubtasks').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const value = this.dataset.value;
            if (this.checked) {
                if (!selectedSubtaskss.includes(value)) {
                    selectedSubtaskss.push(value);
                }
            } else {
                const index = selectedSubtaskss.indexOf(value);
                if (index > -1) {
                    selectedSubtaskss.splice(index, 1);
                }
            }
        });
    });
}


function resetSubtaskss() {
    document.getElementById('addTask_allAddSubtask').innerHTML = '';
    selectedSubtaskss = [];
    allSubtaskss = [];
}