let colorArray = [];


// container for select the color and image of priority at create an task
function containerForChangeColor() {
    const redElement = document.getElementById('red');
    const yellowElement = document.getElementById('yellow');
    const greenElement = document.getElementById('green');
    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');
    document.getElementById('redImg').src = './asseds/img/pfeil-oben-rot.png';
    document.getElementById('yellowImg').src = './asseds/img/medium-gelb.png';
    document.getElementById('greenImg').src = './asseds/img/pfeil-unten-grün.png';
    return { redElement, yellowElement, greenElement };
}


// container for select the color and image of priority at to edit an task
function containerToEditChangeColor() {
    const redElement = document.getElementById('toEditRed');
    const yellowElement = document.getElementById('toEditYellow');
    const greenElement = document.getElementById('toEditGreen');
    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');
    document.getElementById('toEditRedImg').src = './asseds/img/pfeil-oben-rot.png';
    document.getElementById('toEditYellowImg').src = './asseds/img/medium-gelb.png';
    document.getElementById('toEditGreenImg').src = './asseds/img/pfeil-unten-grün.png';
    return { redElement, yellowElement, greenElement };
}


// clears the color-button and arrays
function resetSettingsChangeColor() {
    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = './asseds/img/pfeil-oben-rot.png';
    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = './asseds/img/medium-gelb.png';
    document.getElementById('green').classList.remove('green');
    document.getElementById('greenImg').src = './asseds/img/pfeil-unten-grün.png';
}


/** Area for Category */


// open the category list
function openCategory() {
    if (newCategorySelected) {
        return;
    }
    let category = document.getElementById('categoryList');
    if (category.classList.contains('d-none')) {
        category.classList.remove('d-none');
        document.getElementById('borderButton').classList.add('borderButton');
    } else {
        category.classList.add('d-none');
        document.getElementById('borderButton').classList.remove('borderButton');
    }
}


// choose a category
function selectCategory(id) {
    const selectedElement = document.getElementById(`category-${id}`);
    const name = selectedElement.querySelector('.taskCategory').innerHTML;
    const color = selectedElement.querySelector('.categoryMedia').classList[1];
    allLiCategory = ({ name, color });
    let ulCategory = document.getElementById("categoryList");
    let category = selectedElement.querySelector('.categoryMediaDivSmollDiv').innerHTML;
    document.getElementById('selectTaskCategory').style = 'display: flex; align-items: center; list-style-type: none; margin-left: -18px;';
    document.getElementById("selectTaskCategory").innerHTML = category;
    ulCategory.classList.add('d-none');
    document.getElementById('borderButton').classList.remove('borderButton');
}


// uses the original format
function resetCategoryListAtCoinst() {
    document.getElementById('selectTaskCategory').classList.add('d-none');
    document.getElementById('categoryList').classList.add('d-none');
    document.getElementById('borderButton').classList.remove('borderButton');
    document.getElementById('containerColorPicker').classList.remove('d-none');
    document.getElementById('selectNewCategoryImg').classList.remove('d-none');
    document.getElementById('selectTaskCategoryImg').classList.add('d-none');
}


// uses the original format
function resetCategoryList() {
    document.getElementById('selectTaskCategory').classList.remove('d-none');
    document.getElementById('categoryList').classList.remove('d-none');
    document.getElementById('borderButton').classList.add('borderButton');
    document.getElementById('containerColorPicker').classList.add('d-none');
    document.getElementById('selectNewCategoryImg').classList.add('d-none');
    document.getElementById('selectTaskCategoryImg').classList.remove('d-none');
}


// open the craate inputfield 
function selectNewCategory() {
    let selectNewCategory = document.getElementById('selectNewCategory');
    selectNewCategory.value = ``;
    if (selectNewCategory.classList.contains('d-none')) {
        selectNewCategory.classList.remove('d-none');
        resetCategoryListAtCoinst()
    } else {
        selectNewCategory.classList.add('d-none');
        resetCategoryList()
    }
    newCategorySelected = true;
}

// reset the category field
function resetSettingsCategory() {
    let selectTaskCategory = document.getElementById("selectTaskCategory");
    document.getElementById("selectTaskCategory").innerHTML = '';
    document.getElementById('selectTaskCategory').style = 'margin-left: 0px;';
    selectTaskCategory.innerHTML = "Select Task Category";
}

//show the errow message
function showError(message) {
    showMessage(message, 'error');
}


//show success
function showSuccess(message) {
    showMessage(message, 'success');
}


// show a massege
function showMessage(message, type) {
    const container = document.getElementById('taskDiv1');
    container.classList.remove('d-none');
    container.innerHTML = message;
    container.style.display = 'block';
    const timeout = 1000;
    setTimeout(function() {
        container.style.display = 'none';
    }, timeout);
}


// reset the colorpiker
function resetCategoryColors() {
    const colors = ['pink', 'orange', 'green', 'turquoise', 'yellow', 'blue'];
    colors.forEach(color => {
        document.getElementById(`bg-${color}`).style = 'box-shadow: none;';
    });
}


// create a new category
function createnewCategoryAll() {
    newCategorys = document.getElementById('createNewTategory');
    newCategorys.innerHTML = '';
    for (let i = 0; i < users[activeUser]['categorys'].length; i++) {
        const element = users[activeUser]['categorys'][i];
        newCategorys.innerHTML += createnewCategoryAllHTML(element, i);
        currentIndex++;
    }
}

// select the color for category
function newCategorySelectColor(id) {
    currentCategoryColor = id;
    let colorPickers = document.getElementsByClassName('colorPicker')
    for (let item of colorPickers) {
        item.style = '';
    }
    document.getElementById(id).style = 'box-shadow: 0px 10px 12px -6px #000000;';
}


// delete the category
async function deleteCategory(i) {
    users[activeUser]['categorys'].splice(i, 1);
    await backend.deleteItem('users', users);
    createnewCategoryAll()
    await backend.setItem('users', JSON.stringify(users));
}


/** Area for Assigned To */

// open the list of contacts
function openContacts() {
    let allContacts = document.getElementById('assignedToList');
    if (allContacts.classList.contains('d-none')) {
        allContacts.classList.remove('d-none');
        document.getElementById('openContact').classList.add('assignedDivBorderToEdit');
    } else {
        allContacts.classList.add('d-none');
        document.getElementById('openContact').classList.remove('assignedDivBorderToEdit');
    }
}



// push and delete the name and color in Array 
function selectContacted(id) {
    let chackedBox = document.getElementById(id);
    if (chackedBox.checked) {
        let elementColor = getColorForContact(id);
        assignedChackedBox.push({
            'name': chackedBox.value,
            'color': elementColor
        });
    } else {
        assignedChackedBox = assignedChackedBox.filter(e => e.name !== chackedBox.value);
    }
    addContacts();
}



//get the color from the choosen contact
function getColorForContact(contactId) {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        if (users[activeUser]['contacts'][i].contactName === contactId) {
            return users[activeUser]['contacts'][i].contactColor;
        }
    }
    return null;
}



// displays the selected name and color
function addContacts() {
    let assignedAddContact = document.getElementById('assignedAddContact');
    assignedAddContact.innerHTML = '';
    for (let i = 0; i < assignedChackedBox.length; i++) {
        const element = assignedChackedBox[i];
        let nameParts = element['name'].split(' ');
        let firstName = nameParts[0];
        let lastName = nameParts.length > 1 ? nameParts[1] : '';
        let abbreviatedName = firstName[0] + (lastName ? lastName[0] : '');
        assignedAddContact.innerHTML += addContactsHTML(element, abbreviatedName);
    }
}




// clears the input field and arrays
function resetCheckboxes() {
    assignedChackedBox = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

// abbreviates the name to letters
function getFirstLetters(str) {
    const words = str.split(' ');
    const firstLetters = words.map(word => word[0]);
    return firstLetters.join('');
}

// show all contacts
function openAllContacts() {
    let assignedToList = document.getElementById('assignedToList');
    assignedToList.innerHTML = '';
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        const name = users[activeUser]['contacts'][i]['contactName'];
        assignedToList.innerHTML += openAllContactsHTML(name);
    }
}


/** Area for Subtask */

// opens the bar of buttons to close and to push the value in Array
function openSubtask() {
    document.getElementById('subtasksAddImg').classList.add('d-none');
    document.getElementById('subtsasksCancelImg').classList.remove('d-none');
    document.getElementById('subtasksSubLine').classList.remove('d-none');
    document.getElementById('subtasksChackImg').classList.remove('d-none');

}

// closes the bar
function subtasksCancel() {
    document.getElementById('subtasksAddImg').classList.remove('d-none');
    document.getElementById('subtsasksCancelImg').classList.add('d-none');
    document.getElementById('subtasksSubLine').classList.add('d-none');
    document.getElementById('subtasksChackImg').classList.add('d-none');
    document.getElementById('openSubtasks').value = '';
}

// push the value in Array
function addSubtasks() {
    let openSubtasks = document.getElementById('openSubtasks').value;
    if (openSubtasks.length > 0) {
        allSubtasks.push(openSubtasks);
        Subtasks()
    }
    document.getElementById('openSubtasks').value = '';
    subtasksCancel()
}

// create an subtask
function Subtasks() {
    let allAddSubtasks = document.getElementById('allAddSubtask');
    allAddSubtasks.innerHTML = '';
    for (let i = 0; i < allSubtasks.length; i++) {
        const element = allSubtasks[i];
        allAddSubtasks.innerHTML += SubtasksHTML(element, i);
    }
    addCheckboxListeners();
}


// adds and deletes a subtask in the array
function addCheckboxListeners() {
    document.querySelectorAll('.checkboxSubtasks').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const value = this.dataset.value;
            if (this.checked) {
                if (!selectedSubtasks.includes(value)) {
                    selectedSubtasks.push(value);
                }
            } else {
                const index = selectedSubtasks.indexOf(value);
                if (index > -1) {
                    selectedSubtasks.splice(index, 1);
                }
            }
        });
    });
}

//clears the input field and arrays
function resetSubtasks() {
    document.getElementById('allAddSubtask').innerHTML = '';
    selectedSubtasks = [];
    allSubtasks = [];
}

// select the color and image of priority at create an task
function changeColor(color) {
    const { redElement, yellowElement, greenElement } = containerForChangeColor();
    let text;
    let coloredImage;
    let whiteImage;
    if (color === 'red') {
        redElement.classList.add('red');
        document.getElementById('redImg').src = './asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim();
        coloredImage = './asseds/img/pfeil-oben-rot.png';
        whiteImage = './asseds/img/pfeil-oben-weiss.png';
    } else if (color === 'yellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('yellowImg').src = './asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim();
        coloredImage = './asseds/img/medium-gelb.png';
        whiteImage = './asseds/img/medium-weiss.png';
    } else if (color === 'green') {
        greenElement.classList.add('green');
        document.getElementById('greenImg').src = './asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim();
        coloredImage = './asseds/img/pfeil-unten-grün.png';
        whiteImage = './asseds/img/pfeil-unten-weiss.png';
    }
    colorArray = { color: color, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}


// select the color and image of priority at to edit an task
function toEditChangeColor(color) {
    const { redElement, yellowElement, greenElement } = containerToEditChangeColor();
    let text;
    let coloredImage;
    let whiteImage;
    let actualColor;
    if (color === 'toEditRed') {
        redElement.classList.add('red');
        document.getElementById('toEditRedImg').src = './asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim();
        coloredImage = './asseds/img/pfeil-oben-rot.png';
        whiteImage = './asseds/img/pfeil-oben-weiss.png';
        actualColor = 'red';
    } else if (color === 'toEditYellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('toEditYellowImg').src = './asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim();
        coloredImage = './asseds/img/medium-gelb.png';
        whiteImage = './asseds/img/medium-weiss.png';
        actualColor = 'yellow';
    } else if (color === 'toEditGreen') {
        greenElement.classList.add('green');
        document.getElementById('toEditGreenImg').src = './asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim();
        coloredImage = './asseds/img/pfeil-unten-grün.png';
        whiteImage = './asseds/img/pfeil-unten-weiss.png';
        actualColor = 'green';
    }
    colorArray = { color: actualColor, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}


// close the inputlied
function selectNewCatagoryCancel() {
    document.getElementById('selectNewCategoryImg').classList.add('d-none');
    document.getElementById('containerColorPicker').classList.add('d-none');
    document.getElementById('selectNewCategory').classList.add('d-none');
    document.getElementById('selectTaskCategory').classList.remove('d-none');
    document.getElementById('selectTaskCategoryImg').classList.remove('d-none');
    document.getElementById('categoryList').classList.remove('d-none');
    newCategorySelected = false;
}


// create a neu category
async function createNewCategory() {
    const newCategory = document.getElementById('selectNewCategory').value;
    const jsonColor = {
        'name': newCategory,
        'color': currentCategoryColor,
    };
    if (!newCategory) {
        showError('Bitte wählen Sie eine Kategorie aus');
        return;
    }
    if (!currentCategoryColor) {
        showError('Bitte wählen Sie eine Farbe für die neue Kategorie aus.');
        return;
    }
    const categoryExists = users[activeUser]['categorys'].some(category => category.name === newCategory && category.color === currentCategoryColor);
    if (categoryExists) {
        showError('Eine Kategorie mit demselben Namen und derselben Farbe existiert bereits.');
        return;
    }
    users[activeUser]['categorys'].push(jsonColor);
    currentCategoryColor = null;
    selectNewCatagoryCancel();
    createnewCategoryAll();
    newCategorySelected = false;
    showSuccess('Eine neue Kategorie wurde erfolgreich erstellt.');
    await Promise.all([
        backend.setItem('allCategorys', JSON.stringify(allCategorys)),
        backend.setItem('users', JSON.stringify(users)),
    ]);
    resetCategoryColors();
}