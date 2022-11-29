let allContacts = [];
let selectedContact;


// change backgroundcolor of the clicked contact on the list
function changeBckgrClr(i) {
    const div = document.getElementById(`contactDiv${i}`);
    selectedContact = `contactDiv${i}`;
    if (div.classList.contains('bg-white') == true) {
        changeBckgrClrBlue(i);
    } else {
        document.getElementById(`contactBox${i}`).classList.add('d-none');
        document.getElementById(`contactBox${i}`).classList.remove('animation');
        changeBckgrClrWhite(i);
    }
}


// change the backgorund color to blue on the contact list
function changeBckgrClrBlue(i) {
    
    document.getElementById(`contactDiv${i}`).classList.remove('hover');
    document.getElementById(`contactDiv${i}`).classList.remove('bg-white');
    document.getElementById(`contactDiv${i}`).classList.add('bg-blue');
    document.getElementById(`contactDiv${i}`).classList.add('clr-white');
}


// change the backgorund color to white on the contact list
function changeBckgrClrWhite(i) {
    document.getElementById(`contactDiv${i}`).classList.add('hover');
    document.getElementById(`contactDiv${i}`).classList.add('bg-white');
    document.getElementById(`contactDiv${i}`).classList.remove('bg-blue');
    document.getElementById(`contactDiv${i}`).classList.remove('clr-white');
}


// show the whole information of a contact
function showContact(i) {
    document.getElementById(`contactDiv0`).classList.contains('bg-white');
    let contactInfo = document.getElementById('bigContactSection');
    let name = allContacts[i]['name'];
    let email = allContacts[i]['email'];
    let phone = allContacts[i]['phone'];
    contactInfo.innerHTML = '';
    contactInfo.innerHTML += showBigConactDiv(getFirstLetters(name), name, email, phone, i);
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
        contact.innerHTML += showContactDiv(name, email, getFirstLetters(name), i);
    }
    let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);
}


// Add names, emailAdress, phoneNumber into InputFields and create JSON
function addContact() {
    const name = document.getElementById('input1').value;
    const email = document.getElementById('input2').value;
    const phone = document.getElementById('input3').value;
    let contacts = {
        'name': name,
        'email': email,
        'phone': phone
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