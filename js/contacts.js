let allContacts = [];


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


// show the whole information of a contact
function showContact(i) {
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


// display the box to create a new contact
function showContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'block';
    document.getElementById('newContactBoxBckgr').style.display = 'flex';
    document.getElementById('newContactBox').classList.add('animation');
}


// close the contactBox on purpose or after creation of new contant
function closeContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'none';
}


// Create contact from the inputFields and show at the contactlist
function createContact() {
    let contact = document.getElementById('contactList');
    contact.innerHTML = '';
    for (let i = 0; i < allContacts.length; i++) {
        let name = allContacts[i]['name'];
        let email = allContacts[i]['email'];
        let color = allContacts[i]['color'];
        contact.innerHTML += showContactDiv(name, email, getFirstLetters(name), i, color);
    }
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
    createContact();
    emptyInputFields();
}


// empty the inputFields from the contact box
function emptyInputFields() {
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('input3').value = '';
}


// show only the first letters of the name for the contact list
function getFirstLetters(str) {
    const firstLetters = str.split(' ').map(word => word[0]).join('');
    return firstLetters;
}

function showContactBtn() {
    document.getElementById('contactCreated').style.display = 'block';
    setTimeout(closeContactBtn, 800);
}

function closeContactBtn() {
    document.getElementById('contactCreated').style.display = 'none';
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }