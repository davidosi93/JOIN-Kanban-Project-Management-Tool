let allContacts = [];
let letters = [];


// display the box to create a new contact
function showContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'block';
    document.getElementById('newContactBoxBckgr').style.display = 'flex';
    document.getElementById('newContactBox').classList.add('animation');
}


// display the box to edit an existing Contact
function showEditContactBox(i) {
    let color = allContacts[i]['color'];
    let letters = getFirstLetters(allContacts[i]['name']);
    document.getElementById('editContactBoxBckgr').innerHTML += editContactBox(i, color, letters);
    document.getElementById('editContactBoxBckgr').style.display = 'block';
    document.getElementById('editContactBoxBckgr').style.display = 'flex';
    document.getElementById(`editContactBox${i}`).classList.add('animation');
    document.getElementById('input1Filled').value = allContacts[i]['name'];
    document.getElementById('input2Filled').value = allContacts[i]['email'];
    document.getElementById('input3Filled').value = allContacts[i]['phone'];
}


// Add names, emailAdress, phoneNumber into InputFields and create JSON
async function addContact() {
    const name = document.getElementById('input1').value;
    const email = document.getElementById('input2').value;
    const phone = document.getElementById('input3').value;
    const color = getRandomColor();
    let contacts = {
        'name': name,
        'email': email,
        'phone': phone,
        'color': color
    };
    allContacts.push(contacts);
    if (!users[activeUser]) {
        users[activeUser] = {};
    }
    if (!users[activeUser]['contacts']) {
        users[activeUser]['contacts'] = [];
    }
    users[activeUser]['contacts'] = allContacts;
    let firstLetter = name.charAt(0);
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
        letters.sort();
    }
    sortNames();
    renderLetters();
    emptyInputFields();
    await backend.setItem('users', JSON.stringify(users));
    await backend.setItem('allContacts', JSON.stringify(allContacts));
    closeContactBox();
    showContactBtn();
}


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    activeUser = backend.getItem('activeUser');
}


// Sort the names alphabeticaly
function sortNames() {
    allContacts = allContacts.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
    });
}


// to display the contactlist in alphabeticaly order with the letter headlines
// and show the letter headlines only once
function createBigSection(name, email, letter, color, firstLetter, i) {
    let contact = document.getElementById(`contactLetter-${firstLetter}`);
    if (!firstLetter || firstLetter == firstLetter) {
        contact.innerHTML += showContactDiv(name, email, letter, color, i);
    }
}


// Create contact from the inputFields and show at the contactlist
function createContact() {
    for (let i = 0; i < allContacts.length; i++) {
        let name = allContacts[i]['name'];
        let email = allContacts[i]['email'];
        let color = allContacts[i]['color'];
        let letter = getFirstLetters(name);
        let firstLetter = name.charAt(0);
        createBigSection(name, email, letter, color, firstLetter, i);
    }
}


// to create the letter headlines
function renderLetters() {
    let contact = document.getElementById('contactList');
    contact.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        const firstLetter = letters[i];
        contact.innerHTML += contactLetterHeadline(firstLetter);
    }
    createContact();
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


// show the whole information of a contact
function showContact(i) {
    document.getElementById(`contactDiv0`).classList.contains('bg-white');
    let contactInfo = document.getElementById('bigContactSection');
    let name = allContacts[i]['name'];
    let email = allContacts[i]['email'];
    let phone = allContacts[i]['phone'];
    let color = allContacts[i]['color'];
    contactInfo.innerHTML = '';
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
    for (let i = 0; i < allContacts.length; i++) {
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


// close the contactBox on purpose or after creation of new contant
function closeContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'none';
}


// close the editbox on purpose or after editing of existing contant
function closeEditBox() {
    document.getElementById('editContactBoxBckgr').style.display = 'none';
    document.getElementById('editContactBoxBckgr').innerHTML = '';
}


// show only the first letters of the name for the contact list
function getFirstLetters(str) {
    const firstLetters = str.split(' ').map(word => word[0]).join('');
    return firstLetters;
}


// Show the Button after a contact is created
function showContactBtn() {
    document.getElementById('contactCreated').style.display = 'block';
    setTimeout(closeContactBtn, 800);
}


// Hide the Button after showContactBtn()
function closeContactBtn() {
    document.getElementById('contactCreated').style.display = 'none';
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


// to create the existing contact again, but with changed information
function createEditSection(name, email, str, color, firstLetter, i) {
    let contact = document.getElementById(`contactLetter-${firstLetter}`);
    contact.innerHTML = '';
    contact.innerHTML += showContactDiv(name, email, str, color, i);
    renderLetters();
}


// to save the edited contact information in array and display them
function saveContactChanges(i) {
    let name = document.getElementById('input1Filled').value;
    let email = document.getElementById('input2Filled').value;
    let phone = document.getElementById('input3Filled').value;
    let str = getFirstLetters(name);
    let color = allContacts[i]['color'];
    let firstLetter = name.charAt(0)
    allContacts[i]['name'] = name;
    allContacts[i]['email'] = email;
    allContacts[i]['phone'] = phone;
    createEditSection(name, email, str, color, firstLetter, i);
    showContact(i);
    closeEditBox();
}