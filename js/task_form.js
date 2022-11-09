let allTasks = [];

/**
 * Create Task and put it to the JSON allTasks
 * 
 */
function addTask() {
    let title = document.getElementById('').value;
    let description = document.getElementById('').value;
    let category = document.getElementById('').value;

    let task = {
        'title': title,
        'description': description,
        'category': category,
        'createAt': new Date().getTime()
    };


    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}

function closeContainer() {
    document.getElementById('deleteContainer').classList.add('d-none');
}