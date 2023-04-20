let users = [];
let allTasks = [];
let todo = [];
let progress = [];
let feedback = [];
let done = [];
let activeUser;


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    activeUser = backend.getItem('activeUser') || 0;
}


//designe for the navigation bar
function navBarHighlight(item) {
    if (item == 1) {
        document.getElementById('navBarSummary').classList.add('buttonSectionBackground');
        document.getElementById('summary').classList.add('buttonSectionBackground');
    }
    if (item == 2) {
        document.getElementById('board').classList.add('buttonSectionBackground');
        document.getElementById('boardNavBarBoard').classList.add('buttonSectionBackground');
    }
    if (item == 3) {
        document.getElementById('boardNavBarAddTask').classList.add('buttonSectionBackground');
        document.getElementById('addTask').classList.add('buttonSectionBackground');
    }
    if (item == 4) {
        document.getElementById('navBarContacts').classList.add('buttonSectionBackground');
        document.getElementById('contacts').classList.add('buttonSectionBackground');
    }
}


//loaded and save the tasks and categorys from the activeuser
async function getAllTasks() {
    await downloadFromServer()
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allCategorys = JSON.parse(backend.getItem('allCategorys')) || [];
    users = JSON.parse(backend.getItem('users')) || [];
    activeUser = backend.getItem('activeUser') || 0;
}


//filter the tasks in the catagorys
async function filterAllTasks() {
    todo = users[activeUser]['tasks'].filter(t => t['list'] == 'todo');
    progress = users[activeUser]['tasks'].filter(t => t['list'] == 'progress');
    feedback = users[activeUser]['tasks'].filter(t => t['list'] == 'feedback');
    done = users[activeUser]['tasks'].filter(t => t['list'] == 'done');
}