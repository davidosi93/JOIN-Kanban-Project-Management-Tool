let users = [];
let activeUser;


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    activeUser = backend.getItem('activeUser') || 0;
}

function navBarHighlight(item) {
    if (item == 1) {
        document.getElementById('navBarSummary').classList.add('buttonSectionBackground');
    }
    if (item == 2) {
        document.getElementById('navBarBoard').classList.add('buttonSectionBackground');
    }
    if (item == 3) {
        document.getElementById('navBarAddTask').classList.add('buttonSectionBackground');
    }
    if (item == 4) {
        document.getElementById('navBarContacts').classList.add('buttonSectionBackground');
    }
}

let allTasks = [];

async function getAllTasks(){
    await downloadFromServer()
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}

let todo = [];
let progress = [];
let feedback = [];
let done = [];

async function filterAllTasks(){
    todo = allTasks.filter(t => t['list'] == 'todo');
    progress = allTasks.filter(t => t['list'] == 'progress');
    feedback = allTasks.filter(t => t['list'] == 'feedback');
    done = allTasks.filter(t => t['list'] == 'done');
}