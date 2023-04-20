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


//show the log out button 
function showHeader(color, str) {
    return /*html*/ `
        <div class="headerContent">
            <p class="headerContentText">Kanban Project Management Tool</p>
            <img src="./asseds/img/biglogo.png" class="d-none">
            <div class="headerContentRight">
                <div class="buttonsTopRight">
                    <img onclick="help()" class="information" src="./asseds/img/information.png">
                    <div id="userButton" onclick="showLogOutButton()" class="personLogIn" style="background-color: ${color}; cursor: pointer">${str}</div>
                </div>
                <div id="logOutButton" class="logOutButton d-none">
                    <p onclick="help()" class="logOutButtonText d-none">Help</p>
                    <p onclick="notice()" class="logOutButtonText d-none">Legal Notice</p>
                    <p onclick="dataProtection()" class="logOutButtonText d-none">Datenschutz</p>
                    <p onclick="logOut()" class="logOutButtonText">Log Out</p>
                </div>
            </div>
        </div>
    `;
}


// Templates von contact.js
function contactLetterHeadline(firstChar) {
    return /*html*/ `
        <div id="contactLetter-${firstChar}" class="letter">
            <p class="letterP">${firstChar}</p>
            <div class="letterUnderline"></div>
        </div>
    `;
}


//show the contact in the List
function showContactDiv(name, email, str, color, i) {
    return /*html*/ `
        <div id="contactDiv${i}" onclick="showContact(${i});" class="contactDiv hover">
            <div id="contactLetter${i}" style="background-color: ${color}" class="contactLetter">
                ${str}
            </div>
            <div class="contactName">
                <p class="name">${name}</p>
                <p class="email">${email}</p>
            </div>
        </div>
    `;
}


//show the container with the information of the contact
function showBigConactDiv(str, name, email, phone, i, color) {
    return /*html*/ `   
    <div id="contactBox${i}" class="contactBox d-none">
            <div class="contact">
                <p style="background-color: ${color}" class="contactP">${str}</p>
                <div class="contactNameRight">
                    <p class="contactNameRightP">${name}</p>
                    <a href="./add_task.html"><div class="addTaskBox">
                        <img src="./asseds/img/blueplus.png">
                        <p class="addTask">Add Task</p>
                    </div></a>
                </div>
            </div>

            <div class="contactInfo">
                <p class="contactInfoP">Contact Information</p>
                <div onclick="showEditContactBox(${i})" class="contactInfoEdit">
                    <img src="./asseds/img/pencil.png">
                    <p class="contactInfoEditP">Edit Contact</p>
                </div>
            </div>

            <div class="phoneMailBox">
                <div class="mail">
                    <p class="mailP">Email</p>
                    <p class="mailAdress">${email}</p>
                </div>
                <div class="mail">
                    <p class="mailP">Phone</p>
                    <p class="phoneNumber">${phone}</p>
                </div>
            </div>
        </div>
        <div onclick="showEditContactBox(${i})" class="editMobileBox d-none">
            <img src="./asseds/img/whitePencil.png">
        </div>
    `;
}


//show the container for to edit the contact
function editContactBox(i, color, str) {
    return /*html*/ `   
        <div id="editContactBox${i}" class="newContactBox">
            <img onclick="closeEditBox()" class="closeImg" src="./asseds/img/cross.png">
            <img onclick="closeEditBox()" class="closeImgMobile d-none" src="./asseds/img/closewhite.png">
            <div class="leftContent">
                <img src="./asseds/img/littleLogo.png">
                <h1>Edit Contact</h1>
                <div class="newContactBoxLine"></div>
            </div>

            <div class="contactRightContent">
                <div class="contactRightContentImg">
                    <p style="background-color: ${color}" class="contactP">${str}</p>
                </div>
                <form class="inputFieldSection">
                    <div class="inputField">
                        <input id="input1Filled" type="name" required placeholder="Name">
                    </div>
                    <div class="inputField">
                        <input id="input2Filled" type="email" required placeholder="Email">
                    </div>
                    <div class="inputField">
                        <input id="input3Filled" type="number" required placeholder="Phone">
                    </div>
                </form>

                <div class="SaveButtonDiv">
                    <div class="delete-button" onclick="deleteContact(${i})">
                        <p>Delete</p>
                    </div>
                    <div onclick="saveContactChanges(${i})" class="saveButton">
                        <p>Save</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}



// template for Board


// load the thml code for create an task
function createTaskHTML(initialsContainer, subtaskInitialsContainer, element) {
    return /*html*/ `
        <div onclick="openCheckTask(${element['id']})" draggable="true" ondragstart="drag(${element['id']})" ontouchstart="touchstart(${element['id']})" ontouchend="touchend(${element['id']})" class="containerBlock" id="containerBlock-${element['id']}">
            <div class="addCategoryInTask ${element['category']['color']}">
                <p>${element['category']['name']}</p>
            </div>
            <div>
                <p>${element['title']}</p>
            </div>
            <div>
                <p>${element['description']}</p>
            </div>

            <div class="progressContainer" id="progressContainer">
                ${subtaskInitialsContainer}
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


// load the html code for open the task 
function openCheckTaskHTML(initialsName, fullinitialsName, dateFormatted, task, taskIndex) {
    return /*html*/ `
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

            <p id="openCheckTasksAssignedToTitleDelete" class="openCheckTasksAssignedToTitle">Subtasks:</p>
            <div id="openCheckTasksAssignedToTitle">

            </div>

            <button class="deleteTaskButton" onclick="toAskDeleteTask(${taskIndex})">
                <img  class="deleteTaskImage" src="./asseds/img/delete-white.png">
            </button>

            <button class="toEditTaskButton" onclick="openTaskToEdit(${taskIndex})">
                <img  class="toEditTaskImage" src="./asseds/img/Group 8.png">
            </button>
            <div onclick="closeContainer1()" class="closes2">&times;</div>
            <img onclick="closeContainer1()" class="closes4" src="./asseds/img/arrow-left-line.png">
        </div>
   
    `;

}


// loaad the html code for open the task to edit
function openTaskToEditHTML(task, duaDate, taskIndex) {
    return /*html*/ `
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
                    <img id="toEditRedImg" src="./asseds/img/pfeil-oben-rot.png">
                </div>
                <div id="toEditYellow" onclick="toEditChangeColor(id)" class="prioContainer">Medium
                    <img id="toEditYellowImg" class="medium" src="./asseds/img/medium-gelb.png">
                </div>
                <div id="toEditGreen" onclick="toEditChangeColor(id)" class="prioContainer">Low
                    <img id="toEditGreenImg" src="./asseds/img/pfeil-unten-grün.png">
                </div>
            </div>

            <p class="titleInputFields">Assigned to</p>
            <div id="openContactToEdit" onclick="openContactsToEdit()" class="assignedDiv1">
                <p class="assignedContactsSelectToEdit" id="assignedContactsSelect">Select contacts to assigt</p>
                <img id="assignedContactImg" src="./asseds/img/Vector 2.png">
            </div>

            <div id="assignedToListToEdit" class="assignedToListToEdit d-none">
            
            </div>

            <div class="assignedAddContactToEdit" id="assignedAddContacts">
              
            </div>

            <button class="toEditTaskSaveButton" onclick="saveTask(${taskIndex}); closeTaskToEdit();">
                <p class="toEditTaskButtonText">Ok</p>
                <img class="toEditTaskImage" src="./asseds/img/check.png">
            </button>

        </div>
    `;

}


// load the html date for show the activeuser, help information and log aut butto
function loadActiveUserHTML(name, color) {
    return /*html*/ `
        <img class="headerImageLeft" src="./asseds/img/biglogo.png">
        <p>Kanban Project Management Tool</p>
    
        <div class="headerContentRight">
            <img onclick="helpp()" class="information" src="./asseds/img/information.png">
            <div id="userButton" onclick="showLogOutButtonBord()" class="personLogIn" style="background-color: ${color}">
                ${name}
            </div>
            
            <div id="bigLogOutButton" class="bigLogOutButton d-none">
                <div id="helpBord" class="helpBord d-none" onclick="helpp()">Help</div>
                <div id="legalNotice" class="legalNotice d-none" onclick="notice()" >Legal Notice</div>
                <div class="dataProtectionBord d-none" id="dataProtectionLogOutButton" onclick="dataProtection()">Datenschutz</div>
                <div class="LogOutBort" id="logOutButton" onclick="logOut()">Log Out</div>
            </div>

        </div>
    `;
}


//html code for create a new category
function createNewCategoryAllsHTML(element, i) {
    return /*html*/ `
        <div onclick="selectCategory(${currentIndex})" id="addTask_category-${currentIndex}" class="addTask_categoryMediaDivSmoll">
            <div class="addTask_categoryMediaDivSmollDiv">
                <li class="addTask_taskCategory">${element['name']}</li>
                <div class="addTask_categoryMedia ${element['color']}"></div>
            </div>
            <div onclick="deleteCategory(${i})" class="addTask_closes3">&times;</div>
        </div>
    `;
}


//html code for show the contact at container
function addContactssHTML(element, addreviatedName) {
    return /*html*/ `
        <div class="assignedAddContactDivs" style="background-color: ${element['color']}">
            <p class="assignedAddContactLetters">${addreviatedName}</p>          
        </div>
    `;
}


//html code for show the progressbar
function createTaskProgressbarHTML(progresses, procent, i) {
    return /*html*/ `
        <div class="progressBarBig">
            <div id="progressBar-${i}" class="progressBar" style="width: ${procent}%;">

            </div>
        </div>
        <span id="progressText-${i}" class="progressText">${progresses}</span>
    `;
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
        </div>
    `;
}

//thml code for create the information for assigned To in the task
function createTaskAssignedToHTML(color, initials) {
    return /*html*/ `
        <div class="assignTask">
        <div class="divAssignTask" style="background-color: ${color}">${initials}</div>
        </div>
    `;
}

//html code for shows the subtasks in the task
function openCheckTaskSubtasksHTML(element, checked, taskIndex, i) {
    return /*html*/ `
        <div class="checkboxSubtasksContainer">
            <input onclick="putTheProgressBar(${taskIndex})" id="subtask-${i}" class="openCheckboxSubtasks" type="checkbox" data-value="${element}" ${checked}>
            <p class="openSubtasksComent">${element}</p>
        </div>   
    `;
}

//thml code for show the contacts to edit in the list
function openTaskToEditContactsHTML(name, color) {
    let firstName = name[0] ? name[0] : '';
    let lastName = name[1] ? name[1] : '';
    let abbreviatedName = '';
    if (firstName && lastName) {
        abbreviatedName = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    } else if (firstName) {
        abbreviatedName = `${firstName[0].toUpperCase()}`;
    }
    return /*html*/ `
        <div class="assignTask">
            <div class="divAssignTask" style="background-color: ${color}">${abbreviatedName}</div>
        </div>
    `;
}


//html code for show the contacts under the list
function showContactsInToEditHTML(element, isAssigned) {
    return /*html*/ `
        <label class="assignedToListBox">
            <li class="taskAssignedTo">${element}</li>
            <input  onclick="selectContactedToEdit(id)" class="inputCheckbox" type="checkbox" value="${element}" id="${element}"${isAssigned ? ' checked' : ''}>
        </label>
    `;
}

//html code for create a new category
function createnewCategoryAllHTML(element, i) {
    return /*html*/ `
        <div onclick="selectCategory(${currentIndex})" id="category-${currentIndex}" class="categoryMediaDivSmoll">
            <div class="categoryMediaDivSmollDiv">
                <li class="taskCategory">${element['name']}</li>
                <div class="categoryMedia ${element['color']}"></div>
            </div>
            <div onclick="deleteCategory(${i})" class="closes3">&times;</div>
        </div>
    `;
}


//html code for  displays the selected name and color
function addContactsHTML(element, addreviatedName) {
    return /*html*/ `
        <div class="assignedAddContactDivs" style="background-color: ${element['color']}">
            <p class="assignedAddContactLetters">${addreviatedName}</p>          
        </div>
    `;
}

//html code for show all contacts
function openAllContactsHTML(name) {
    return /*html*/ `
        <label class="assignedToListBox">
            <li class="taskAssignedTo">${name}</li>
            <input  onclick="selectContacted(id)" class="inputCheckbox" type="checkbox" value="${name}" id="${name}">
        </label>
    `;
}

//html code for create an subtask
function SubtasksHTML(element, i) {
    return /*html*/ `
        <div class="checkboxSubtasksContainer">
            <input id="subtask-${i}" class="checkboxSubtasks" type="checkbox" data-value="${element}">
            <p class="subtasksComent">${element}</p>
        </div>
    `;
}


//html code for open the container for delete an task
function toAskDeleteTaskHTML(taskIndex) {
    return /*html*/ `
        <div class="askDeleteTask">
            <p class="deleteTaskTesx">Möchten Sie diese Task wirklich löschen?</p>
            <div>
                <button class="deleteTaskAnswer" onclick="deleteTask(${taskIndex})">Ja</button>
                <button id="deleteTaskAnswer" onclick="NonDeleteTask()" class="deleteTaskAnswer">Nein</button>
            </div>
        </div>
    `;
}


//html code for shows the first letter of the name in the task
function openCheckTaskNamesHTML(color, initials) {
    return /*html*/ `
        <div class="openCheckAssignTask">
        <div class="openCheckDivAssignTask" style="background-color: ${color}">${initials}</div>
        </div>
    `;
}



// load the html code for load the active user
function loadActiveUsersHTML(name, color) {
    return /*html*/ `
        <p>Kanban Project Management Tool</p>
        <img id="logoMobile" class="logoMobile d-none" src="./asseds/img/biglogo.png">
        <div class="headerContentRight">
            <img src="./asseds/img/hacken.png">
            <img id="closeImgForMobile" onclick="help()" class="information" src="./asseds/img/information.png">
            <div id="userButton" onclick="showLogOutButton()" class="personLogIn" style="background-color: ${color}">
                ${name}    
            </div>
            <div id="logOutButton" class="logOutButton d-none" >
                <div class="logOutAddTask" onclick="logOut()">Log Out</div>
            </div>
        </div>
    `;
}


//thml code for load the active user at summary
function loadActiveUsersSummaryHTML(name, color) {
    return /*html*/ `
        <p>Kanban Project Management Tool</p>
        <img id="logoMobile" class="logoMobile d-none" src="./asseds/img/biglogo.png">
        <div class="headerContentRight">
        
            <img onclick="helpSummary()" class="information" src="./asseds/img/information.png">
            <div id="userButton" onclick="showLogOutButtonSummary()" class="personLogIn" style="background-color: ${color}">
                ${name}
            </div>
            <div id="logOutButtonSummary" class="logOutButtonSummary d-none" >
                <div id="helpp" class="help d-none" onclick="helpSummary()">Help</div>
                <div id="legalNotice" class="legalNotice d-none" onclick="notice()">Legal Notice</div>
                <div id="dataProtectionLogOutButton" class="dataProtectionLogOutButton d-none" onclick="dataProtection()">Datenschutz</div>
                <div class="logOutSummary" onclick="logOut()">Log Out</div>
            </div>
        </div>
    `;
}