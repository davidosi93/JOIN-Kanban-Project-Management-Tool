function help() {
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('help').classList.remove('d-none');
}

function goBacktoMainContainer() {
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('help').classList.add('d-none');
}

function onHoverLeft() {
    document.getElementById('left-img').src = './asseds/img/stift-weiss.png';
}

function offHoverLeft() {
    document.getElementById('left-img').src = './asseds/img/Frame 59.png';
}

function onHoverRight() {
    document.getElementById('right-img').src = './asseds/img/hacken-weiss.png';

}

function offHoverRight() {
    document.getElementById('right-img').src = './asseds/img/Group 7 (1).png';
}

async function initSummary() {
    includeHTML();
    await getAllTasks();
    filterAllTasks();
    watchTask();
    loadActiveUsers();
    navBarHighlight(1);
}

function loadActiveUsers() {
    let activeUsers = document.getElementById('headerContents');
    activeUsers.innerHTML = '';

    const name = users[activeUser]['initials'];
    const color = users[activeUser]['color'];
    activeUsers.innerHTML = /*html*/ `
            <p>Kanban Project Management Tool</p>
            <img id="logoMobile" class="logoMobile d-none" src="./asseds/img/biglogo.png">
            <div class="headerContentRight">
            
                <img onclick="help()" class="information" src="./asseds/img/information.png">
                <div id="userButton" onclick="showLogOutButton()" class="personLogIn" style="background-color: ${color}">
                    ${name}
                </div>
                <div id="logOutButton" class="logOutButton d-none" >
                <div id="helpp" class="d-none">Help</div>
                <div id="legalNotice" class="d-none">Legal Notice</div>
                <div onclick="logOut()">Log Out</div>
                </div>
            </div>
        `;

    greet();
}

function watchTask() {
    let watchUrgent = document.getElementById('task-urgent');
    let watchBoard = document.getElementById('task-board');
    let watchTodo = document.getElementById('task-todo');
    let watchDone = document.getElementById('task-done');
    let watchProgress = document.getElementById('task-progress');
    let watchFeedback = document.getElementById('task-feedback');
    let watchDate = document.getElementById('task-date');

    clearDivs(watchUrgent, watchBoard, watchTodo, watchDone, watchProgress, watchFeedback, watchDate);
    watchtasksLength(watchUrgent, watchBoard, watchTodo, watchDone, watchProgress, watchFeedback, watchDate);

}

function clearDivs(watchUrgent, watchBoard, watchTodo, watchDone, watchProgress, watchFeedback, watchDate) {
    watchUrgent.innerHTML = '';
    watchTodo.innerHTML = '';
    watchDone.innerHTML = '';
    watchBoard.innerHTML = '';
    watchProgress.innerHTML = '';
    watchFeedback.innerHTML = '';
    watchDate.innerHTML = '';
}


function watchtasksLength(watchUrgent, watchBoard, watchTodo, watchDone, watchProgress, watchFeedback, watchDate) {
    let countUrgent = showUrgent()
    let earliestDueDate = deudate()

    watchUrgent.innerHTML += `<b>${countUrgent}</b>`;
    watchBoard.innerHTML += `<b>${users[activeUser]['tasks'].length}</b>`;
    watchProgress.innerHTML += `<b>${progress.length}</b>`;
    watchFeedback.innerHTML += `<b>${feedback.length}</b>`;
    watchTodo.innerHTML += `<b>${todo.length}</b>`;
    watchDone.innerHTML += `<b>${done.length}</b>`;
    watchDate.innerHTML += `<b>${earliestDueDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</b>`;
}

function deudate() {
    let earliestDueDate = new Date(users[activeUser]['tasks'][0].dueDates);
    for (let i = 1; i < users[activeUser]['tasks'].length; i++) {
        let currentDueDate = new Date(users[activeUser]['tasks'][i].dueDates);
        if (currentDueDate < earliestDueDate) {
            earliestDueDate = currentDueDate;
        }
    }

    return earliestDueDate;
}

function showUrgent() {
    let countUrgent = 0;
    for (let i = 0; i < users[activeUser]['tasks'].length; i++) {
        if (users[activeUser]['tasks'][i].prio.text === 'Urgent') {
            countUrgent++;
        }
    }

    return countUrgent;
}


function greet() {
    let greet = document.getElementById('greetTime');
    greet.innerHTML = '';
    let today = new Date()
    let curHr = today.getHours()

    if (curHr < 12) {
        greet.innerHTML = `good morning<br><p>${users[activeUser]['name']}</p>`;
    } else if (curHr < 18) {
        greet.innerHTML = `good afternoon<br><p>${users[activeUser]['name']}</p>`;
    } else {
        greet.innerHTML = `good evening<br><p>${users[activeUser]['name']}</p>`;
    }
}