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

async function initLoadTasksAddTask() {
    includeHTML();
    await getAllTasks();
    openAllContactss();
    createnewCategoryAlls();
    loadActiveUsers();
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

// function watchAddTaskOnMobileVersion(content) {
//     let category = document.getElementById('category');
//     let categoryDiv = document.getElementById('addTask_borderButton');
//     let categoryList = document.getElementById('addTask_categoryList');
//     let categoryColor = document.getElementById('addTask_containerColorPicker');
//     let assigned = document.getElementById('assigned');
//     let assignedDiv = document.getElementById('addTask_openContact');
//     let dueDate = document.getElementById('dueDate');
//     let dueDates = document.getElementById('dueDates');
//     let subtask = document.getElementById('subtask');
//     let subtaskDiv = document.getElementById('subtaskDiv');





//     subtaskDiv.classList.add('display-none');
//     subtask.classList.add('display-none');
//     dueDates.classList.add('display-none');
//     dueDate.classList.add('display-none');
//     assignedDiv.classList.add('display-none');
//     assigned.classList.add('display-none');
//     categoryColor.classList.add('display-none');
//     categoryList.classList.add('display-none');
//     categoryDiv.classList.add('display-none');
//     category.classList.add('display-none');
      
// }


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

    if (!task.category || task.category.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie eine Kategorie aus.';
        errorContainer.style.display = 'block';
        setTimeout(function () {
            errorContainer.style.display = 'none';
        }, 2000);
        return;
    }

    if (!task.assignedTo || task.assignedTo.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie die Verantwortlichen.';
        errorContainer.style.display = 'block';
        setTimeout(function () {
            errorContainer.style.display = 'none';
        }, 2000);
        return;
    }

    if (!task.prio || task.prio.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie eine Priorität.';
        errorContainer.style.display = 'block';
        setTimeout(function () {
            errorContainer.style.display = 'none';
        }, 2000);
        return;
    }

    // allTasks.push(task);
    users[activeUser]['tasks'].push(task);
    await backend.setItem('users', JSON.stringify(users));

    inputfieldsValues()

    if (users[activeUser]['tasks'].push(task)) {
        let successContainer = document.getElementById('div');
        successContainer.classList.remove('d-none');
        successContainer.innerHTML = 'Task wurde erfolgreich erstellt.';
        successContainer.style.display = 'block';
        setTimeout(function () {
            successContainer.style.display = 'none';
        }, 2000);
    }

}


function loadActiveUsers() {
    let activeUsers = document.getElementById('headerContents');
    activeUsers.innerHTML = '';

    const name = users[activeUser]['initials'];
    const color = users[activeUser]['color'];
    activeUsers.innerHTML = /*html*/ `
        <p>Kanban Project Management Tool</p>
        <img id="logoMobile" class="logoMobile d-none" src="asseds/img/biglogo.png">
        <div class="headerContentRight">
            
        <button id="createTask" class="btnForMobile d-none"> Create Task
                        <img src="asseds/img/hacken.png">
                    </button>
            <img id="closeImgForMobile" onclick="help()" class="information" src="/asseds/img/information.png">
            <div id="userButton" onclick="showLogOutButton()" class="personLogIn" style="background-color: ${color}">
                    ${name}
                    
            </div>
            <div id="logOutButton" class="logOutButton d-none" onclick="logOut()">Log Out</div>
        </div>
    `;
}



function help() {
    document.getElementById('help').classList.remove('d-none');
    document.getElementById('mainContents').classList.add('d-none');
}

function goBacktoMainContainer() {
    document.getElementById('help').classList.add('d-none');
    document.getElementById('mainContents').classList.remove('d-none');
}

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

function selectNewCategory() {

    let selectNewCategory = document.getElementById('addTask_selectNewCategory');
    selectNewCategory.value = ``;
    if (selectNewCategory.classList.contains('d-none')) {
        selectNewCategory.classList.remove('d-none');
        document.getElementById('addTask_selectTaskCategory').classList.add('d-none');
        document.getElementById('addTask_categoryList').classList.add('d-none');
        document.getElementById('addTask_borderButton').classList.remove('borderButton');
        document.getElementById('addTask_containerColorPicker').classList.remove('d-none');
        document.getElementById('addTask_selectNewCategoryImg').classList.remove('d-none');
        document.getElementById('addTask_selectTaskCategoryImg').classList.add('d-none');

    } else {
        selectNewCategory.classList.add('d-none');
        document.getElementById('addTask_selectTaskCategory').classList.remove('d-none');
        document.getElementById('addTask_categoryList').classList.remove('d-none');
        document.getElementById('addTask_borderButton').classList.add('borderButton');
        document.getElementById('addTask_containerColorPicker').classList.add('d-none');
        document.getElementById('addTask_selectNewCategoryImg').classList.add('d-none');
        document.getElementById('addTask_selectTaskCategoryImg').classList.remove('d-none');
    }

    newCategorySelected = true;
}

async function createNewCategory() {
    newCategory = document.getElementById('addTask_selectNewCategory').value;
    let jsonColor = {
        'name': newCategory,
        'color': currentCategoryColor,
    }
    if (newCategory) {
        if (currentCategoryColor) {
            let categoryExists = users[activeUser]['categorys'].some(category => category.name === newCategory && category.color === currentCategoryColor);
            if (!categoryExists) {
                // allCategorys.push(jsonColor);
                users[activeUser]['categorys'].push(jsonColor);
                currentCategoryColor = null;
                selectNewCatagoryCancel();
                createnewCategoryAlls();
                newCategorySelected = false;
            } else {
                alert("Eine Kategorie mit demselben Namen und derselben Farbe existiert bereits.");
            }
        } else {
            alert("Bitte wählen Sie eine Farbe für die neue Kategorie aus.");
        }
    } else {
        alert("Bitte wählen Sie eine Kategorie aus");
    }

    // await backend.setItem('allCategorys', JSON.stringify(allCategorys));
    await backend.setItem('users', JSON.stringify(users));

    document.getElementById('bg-pink').style = 'box-shadow: none;';
    document.getElementById('bg-orange').style = 'box-shadow: none;';
    document.getElementById('bg-green').style = 'box-shadow: none;';
    document.getElementById('bg-turquoise').style = 'box-shadow: none;';
    document.getElementById('bg-yellow').style = 'box-shadow: none;';
    document.getElementById('bg-blue').style = 'box-shadow: none;';
    currentCategoryColor = null;
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

function changeColors(color) {
    const redElement = document.getElementById('addTask_Red');
    const yellowElement = document.getElementById('addTask_Yellow');
    const greenElement = document.getElementById('addTask_Green');

    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');

    document.getElementById('addRedImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('addYellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('addGreenImg').src = '/asseds/img/pfeil-unten-grün.png';

    let text;
    let coloredImage;
    let whiteImage;
    let actualColor;
    if (color === 'addTask_Red') {
        redElement.classList.add('red');
        document.getElementById('addRedImg').src = '/asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim();
        coloredImage = '/asseds/img/pfeil-oben-rot.png';
        whiteImage = '/asseds/img/pfeil-oben-weiss.png';
        actualColor = 'red';
    } else if (color === 'addTask_Yellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('addYellowImg').src = '/asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim();
        coloredImage = '/asseds/img/medium-gelb.png';
        whiteImage = '/asseds/img/medium-weiss.png';
        actualColor = 'yellow';
    } else if (color === 'addTask_Green') {
        greenElement.classList.add('green');
        document.getElementById('addGreenImg').src = '/asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim();
        coloredImage = '/asseds/img/pfeil-unten-grün.png';
        whiteImage = '/asseds/img/pfeil-unten-weiss.png';
        actualColor = 'green';
    }

    colorArray = { color: actualColor, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}



function resetSettingsChangeColors() {
    document.getElementById('addTask_Red').classList.remove('red');
    document.getElementById('addRedImg').src = '/asseds/img/pfeil-oben-rot.png';
    document.getElementById('addTask_Yellow').classList.remove('yellow');
    document.getElementById('addYellowImg').src = '/asseds/img/medium-gelb.png';
    document.getElementById('addTask_Green').classList.remove('green');
    document.getElementById('addGreenImg').src = '/asseds/img/pfeil-unten-grün.png';
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
        checkbox.addEventListener('change', function () {
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
























































// function changeColorRed() {
//     console.log('red', red)
//     if (red) {
//         document.getElementById('red').classList.remove('red');
//         document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
//         red = false;
//         yellow = false;
//         green = false;

//         document.getElementById('yellow').classList.remove('yellow');
//         document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';

//         document.getElementById('green').classList.remove('green');
//         document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';


//     } else {
//         document.getElementById('red').classList.add('red');
//         document.getElementById('redImg').src = '/asseds/img/pfeil-oben-weiss.png';
//         red = true;
//         green = false;
//         yellow = false;

//         document.getElementById('yellow').classList.remove('yellow');
//         document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';

//         document.getElementById('green').classList.remove('green');
//         document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
//     }


// }

// function changePrioUrgent() {
//     prio;
//     prio = 'urgent';
// }

// function changeColorYellow() {
//     changePrioMedium();
//     document.getElementById('yellow').classList.add('yellow');
//     document.getElementById('yellowImg').src = 'asseds/img/medium-weiss.png';
// }

// function changeColorYellow() {
//     console.log('yellow', yellow)

//     if (yellow) {
//         document.getElementById('yellow').classList.remove('yellow');
//         document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
//         red = false;
//         yellow = false;
//         green = false;
//     } else {
//         document.getElementById('yellow').classList.add('yellow');
//         document.getElementById('yellowImg').src = '/asseds/img/medium-weiss.png';
//         yellow = true;
//         red = false;
//         green = false;
//     }



//     document.getElementById('red').classList.remove('red');
//     document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

//     document.getElementById('green').classList.remove('green');
//     document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
// }


// function changePrioMedium() {
//     prio;
//     prio = 'medium';
// }

// function changeColorGreen() {
//     changePrioLow();
//     document.getElementById('green').classList.add('green');
//     document.getElementById('greenImg').src = 'asseds/img/pfeil-unten-weiss.png';
// }

// function changeColorGreen() {
//     console.log('green', green)
//     if (green) {
//         document.getElementById('green').classList.remove('green');
//         document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
//         red = false;
//         yellow = false;
//         green = false;
//     } else {
//         document.getElementById('green').classList.add('green');
//         document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-weiss.png';
//         green = true;
//         red = false;
//         yellow = false;
//     }


//     document.getElementById('red').classList.remove('red');
//     document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

//     document.getElementById('yellow').classList.remove('yellow');
//     document.getElementById('yellowImg').src = 'asseds/img/medium-gelb.png';
// }

// function changePrioLow() {
//     prio;
//     prio = 'low';
// }


// function renderSubtask() {
//     let subtask = document.getElementById('subtask').value;
//     document.getElementById('subtask').value = '';

//     generateSubtask(subtask, i);
//     i++;
// }

// function generateSubtask(subtask, i) {

//     return document.getElementById('renderSubtask').innerHTML += `
//     <div class="subtaskContainer">
//     <input onclick="checkSubtask('${subtask}')" class="checkbox" type="checkbox">
//     <p id="getSubtask">${subtask}</p>
//     </div>
//     `;
// }

// function checkSubtask(subtask) {
//     subtasks.push(subtask);
//     console.log(subtask);
// }


// function dropDownCategory() {
//     document.getElementById("category").classList.toggle("show");

//     // Close the dropdown if the user clicks outside of it
//     window.onclick = function(event) {
//         if (!event.target.matches('.drop')) {
//             var dropdowns = document.getElementsByClassName("dropdown-content");
//             var i;
//             for (i = 0; i < dropdowns.length; i++) {
//                 var openDropdown = dropdowns[i];
//                 if (openDropdown.classList.contains('show')) {
//                     openDropdown.classList.remove('show');
//                 }
//             }
//         }
//     }
// }

// function dropDownAssign() {
//     document.getElementById("assign").classList.toggle("show");

//     // Close the dropdown if the user clicks outside of it
//     window.onclick = function(event) {
//         if (!event.target.matches('.drop')) {
//             var dropdowns = document.getElementsByClassName("dropdown-content");
//             var i;
//             for (i = 0; i < dropdowns.length; i++) {
//                 var openDropdown = dropdowns[i];
//                 if (openDropdown.classList.contains('show')) {
//                     openDropdown.classList.remove('show');
//                 }
//             }
//         }
//     }
// }



// function renderCategory() {
//     let content = document.getElementById('category');

//     for (let i = 0; i < categoriesName.length; i++) {
//         const category = categoriesName[i];
//         const img = categoriesImg[i];
//         content.innerHTML += `

//         <a class="categoryContainer" onclick="myCategory(${i})"><p>${category}</p> <img src="${img}"</a>
//         `;

//     }

// }

// function myCategory(i) {
//     let content = document.getElementById('selectCategory');
//     content.innerHTML = '';
//     content.innerHTML = `
//     <div class="category">
//     ${categoriesName[i]}<img src="${categoriesImg[i]}">
//     </div>
//     <img src="/asseds/img/pfeil unten.png">
//     `;
// }


// function newCategory() {
//     let content = document.getElementById('selectCategory');

//     content.innerHTML = '';
//     content.innerHTML += `

//     <input id="pushNewCategory" class="newCategoryText" placeholder="New category Name...">
//     <img onclick="goToSelectCategory()" class="xBtn" src="/asseds/img/x-schwarz.png">
//     <img onclick="pushCategoryToArray()" class="hackenBtn" src="/asseds/img/hacken-schwarz.png">
//     `;

//     let contentImg = document.getElementById('category');
//     contentImg.innerHTML = '';
//     contentImg.style.display = "block";
//     for (let i = 0; i < newCategoryImg.length; i++) {
//         const img = newCategoryImg[i];
//         contentImg.innerHTML += `
//         <img onclick="newCategoryImages(${i})" class="newCategoryImg" src="${img}">
//         `;
//     }
// }


// function newCategoryImages(i) {
//     let content = document.getElementById('selectCategory');

//     content.innerHTML = '';
//     content.innerHTML += `
//     <img src="${newCategoryImg[i]}">
//     <input "required"  class="newCategoryText"  placeholder="New category Name...">

//     <img onclick="goToSelectCategory()" class="xBtn" src="/asseds/img/x-schwarz.png">
//     <img class="hackenBtn" src="/asseds/img/hacken-schwarz.png">
//     `;

//     document.getElementById('category').style.display="none";
// }


// function goToSelectCategory() {
//     let content = document.getElementById('selectCategory');
//     let input = document.getElementById('category').innerHTML = '';
//     content.innerHTML = `
//     Select task category<img src="/asseds/img/pfeil unten.png">
//     `;
//     renderCategory();

// }

// function pushCategoryToArray(){
//     let newCategory = document.getElementById('pushNewCategory').value;
//     categoriesName.push(newCategory);
//     categoriesImg.push('Hallo');



// }