let allTaskss = [];

function onSubmits(event) {
    event.preventDefault();
    addTasks()
}

async function initLoadTasksAddTask() {
    includeHTML();
    await getAllTasks();

    loadActiveUsers()
}


async function addTasks() {
    let title = document.getElementById('titles').value;
    let description = document.getElementById('descriptions').value;
    let dueDate = document.getElementById('dueDates').value;

    let task = {
        'title': title,
        'description': description,
        // 'category': allLiCategory,
        'dueDates': dueDate,
        // 'assignedTo': assignedChackedBox,
        // 'prio': colorArray,
        // 'subtask': selectedSubtasks,
        // 'subtaskChecked': selectedSubtasksForProgress,
        'id': new Date().getTime(),
        'list': 'todo',
    };

    allTaskss.push(task);
    // users[activeUser]['tasks'].push(task);
    // await backend.setItem('users', JSON.stringify(users));

    // createTasks();
    inputfieldsValue()
}

// function loadAllTasks() {
//     let allTasksAsString = localStorage.getItem('allTasks');
//     allTasks = JSON.parse(allTasksAsString);
// }



//-- Ab hier beginnt der Code von Waldemar 

function loadActiveUsers() {
    let activeUsers = document.getElementById('headerContents');
    activeUsers.innerHTML = '';

    const name = users[activeUser]['initials'];
    const color = users[activeUser]['color'];
    activeUsers.innerHTML = /*html*/ `
        <p>Kanban Project Management Tool</p>

        <div class="headerContentRight">
            <img onclick="help()" class="information" src="/asseds/img/information.png">
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

function inputfieldsValue() {
    document.getElementById('titles').value = '';
    document.getElementById('descriptions').value = '';
    document.getElementById('dueDates').value = '';
}

function createTasks() {
    let containerTodo = document.getElementById('containerTodos');
    containerTodo.innerHTML = '';

    for (let i = 0; i < allTaskss.length; i++) {
        const element = allTaskss[i];

        containerTodo.innerHTML = /*html*/ `
            <div onclick="openCheckTask(${element['id']})" draggable="true" ondragstart="drag(${element['id']})" ontouchstart="touchstart(${element['id']})" ontouchend="touchend(${element['id']})" class="containerBlock" id="containerBlock-${element['id']}">
            
                <div>
                    <p>${element['title']}</p>
                </div>
                <div>
                    <p>${element['description']}</p>
                </div>

            </div>
        
        `;
    }

}

/** Area for Category */

function openCategory() {

    // if (newCategorySelected) {
    //     return; // Funktion abbrechen
    // }

    // Öffnen - Wird nicht ausgeführt nach einem return
    let category = document.getElementById('addTask_categoryList');
    if (category.classList.contains('d-none')) {
        category.classList.remove('d-none');
        document.getElementById('borderButton').classList.add('borderButton');
    } else {
        category.classList.add('d-none');
        document.getElementById('borderButton').classList.remove('borderButton');
    }

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