let letters = [];

async function contactInit() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    letters = JSON.parse(backend.getItem('letters')) || [];
    activeUser = backend.getItem('activeUser') || 0;
    loadHeader();
    loadLetters();
    renderLetters();
    renderContactList();
    navBarHighlight(4);
}



function loadLetters() {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        let name = users[activeUser]['contacts'][i]['contactName'];
        let firstLetter = name.charAt(0);
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
            letters.sort();
        }
    }
}


//open the info container at help function
function help() {
    document.getElementById('helpContacts').classList.remove('d-none');
    document.getElementById('contactList').classList.add('d-none');
    document.getElementById('rightSection').classList.add('d-none');
    document.getElementById('newContact').classList.add('d-none');
    document.getElementById('logOutButton').classList.add('d-none');
    document.getElementById('legalNiticeContact').classList.add('d-none');
    document.getElementById('dataProtection').classList.add('d-none');

}


//close the info container at help function
function goBacktoMainContainers() {
    document.getElementById('helpContacts').classList.add('d-none');
    document.getElementById('contactList').classList.remove('d-none');
    document.getElementById('rightSection').classList.remove('d-none');
    document.getElementById('legalNiticeContact').classList.add('d-none');
    document.getElementById('newContact').classList.remove('d-none');
}


//open the notice container
function notice() {
    document.getElementById('legalNiticeContact').classList.remove('d-none');
    document.getElementById('contactList').classList.add('d-none');
    document.getElementById('rightSection').classList.add('d-none');
    document.getElementById('logOutButton').classList.add('d-none');
    document.getElementById('newContact').classList.add('d-none');
    document.getElementById('dataProtection').classList.add('d-none');
    document.getElementById('helpContacts').classList.add('d-none');
}


//open the data Protection information
function dataProtection() {
    document.getElementById('dataProtection').classList.remove('d-none');
    document.getElementById('contactList').classList.add('d-none');
    document.getElementById('rightSection').classList.add('d-none');
    document.getElementById('logOutButton').classList.add('d-none');
    document.getElementById('newContact').classList.add('d-none');
    document.getElementById('helpContacts').classList.add('d-none');
    document.getElementById('legalNiticeContact').classList.add('d-none');
}


//close the notice and data Pritection container
function goBack() {
    document.getElementById('dataProtection').classList.add('d-none');
    document.getElementById('contactList').classList.remove('d-none');
    document.getElementById('rightSection').classList.remove('d-none');
    document.getElementById('newContact').classList.remove('d-none');
}


//load activeuser 
function loadHeader() {
    let header = document.getElementById('headerContent');
    let color = users[activeUser]['color'];
    let firstLetters = users[activeUser]['initials'];
    header.innerHTML += showHeader(color, firstLetters);
}


//render the letters
function renderLetters() {
    let contact = document.getElementById('contactList');
    contact.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        let firstLetter = letters[i];
        contact.innerHTML += contactLetterHeadline(firstLetter);
    }
}


//render the contactlist
function renderContactList() {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        let name = users[activeUser]['contacts'][i]['contactName'];
        let email = users[activeUser]['contacts'][i]['contactEmail'];
        let letter = users[activeUser]['contacts'][i]['contactInitials'];
        let color = users[activeUser]['contacts'][i]['contactColor'];
        let firstLetter = name.charAt(0);
        createBigSection(name, email, letter, color, firstLetter, i);
    }
}


// display the box to create a new contact
function showContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'block';
    document.getElementById('newContactBoxBckgr').style.display = 'flex';
    document.getElementById('newContactBox').classList.add('animation');
}


// Add names, emailAdress, phoneNumber into InputFields and create JSON
async function addContact() {
    let color = getRandomColor();
    let contact = {
        'contactName': document.getElementById('input1').value,
        'contactEmail': document.getElementById('input2').value,
        'contactPhone': document.getElementById('input3').value,
        'contactColor': color,
        'contactInitials': getFirstLetters(document.getElementById('input1').value),
    };
    pushLetterToArray(contact.contactName.charAt(0));
    users[activeUser].contacts.push(contact);
    sortNamesAndCreateLetters();
    saveUsersAndLetters(users, letters);
    lastStepsBeforeContactCreate();
}


//push the letter to array
function pushLetterToArray(firstLetter) {
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
        letters.sort();
    }
}


//sort the name and create the letters
function sortNamesAndCreateLetters() {
    sortNames();
    createLetters();
}


// Sort the names alphabeticaly
function sortNames() {
    users[activeUser]['contacts'] = users[activeUser]['contacts'].sort((a, b) => {
        if (a.contactName < b.contactName) {
            return -1;
        }
    });
}


// to create the letter headlines
function createLetters() {
    let contact = document.getElementById('contactList');
    contact.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        let firstLetter = letters[i];
        contact.innerHTML += contactLetterHeadline(firstLetter);
    }
    createContact();
}


async function saveUsersAndLetters(users, letters) {
    await backend.setItem('users', JSON.stringify(users));
    await backend.setItem('letters', JSON.stringify(letters));
}


// Create contact from the inputFields and show at the contactlist
function createContact() {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        let name = users[activeUser]['contacts'][i]['contactName'];
        let email = users[activeUser]['contacts'][i]['contactEmail'];
        let letter = users[activeUser]['contacts'][i]['contactInitials'];
        let color = users[activeUser]['contacts'][i]['contactColor'];
        let firstLetter = name.charAt(0);
        createBigSection(name, email, letter, color, firstLetter, i);
    }
}


// to display the contactlist in alphabeticaly order with the letter headlines
// and show the letter headlines only once
function createBigSection(name, email, letter, color, firstLetter, i) {
    let contactList = document.getElementById(`contactLetter-${firstLetter}`);
    if (!contactList) {
        contactList = document.createElement('div');
        contactList.id = `contactLetter-${firstLetter}`;
        document.getElementById('contactList').appendChild(contactList);
    }
    if (!firstLetter || firstLetter == firstLetter) {
        let contactDiv = showContactDiv(name, email, letter, color, i);
        contactList.innerHTML += contactDiv;
    }
}


function lastStepsBeforeContactCreate() {
    emptyInputFields();
    closeContactBox();
    showContactBtn();
}


// empty the inputFields from the contact box
function emptyInputFields() {
    let input1 = document.getElementById('input1');
    let input2 = document.getElementById('input2');
    let input3 = document.getElementById('input3');
    input1.value = '';
    input2.value = '';
    input3.value = '';
}


// close the contactBox on purpose or after creation of new contant
function closeContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'none';
}


// Show the Button after a contact is created
function showContactBtn() {
    document.getElementById('contactCreated').style.display = 'block';
    setTimeout(closeContactBtn, 1000);
}


// Hide the Button after showContactBtn()
function closeContactBtn() {
    document.getElementById('contactCreated').style.display = 'none';
}


// show the whole information of a contact
function showContact(i) {
    document.getElementById('rightSection').style = 'display: block;'
    document.getElementById('rightSection').classList.remove('closeAnimation');
    let contactInfo = document.getElementById('bigContactSection');
    contactInfo.innerHTML = '';
    let name = users[activeUser]['contacts'][i]['contactName'];
    let email = users[activeUser]['contacts'][i]['contactEmail'];
    let phone = users[activeUser]['contacts'][i]['contactPhone'];
    let color = users[activeUser]['contacts'][i]['contactColor'];
    contactInfo.innerHTML += showBigConactDiv(getFirstLetters(name), name, email, phone, i, color);
    showContactAnimation(i);
    changeBckgrClr(i);
}


// show the animation of showCantct()
function showContactAnimation(i) {
    document.getElementById(`contactBox${i}`).classList.add('animation');
    document.getElementById(`contactBox${i}`).classList.remove('d-none');
}


// change backgroundcolor of the clicked contact on the list
function changeBckgrClr(i) {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        document.getElementById(`contactDiv${i}`).classList.remove('bg-blue');
        document.getElementById(`contactDiv${i}`).classList.add('hover');
        document.getElementById(`contactDiv${i}`).classList.remove('clr-white');
        document.getElementById(`contactLetter${i}`).classList.remove('border');
    }
    document.getElementById(`contactDiv${i}`).classList.add('bg-blue');
    document.getElementById(`contactDiv${i}`).classList.remove('hover');
    document.getElementById(`contactDiv${i}`).classList.add('clr-white');
    document.getElementById(`contactLetter${i}`).classList.add('border');
}


// display the box to edit an existing Contact
function showEditContactBox(i) {
    let color = users[activeUser]['contacts'][i]['contactColor'];
    let letters = getFirstLetters(users[activeUser]['contacts'][i]['contactName']);
    document.getElementById('editContactBoxBckgr').innerHTML += editContactBox(i, color, letters);
    document.getElementById('editContactBoxBckgr').style.display = 'block';
    document.getElementById('editContactBoxBckgr').style.display = 'flex';
    document.getElementById(`editContactBox${i}`).classList.add('animation');
    document.getElementById('input1Filled').value = users[activeUser]['contacts'][i]['contactName'];
    document.getElementById('input2Filled').value = users[activeUser]['contacts'][i]['contactEmail'];
    document.getElementById('input3Filled').value = users[activeUser]['contacts'][i]['contactPhone'];
}


// to create the existing contact again, but with changed information
function createEditSection(name, email, str, color, firstLetter, i) {
    let contact = document.getElementById(`contactLetter-${firstLetter}`);
    contact.innerHTML = '';
    contact.innerHTML += showContactDiv(name, email, str, color, i);
    renderLetters();
    renderContactList();
}


// close the editbox on purpose or after editing of existing contant
function closeEditBox() {
    document.getElementById('editContactBoxBckgr').style.display = 'none';
    document.getElementById('editContactBoxBckgr').innerHTML = '';
}


// to save the edited contact information in array and display them
async function saveContactChanges(i) {
    let name = document.getElementById('input1Filled').value;
    let email = document.getElementById('input2Filled').value;
    let phone = document.getElementById('input3Filled').value;
    let str = getFirstLetters(name);
    let color = users[activeUser]['contacts'][i]['contactColor'];
    let firstLetter = name.charAt(0)
    users[activeUser]['contacts'][i]['contactName'] = name;
    users[activeUser]['contacts'][i]['contactEmail'] = email;
    users[activeUser]['contacts'][i]['contactPhone'] = phone;
    await backend.setItem('users', JSON.stringify(users));
    createEditSection(name, email, str, color, firstLetter, i);
    showContact(i);
    closeEditBox();
}


//delete a contact
async function deleteContact(i) {
    let deletedContact = users[activeUser]['contacts'][i];
    let firstLetter = users[activeUser]['contacts'][i]['contactName'].charAt(0);
    letters.splice(firstLetter);
    await backend.deleteItem('firstLetter', firstLetter);
    await backend.setItem('letters', JSON.stringify(letters));
    await backend.deleteItem('deletedContact', deletedContact);
    users[activeUser]['contacts'].splice(i, 1);
    await backend.setItem('users', JSON.stringify(users));
    document.getElementById('bigContactSection').innerHTML = '';
    loadLetters();
    renderLetters();
    renderContactList();
    closeEditBox();
}



// show only the first letters of the name for the contact list
function getFirstLetters(str) {
    const firstLetters = str.split(' ').map(word => word[0]).join('');
    return firstLetters;
}


// Generate different Colors for each created Contact
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//open the log out button
function showLogOutButton() {
    document.getElementById('logOutButton').classList.remove('d-none');
    document.getElementById('logOutBackground').classList.remove('d-none');
    document.getElementById('userButton').style.removeProperty('cursor: pointer');
}


//close the log out button
function hideLogOutButton() {
    document.getElementById('logOutButton').classList.add('d-none');
    document.getElementById('logOutBackground').classList.add('d-none');
}


//log out
async function logOut() {
    await backend.deleteItem('activeUser');
    await backend.deleteItem('letters');
    window.location.href = 'index.html';
}

//close the info container
function closeMobileContactInfo() {
    document.getElementById('rightSection').classList.add('closeAnimation');
}