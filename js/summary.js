function help(){
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('help').classList.remove('d-none');
}

function goBacktoMainContainer(){
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('help').classList.add('d-none');
}

function onHoverLeft(){
    document.getElementById('left-img').src = 'asseds/img/stift-weiss.png';
}

function offHoverLeft(){
    document.getElementById('left-img').src = 'asseds/img/Frame 59.png';
}

function onHoverRight(){
    document.getElementById('right-img').src = 'asseds/img/hacken-weiss.png';
    
}

function offHoverRight(){
    document.getElementById('right-img').src = 'asseds/img/Group 7 (1).png';
}

async function initSummary(){
    includeHTML();
    await getAllTasks();
    filterAllTasks();
    watchTask();
}

function watchTask(){
    let watchBoard = document.getElementById('task-board');
    let watchTodo = document.getElementById('task-todo');
    let watchDone = document.getElementById('task-done');
    let watchProgress = document.getElementById('task-progress');
    let watchFeedback = document.getElementById('task-feedback');
    clearDivs(watchBoard,watchTodo,watchDone,watchProgress,watchFeedback);
    watchtasksLength(watchBoard,watchTodo,watchDone,watchProgress,watchFeedback);
    
}

function  clearDivs(watchBoard,watchTodo,watchDone,watchProgress,watchFeedback){
    watchTodo.innerHTML = '';
    watchDone.innerHTML = '';
    watchBoard.innerHTML ='';
    watchProgress.innerHTML ='';
    watchFeedback.innerHTML ='';
}

function watchtasksLength(watchBoard,watchTodo,watchDone,watchProgress,watchFeedback){
    watchBoard.innerHTML += `<b>${allTasks.length}</b>`;
    watchProgress.innerHTML += `<b>${progress.length}</b>`;
    watchFeedback.innerHTML += `<b>${feedback.length}</b>`;
    watchTodo.innerHTML += `<b>${todo.length}</b>`;
    watchDone.innerHTML += `<b>${done.length}</b>`;
}