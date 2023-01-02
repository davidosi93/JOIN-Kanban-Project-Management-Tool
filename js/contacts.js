let allContacts = [];
let letters = [];




// display the box to create a new contact
function showContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'block';
    document.getElementById('newContactBoxBckgr').style.display = 'flex';
    document.getElementById('newContactBox').classList.add('animation');
}


// Add names, emailAdress, phoneNumber into InputFields and create JSON
function addContact() {
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
    let firstLetter = name.charAt(0);
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
        letters.sort();
    }
    sortNames();
    renderLetters();
    emptyInputFields();
    closeContactBox();
    showContactBtn();
}


// Sort the names alphabeticaly
function sortNames() {
    allContacts = allContacts.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
    });
}


function createBigSection(name, email, color, firstLetter, i) {
    let contact = document.getElementById(`contactLetter-${firstLetter}`);
    if (!firstLetter || firstLetter == firstLetter) {
        contact.innerHTML += showContactDiv(name, email, getFirstLetters(name), color, i);
    }
}

// Create contact from the inputFields and show at the contactlist
function createContact() {
    for (let i = 0; i < allContacts.length; i++) {
        let name = allContacts[i]['name'];
        let email = allContacts[i]['email'];
        let color = allContacts[i]['color'];
        let firstLetter = name.charAt(0);
        createBigSection(name, email, color, firstLetter, i);
    }
}

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
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('input3').value = '';
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