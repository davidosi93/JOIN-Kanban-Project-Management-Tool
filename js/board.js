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




async function initLoadTasks() {
    includeHTML();
    await getAllTasks();
    filterAllTasks();
    openAllContacts();
    filterTasks()
    createnewCategoryAll()
    loadActiveUser()
    navBarHighlight(2)
}

function filterTasks() {
    filterTodo()
    filterFeedback()
    filterInprogress()
    filterDone()

}

function loadActiveUser() {
    let activeUsers = document.getElementById('headerContent');
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
    document.getElementById('mainContent').classList.add('d-none');
}

function goBacktoMainContainer() {
    document.getElementById('help').classList.add('d-none');
    document.getElementById('mainContent').classList.remove('d-none');
}

function createTaskAssignedTo(element) {
    let nameParts = element['assignedTo'];
    let initialsContainer = '';

    for (let j = 0; j < nameParts.length; j++) {
        if (j < 3) {
            let name = nameParts[j]['name'].split(' ');
            let color = nameParts[j]['color'];
            initialsContainer += /*html*/ `
                <div class="assignTask">
                    <div class="divAssignTask" style="background-color: ${color}">${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}</div>
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

function addTaskRight() {
    document.getElementById('addTaskRight').classList.remove('d-none');
}

async function closeContainer1() {
    document.getElementById('closeContainer2').classList.add('d-none');
    selectedSubtasksProgress = [];
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
}

function closeContainer() {
    document.getElementById('addTaskRight').classList.add('d-none');
    inputfieldValue()
}

function onSubmit(event) {
    event.preventDefault();
    createTask();

}

function addInfoToTakeCategory(task) {
    if (!task.category || task.category.length === 0) {
        let errorContainer = document.getElementById('taskDiv1');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie eine Kategorie aus.';
        errorContainer.style.display = 'block';
        setTimeout(function() {
            errorContainer.style.display = 'none';
        }, 2000);
        return;
    }
    return true;
}

function addInfoToTakeAssignedTo(task) {
    if (!task.assignedTo || task.assignedTo.length === 0) {
        let errorContainer = document.getElementById('taskDiv1');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie die Verantwortlichen.';
        errorContainer.style.display = 'block';
        setTimeout(function() {
            errorContainer.style.display = 'none';
        }, 2000);
        return;
    }

    return true;
}

function addInfoToTakePrio(task) {
    if (!task.prio || task.prio.length === 0) {
        let errorContainer = document.getElementById('taskDiv1');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie eine Priorität.';
        errorContainer.style.display = 'block';
        setTimeout(function() {
            errorContainer.style.display = 'none';
        }, 2000);
        return;
    }
    return true;
}

function addInfoToTakeAnTask() {
    let successContainer = document.getElementById('taskDiv');
    successContainer.classList.remove('d-none');
    successContainer.innerHTML = 'Task wurde erfolgreich erstellt.';
    successContainer.style.display = 'block';
    setTimeout(function() {
        successContainer.style.display = 'none';
    }, 2000);

}

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


    allTasks.push(task);
    users[activeUser]['tasks'].push(task);
    addTasking();
    inputfieldValue();
    addInfoToTakeAnTask();
    closeContainer();

}

function filterTasksForCreate() {
    let todos = users[activeUser]['tasks'].filter(t => t['list'] == 'todo');
    let progress = users[activeUser]['tasks'].filter(t => t['list'] == 'progress');
    let feedbacks = users[activeUser]['tasks'].filter(t => t['list'] == 'feedback');
    let dones = users[activeUser]['tasks'].filter(t => t['list'] == 'done');

    return { todos, progress, feedbacks, dones };
}

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

function addTasksToContainer(container, tasks) {
    container.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let initialsContainer = createTaskAssignedTo(element);
        let subtaskInitialsContainer = createTaskProgressbar(element, i);
        container.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element);
    }
}

async function addTasking() {
    const { todos, progress, feedbacks, dones } = filterTasksForCreate();
    const { containerTodo, containerProgress, containerFeedback, containerDone } = getTaskContainers();

    addTasksToContainer(containerTodo, todos);
    addTasksToContainer(containerProgress, progress);
    addTasksToContainer(containerFeedback, feedbacks);
    addTasksToContainer(containerDone, dones);

    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
}


function touchstart(id) {

    timer = setTimeout(() => onlongtouch(id), 200);
}

function touchend(id) {

    if (timer && !timeIsup) {
        clearTimeout(timer);
        openCheckTask(id);
    }
    setTimeout(() => timeIsup = false, 300)
}


function onlongtouch(id) {
    timeIsup = true;
    openMoveToPoppupMobile(id);
}

function openMoveToPoppupMobile(id) {
    touchStartActive = true;
    let task = document.getElementById('containerBlock-' + id);
    currentDraggedElement = id;
    task.innerHTML += openMoveToPoppupMobileHTML();

}

function openMoveToPoppupMobileHTML() {
    return /*html*/ `
    <div id="popupToMoveTaskMobile" class="popupToMoveTaskMobile" ontouchstart="save(event); closeMoveToPoppupMobile()">
        <div class="popupToMoveTaskMobileSelections">
            <div>Move to</div>
            <span ontouchstart="save(event); drop('todo')">To do</span>
            <span ontouchstart="save(event); drop('progress')">In Progress</span>
            <span ontouchstart="save(event); drop('feedback')">Feedback</span>
            <span ontouchstart="save(event); drop('done')">Done</span>
        </div>
    </div>`;
}

function save(event) {
    event.stopPropagation();
}

function closeMoveToPoppupMobile() {
    filterTasks();

    setTimeout(function() {
        touchStartActive = false;
    }, 1000);
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function drop(categorys) {
    let droppedTask = users[activeUser]['tasks'].filter(x => x.id == currentDraggedElement)
    droppedTask[0]['list'] = categorys;
    filterTasks();
    addTasking();
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
    touchStartActive = false;
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
    colorArray = [];
    allLiCategory = [];
}

/** Area for openCheckTask */

function openCheckTask(Index) {
    console.log(touchStartActive)
    if (!touchStartActive) {
        let openToCheck = users[activeUser]['tasks'].filter(x => x.id == Index);
        let openTocheckRightTask = users[activeUser]['tasks'].indexOf(openToCheck[0]);
        openCheckTasks(openTocheckRightTask);
    }
    touchStartActive = false;
}


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

function NonDeleteTask() {
    document.getElementById('bigDivDeleteTask').classList.add('d-none');
}

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

function openCheckTaskNames(taskIndex) {
    let names = users[activeUser]['tasks'][taskIndex];
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
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
    filterTasks()
    addTasking();

}

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


function openTaskToEditDate(taskIndex) {
    let task = users[activeUser]['tasks'][taskIndex];
    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toISOString().substring(0, 10);
    return formattedDate;
}

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

function closeTaskToEdit() {
    document.getElementById('checkTaskSmall').classList.remove('d-none');
    document.getElementById('toEditTaskMainDiv').classList.add('d-none');
    assignedChackedBox = [];
    colorArray = [];
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
        backend.setItem('allTasks', JSON.stringify(allTasks)),
        backend.setItem('users', JSON.stringify(users))
    ]);

    openCheckTasks(taskIndex);
}

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

function searchToTask() {
    searchFilterTodo()
    searchFilterProgress()
    searchFilterFeedback()
    searchFilterDone()
}

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