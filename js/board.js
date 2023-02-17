let allCategorys = [];
let allSubtasks = [];
let allContacts = [];
let assignedChackedBox = [];
let selectedSubtasksForProgress = [];
let selectedSubtasksProgress = [];
let selectedSubtasks = [];
let searchTodos = [];
let searchProgress = [];
let searchFeedback = [];
let searchDone = [];
let allLiCategory;
let currentSelectedCategory;
let currentDraggedElement;
let currentCategoryColor;
let newCategorySelected = false;
let currentIndex = 0;
let currentId = 0;
let timer;
let timeIsup = false;
let touchStartActive = false;


// load all first functions for show the site

async function initLoadTasks() {
    includeHTML();
    await getAllTasks();
    loadActiveUser()
    filterAllTasks();
    filterTasks()
    navBarHighlight(2)

}


// main filter function of tasks after load the site new

function filterTasks() {
    filterTodo()
    filterFeedback()
    filterInprogress()
    filterDone()

}


// load the html date for show the activeuser, help information and log aut button

function loadActiveUserHTML(name, color) {
    return /*html*/ `
        <img class="headerImageLeft" src="/asseds/img/biglogo.png">
        <p>Kanban Project Management Tool</p>
    
        <div class="headerContentRight">
            <img onclick="help()" class="information" src="/asseds/img/information.png">
            <div id="userButton" onclick="showLogOutButton()" class="personLogIn" style="background-color: ${color}">
                ${name}
            </div>
            
            <div id="logOutButton" class="logOutButton d-none" onclick="logOut()">Log Out</div>
            <div id="bigLogOutButton" class="bigLogOutButton d-none">
                <div onclick="help()">Help</div>
                <div>Legal Notice</div>
                <div id="logOutButton" onclick="logOut()">Log Out</div>
            </div>
        </div>
    `;
}


// load the activeuser information 

function loadActiveUser() {
    let activeUsers = document.getElementById('headerContent');
    activeUsers.innerHTML = '';
    const name = users[activeUser]['initials'];
    const color = users[activeUser]['color'];
    activeUsers.innerHTML = loadActiveUserHTML(name, color);
}


// open the help container

function help() {
    document.getElementById('help').classList.remove('d-none');
    document.getElementById('mainContent').classList.add('d-none');
    document.getElementById('bigLogOutButton').classList.add('d-none');
}


// close the global container after log out

function goBacktoMainContainer() {
    document.getElementById('help').classList.add('d-none');
    document.getElementById('mainContent').classList.remove('d-none');
}


// create the information for assigned To in the task

function createTaskAssignedTo(element) {
    let nameParts = element['assignedTo'];
    let initialsContainer = '';

    for (let j = 0; j < nameParts.length; j++) {
        if (j < 3) {
            let name = nameParts[j]['name'].split(' ');
            let color = nameParts[j]['color'];
            let initials = name[0][0].toUpperCase();
            if (name.length > 1) {
                initials += name[1][0].toUpperCase();
            }
            initialsContainer += /*html*/ `
          <div class="assignTask">
            <div class="divAssignTask" style="background-color: ${color}">${initials}</div>
          </div>
        `;
        } else {
            initialsContainer += /*html*/ `
          <div class="nameContainer">+${nameParts.length - 3}</div>`;
            break;
        }
    }

    return initialsContainer;
}



// show the progressbar in the task of subtasks

function createTaskProgressbar(element, i) {
    let allSubtasks = element['subtask'];
    let currentSubtask = element['subtaskChecked'];
    let progresses = `${currentSubtask.length}/${allSubtasks.length} Done`;
    let procent = currentSubtask.length / allSubtasks.length;
    procent = Math.round(procent * 100);
    let subtaskInitialsContainer = '';

    if (allSubtasks.length > 0) {
        subtaskInitialsContainer += /*html*/ `
            <div class="progressBarBig">
                <div id="progressBar-${i}" class="progressBar" style="width: ${procent}%;">
    
                </div>
            </div>
            <span id="progressText-${i}" class="progressText">${progresses}</span>
        `;
    }
    return subtaskInitialsContainer;

}


// filter the tasks for todo after load the site new

function filterTodo() {

    let renderTodo = document.getElementById('containerTodos');
    renderTodo.innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];

        let initialsContainer = createTaskAssignedTo(element)
        let subtaskInitialsContainer = createTaskProgressbar(element, i)

        renderTodo.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
    }
}


// filter the tasks for progress after load the site new

function filterInprogress() {

    let renderProgress = document.getElementById('containerProgresses');
    renderProgress.innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];

        let initialsContainer = createTaskAssignedTo(element)
        let subtaskInitialsContainer = createTaskProgressbar(element, i)

        renderProgress.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
    }
}


// filter the tasks for feedback after load the site new

function filterFeedback() {

    let feedbackRender = document.getElementById('containerFeedbacks');
    feedbackRender.innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];

        let initialsContainer = createTaskAssignedTo(element)
        let subtaskInitialsContainer = createTaskProgressbar(element, i)

        feedbackRender.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
    }
}


// filter the tasks for done after load the site new

function filterDone() {

    let doneRender = document.getElementById('containerDones');
    doneRender.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];

        let initialsContainer = createTaskAssignedTo(element)
        let subtaskInitialsContainer = createTaskProgressbar(element, i)

        doneRender.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
    }

}


// the container for create an task 

function addTaskRight() {
    document.getElementById('addTaskRight').classList.remove('d-none');
}


// close the task container after create an task

async function closeContainer1() {
    document.getElementById('closeContainer2').classList.add('d-none');
    selectedSubtasksProgress = [];
    // await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
}


// close the task container after to edit the task

function closeContainer() {
    document.getElementById('addTaskRight').classList.add('d-none');
    inputfieldValue()
}


// onclick function at html site 

function onSubmit(event) {
    event.preventDefault();
    createTask();

}


// create a massege when the category array is empty

function addInfoToTakeCategory(task) {
    if (!task.category || task.category.length === 0) {
        let errorContainer = document.getElementById('taskDiv1');
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
        let errorContainer = document.getElementById('taskDiv1');
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
        let errorContainer = document.getElementById('taskDiv1');
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
    let successContainer = document.getElementById('taskDiv');
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

async function createTask() {

    let titles = document.getElementById('title').value;
    let descriptions = document.getElementById('description').value;
    let dueDates = document.getElementById('dueDate').value;

    let task = {
        'title': titles,
        'description': descriptions,
        'category': allLiCategory,
        'dueDates': dueDates,
        'assignedTo': assignedChackedBox,
        'prio': colorArray,
        'subtask': selectedSubtasks,
        'subtaskChecked': selectedSubtasksForProgress,
        'id': new Date().getTime(),
        'list': 'todo',

    };

    if (!validateTask(task)) {
        return;
    }


    // allTasks.push(task);
    users[activeUser]['tasks'].push(task);
    addTasking();
    inputfieldValue();
    addInfoToTakeAnTask();
    closeContainer();

}


// to filter the tasks 

function filterTasksForCreate() {
    let todos = users[activeUser]['tasks'].filter(t => t['list'] == 'todo');
    let progress = users[activeUser]['tasks'].filter(t => t['list'] == 'progress');
    let feedbacks = users[activeUser]['tasks'].filter(t => t['list'] == 'feedback');
    let dones = users[activeUser]['tasks'].filter(t => t['list'] == 'done');

    return { todos, progress, feedbacks, dones };
}


// get container for tasks

function getTaskContainers() {
    let containerTodo = document.getElementById('containerTodos');
    let containerProgress = document.getElementById('containerProgresses');
    let containerFeedback = document.getElementById('containerFeedbacks');
    let containerDone = document.getElementById('containerDones');

    containerTodo.innerHTML = '';
    containerProgress.innerHTML = '';
    containerFeedback.innerHTML = '';
    containerDone.innerHTML = '';

    return { containerTodo, containerProgress, containerFeedback, containerDone };
}


//create the tasks to the container

function addTasksToContainer(container, tasks) {
    container.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let initialsContainer = createTaskAssignedTo(element);
        let subtaskInitialsContainer = createTaskProgressbar(element, i);
        container.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element);
    }
}


//create an task

async function addTasking() {
    const { todos, progress, feedbacks, dones } = filterTasksForCreate();
    const { containerTodo, containerProgress, containerFeedback, containerDone } = getTaskContainers();

    addTasksToContainer(containerTodo, todos);
    addTasksToContainer(containerProgress, progress);
    addTasksToContainer(containerFeedback, feedbacks);
    addTasksToContainer(containerDone, dones);

    // await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
}


// checks how long task is touched on mobile

function touchstart(id) {
    timer = setTimeout(() => onlongtouch(id), 200);
}


//checks if touch on mobile has ended

function touchend(id) {

    if (timer && !timeIsup) {
        clearTimeout(timer);
        openCheckTask(id);
    }
    setTimeout(() => timeIsup = false, 250)
}


//action that is performed if mobile display is touched long enough

function onlongtouch(id) {
    timeIsup = true;
    openMoveToPoppupMobile(id);
}


// opens container that allows shifting tasks between states on mobile devices

function openMoveToPoppupMobile(id) {
    touchStartActive = true;
    let task = document.getElementById('containerBlock-' + id);
    currentDraggedElement = id;
    task.innerHTML += openMoveToPoppupMobileHTML();

}


//open the poppup for Mobile

function openMoveToPoppupMobileHTML() {
    return /*html*/ `
    <div id="popupToMoveTaskMobile" class="popupToMoveTaskMobile" ontouchstart="save(event); closeMoveToPoppupMobile()">
        <div class="popupToMoveTaskMobileSelections">
            <div>Move to</div>
            <span ontouchstart="save(event); drop('todo'); save(event) ">To do</span>
            <span ontouchstart="save(event); drop('progress')">In Progress</span>
            <span ontouchstart="save(event); drop('feedback')">Feedback</span>
            <span ontouchstart="save(event); drop('done')">Done</span>
        </div>
    </div>`;
}


//to stop the onclick

function save(event) {
    event.stopPropagation();

}


// filters board after performing a change in status on mobile devices

function closeMoveToPoppupMobile() {
    filterTasks();

    // setTimeout(function() {
    //     touchStartActive = false;
    // }, 1000);
}


//add the backgroundarea from task

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


//remove the backgroundarea from task

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}


//allow Drop funktion for the task

function allowDrop(ev) {
    ev.preventDefault();
}


//drop funktion to filter the task 

async function drop(categorys) {
    let droppedTask = users[activeUser]['tasks'].filter(x => x.id == currentDraggedElement)
    droppedTask[0]['list'] = categorys;
    filterTasks();
    addTasking();
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
    touchStartActive = false;
}

// create an variable for id

function drag(id) {
    currentDraggedElement = id;
}


//reset the fields by create an task  

function inputfieldValue() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('assignedAddContact').innerHTML = '';
    resetCheckboxes()
    resetSettingsCategory()
    resetSettingsChangeColor()
    resetSubtasks()
    colorArray = [];
    allLiCategory = [];
}



/** Area for openCheckTask */


//filter the onclick task for open the task 

function openCheckTask(Index) {
    console.log(touchStartActive)
    if (!touchStartActive) {
        let openToCheck = users[activeUser]['tasks'].filter(x => x.id == Index);
        let openTocheckRightTask = users[activeUser]['tasks'].indexOf(openToCheck[0]);
        openCheckTasks(openTocheckRightTask);
    }
    touchStartActive = false;
}


//open the task

async function openCheckTasks(taskIndex) {
    document.getElementById('closeContainer2').classList.remove('d-none');
    let container = document.getElementById('checkTaskSmall');
    container.innerHTML = '';

    let initialsName = openCheckTaskNames(taskIndex);
    let fullinitialsName = openCheckTaskFullNames(taskIndex);
    let dateFormatted = dateOpenCheckTask(taskIndex);

    let task = users[activeUser]['tasks'][taskIndex];

    container.innerHTML = openCheckTaskHTML(initialsName, fullinitialsName, dateFormatted, task, taskIndex);
    let subinitialContainer = openCheckTaskSubtasks(taskIndex);
    document.getElementById('openCheckTasksAssignedToTitle').innerHTML = subinitialContainer;
    openCheckTaskTakeInputValue()
    selectedSubtasksProgress = users[activeUser]['tasks'][taskIndex].subtaskChecked;

}


//create the date for open the task

function toAskDeleteTask(taskIndex) {
    document.getElementById('bigDivDeleteTask').classList.remove('d-none');
    let deleteTasks = document.getElementById('bigDivDeleteTask');

    deleteTasks.innerHTML = /*html*/ `
        <div class="askDeleteTask">
            <p class="deleteTaskTesx">Möchten Sie diese Task wirklich löschen?</p>
            <div>
                <button class="deleteTaskAnswer" onclick="deleteTask(${taskIndex})">Ja</button>
                <button id="deleteTaskAnswer" onclick="NonDeleteTask()" class="deleteTaskAnswer">Nein</button>
            </div>
        </div>
    `;
}


// open the container for text delete task

function NonDeleteTask() {
    document.getElementById('bigDivDeleteTask').classList.add('d-none');
}


//delete task

async function deleteTask(taskIndex) {
    allTasks.splice(taskIndex, 1);
    users[activeUser]['tasks'].splice(taskIndex, 1);
    await backend.deleteItem('allTasks', allTasks);
    await backend.deleteItem('users', users);
    filterTasks();
    addTasking();
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
    closeContainer1();
    document.getElementById('bigDivDeleteTask').classList.add('d-none')
}


// show the date in the task

function dateOpenCheckTask(taskIndex) {
    let task = users[activeUser]['tasks'][taskIndex];
    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formattedDate;
}


//shows the first letter of the name in the task

function openCheckTaskNames(taskIndex) {
    let names = users[activeUser]['tasks'][taskIndex];
    let nameParts = names.assignedTo;
    let initialsContainer = '';
    for (let j = 0; j < nameParts.length; j++) {
        let name = nameParts[j]['name'].split(' ');
        let color = nameParts[j]['color'];
        let initials = name[0][0].toUpperCase();
        if (name.length > 1) {
            initials += name[1][0].toUpperCase();
        }
        initialsContainer += /*html*/ `
        <div class="openCheckAssignTask">
          <div class="openCheckDivAssignTask" style="background-color: ${color}">${initials}</div>
        </div>
      `;
    }
    return initialsContainer;
}


// show the full name in the task

function openCheckTaskFullNames(taskIndex) {
    let fullNames = users[activeUser]['tasks'][taskIndex];
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


//shows the subtasks in the task

function openCheckTaskSubtasks(taskIndex) {
    const { subtask, subtaskChecked = [] } = users[activeUser]['tasks'][taskIndex];
    let subtaskInitialsContainer = '';

    subtask.forEach((element, i) => {
        const checked = subtaskChecked.includes(element) ? 'checked' : '';
        subtaskInitialsContainer += /*html*/ `
            <div class="checkboxSubtasksContainer">
                <input onclick="putTheProgressBar(${taskIndex})" id="subtask-${i}" class="openCheckboxSubtasks" type="checkbox" data-value="${element}" ${checked}>
                <p class="openSubtasksComent">${element}</p>
            </div>   
        `;
    });

    if (!subtask.length) {
        document.getElementById('openCheckTasksAssignedToTitleDelete').classList.add('d-none');
    }

    return subtaskInitialsContainer;
}


// calculates the progress of the subtasks

async function putTheProgressBar(taskIndex) {
    setTimeout(function() {
        openCheckTaskTakeInputValue()

        for (let i = 0; i < selectedSubtasksProgress.length; i++) {
            if (users[activeUser]['tasks'][taskIndex].subtaskChecked.indexOf(selectedSubtasksProgress[i]) === -1) {
                users[activeUser]['tasks'][taskIndex].subtaskChecked.push(selectedSubtasksProgress[i]);
            }
        }

        users[activeUser]['tasks'][taskIndex].subtaskChecked = selectedSubtasksProgress;
        selectedSubtasksForProgress = [];

    }, 200)

    await backend.setItem('users', JSON.stringify(users));
    // await backend.setItem('allTasks', JSON.stringify(allTasks));
    filterTasks()
    addTasking();

}

// ticks the already selected subtasks

function openCheckTaskTakeInputValue() {

    document.querySelectorAll('.openCheckboxSubtasks').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const value = this.dataset.value;
            if (this.checked) {
                if (!selectedSubtasksProgress.includes(value)) {
                    selectedSubtasksProgress.push(value);
                }
            } else {
                const index = selectedSubtasksProgress.indexOf(value);
                if (index > -1) {
                    selectedSubtasksProgress.splice(index, 1);
                }
            }
        });
    });

}

// open the task for to edit 

function openTaskToEdit(taskIndex) {
    document.getElementById('checkTaskSmall').classList.add('d-none');
    document.getElementById('toEditTaskMainDiv').classList.remove('d-none');

    let task = users[activeUser]['tasks'][taskIndex];
    let duaDate = openTaskToEditDate(taskIndex);
    let toEditTaskMainDiv = document.getElementById('toEditTaskMainDiv');
    toEditTaskMainDiv.innerHTML = openTaskToEditHTML(task, duaDate, taskIndex);

    showContactsInToEdit(taskIndex);
    let addContacts = openTaskToEditContacts();
    document.getElementById('assignedAddContacts').innerHTML = addContacts;
    openTaskToEditPrioImage(taskIndex);

}


// show the date to edit

function openTaskToEditDate(taskIndex) {
    let task = users[activeUser]['tasks'][taskIndex];
    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toISOString().substring(0, 10);
    return formattedDate;
}


// show the contacts to edit in the list

function openTaskToEditContacts() {
    let initialsContainer = '';
    for (let j = 0; j < assignedChackedBox.length; j++) {
        if (j < 3) {
            let name = assignedChackedBox[j]['name'].split(' ');
            let color = assignedChackedBox[j]['color'];
            initialsContainer += /*html*/ `
                <div class="assignTask">
                    <div class="divAssignTask" style="background-color: ${color}">${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}</div>
                </div>
            `;
        } else {
            initialsContainer += /*html*/ `
                <div class="nameContainer">+${assignedChackedBox.length - 3}</div>`;
            break;
        }
    }

    return initialsContainer;
}


// show the prio buttons to edit  

function openTaskToEditPrioImage(taskIndex) {
    let task = users[activeUser]['tasks'][taskIndex];

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


// close the container for task to edit

function closeTaskToEdit() {
    document.getElementById('checkTaskSmall').classList.remove('d-none');
    document.getElementById('toEditTaskMainDiv').classList.add('d-none');
    assignedChackedBox = [];
    colorArray = [];
}


// open the list for edit the contacts

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


// edit the contacts and push in the array

function selectContactedToEdit(id) {
    let contact = users[activeUser]['contacts'].find(contact => contact.contactName === id);

    let index = assignedChackedBox.findIndex(c => c.name === contact.contactName);
    if (index === -1) {

        assignedChackedBox.push({ name: contact.contactName, color: contact.contactColor });

    } else {

        assignedChackedBox.splice(index, 1);
    }
    let addContactss = openTaskToEditContacts();
    document.getElementById('assignedAddContacts').innerHTML = addContactss;

}


// show the contacts under the list

function showContactsInToEdit(taskIndex) {
    const toEdit = document.getElementById('assignedToListToEdit');
    toEdit.innerHTML = '';

    const currentContacts = users[activeUser]['tasks'][taskIndex];
    users[activeUser]['contacts'].forEach(contact => {
        const element = contact['contactName'];
        const isAssigned = currentContacts.assignedTo.some(a => a.name === element);
        toEdit.innerHTML += /*html*/ `
          <label class="assignedToListBox">
              <li class="taskAssignedTo">${element}</li>
              <input  onclick="selectContactedToEdit(id)" class="inputCheckbox" type="checkbox" value="${element}" id="${element}"${isAssigned ? ' checked' : ''}>
          </label>
      `;
    });

    showContactsInToEditPushInAssigned()
}


// show the selected contacts in the list

function showContactsInToEditPushInAssigned() {
    const checkboxess = document.querySelectorAll('input.inputCheckbox:checked');
    for (let i = 0; i < checkboxess.length; i++) {
        const checkboxx = checkboxess[i];
        const name = checkboxx.value;
        let color;
        for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
            if (users[activeUser]['contacts'][i].contactName === name) {
                color = users[activeUser]['contacts'][i].contactColor;
                break;
            }
        }
        assignedChackedBox.push({
            name,
            color
        });
    }
}


// save the date what is to edit

async function saveTask(taskIndex) {
    const updatedTitle = document.getElementById("editTaskTitle").value;
    const updatedDescription = document.getElementById("editTaskDescription").value;
    const updatedDueDate = document.getElementById("editTaskDueDate").value;
    const task = users[activeUser]['tasks'][taskIndex];

    Object.assign(task, { title: updatedTitle, description: updatedDescription, dueDates: updatedDueDate });

    updateTaskPriority(task, colorArray);

    assignedChackedBox.filter(box => !task.assignedTo.some(a => a.name === box.name)).forEach(box => {
        task.assignedTo.push(box);
    });

    task.assignedTo = assignedChackedBox;

    filterTasks();
    addTasking();

    await Promise.all([
        backend.setItem('users', JSON.stringify(users))
        // backend.setItem('allTasks', JSON.stringify(allTasks)),

    ]);

    openCheckTasks(taskIndex);
}


// save the prio date

function updateTaskPriority(task, colorArray) {
    if (Object.keys(colorArray).length > 0) {
        Object.assign(task.prio, {
            color: colorArray.color,
            text: colorArray.text,
            coloredImage: colorArray.coloredImage,
            whiteImage: colorArray.whiteImage
        });
    }
}


/** Area for search to Task */


// main funktion to filter the task in the find function 

function searchToTask() {
    searchFilterTodo()
    searchFilterProgress()
    searchFilterFeedback()
    searchFilterDone()
}


// filter the task what is in todo list

function searchFilterTodo() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let filter = document.getElementById('containerTodos');
    filter.innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        let headlines = todo[i]['title'];
        let descriptions = todo[i]['description'];

        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let element = todo[i];

            let initialsContainer = createTaskAssignedTo(element)
            let subtaskInitialsContainer = createTaskProgressbar(element, i)

            filter.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)

        }
    }

}


// filter the task what is in progress list

function searchFilterProgress() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let filter = document.getElementById('containerProgresses');
    filter.innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        let headlines = progress[i]['title'];
        let descriptions = progress[i]['description'];

        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let element = progress[i];

            let initialsContainer = createTaskAssignedTo(element)
            let subtaskInitialsContainer = createTaskProgressbar(element, i)

            filter.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)

        }
    }

}


// filter the task what is in feedback list

function searchFilterFeedback() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let filter = document.getElementById('containerFeedbacks');
    filter.innerHTML = '';

    for (let i = 0; i < feedback.length; i++) {
        let headlines = feedback[i]['title'];
        let descriptions = feedback[i]['description'];

        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let element = feedback[i];

            let initialsContainer = createTaskAssignedTo(element)
            let subtaskInitialsContainer = createTaskProgressbar(element, i)

            filter.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)

        }
    }

}


// filter the task what is in done list

function searchFilterDone() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();


    let filter = document.getElementById('containerDones');
    filter.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        let headlines = done[i]['title'];
        let desc = done[i]['description'];

        if (headlines.toLowerCase().includes(search) || desc.toLowerCase().includes(search)) {
            let element = done[i];

            let initialsContainer = createTaskAssignedTo(element)
            let subtaskInitialsContainer = createTaskProgressbar(element, i)

            filter.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)

        }
    }
}