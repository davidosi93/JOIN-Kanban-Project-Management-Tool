let liCategory;
let liContact;

function showCategories() {
    let ulCategory = document.getElementById("ul-category");
    if (ulCategory.classList.contains('d-none')) {
        showSelectionCategories(ulCategory);
    } else {
        hideSelectionCategories(ulCategory);
    }
}

function showSelectionCategories(ulCategory) {
    ulCategory.classList.remove('d-none');
    document.getElementById("select-div-category").classList.add('no-border-bottom');
}

function hideSelectionCategories(ulCategory) {
    ulCategory.classList.add('d-none');
    document.getElementById("select-div-category").classList.remove('no-border-bottom');
}


// ----------------

function selectCategory(id) {
    liCategory = id.replace('div-', '');
    let ulCategory = document.getElementById("ul-category");
    let category = document.getElementById(id).innerHTML;

    document.getElementById('selected-category').style = 'display: flex; align-items: center; list-style-type: none;';
    document.getElementById("selected-category").innerHTML = category;
    document.getElementById("hidden-category-input").value = '.';
    document.getElementById(liCategory).style = 'margin:0; margin-right: 20px';

    ulCategory.classList.add('d-none');
    document.getElementById("select-div-category").classList.remove('no-border-bottom');

}

// function showSelectedCategory(category, liCategory) {

// }


/**------------Contacts */

function showContacts() {
    let ulContact = document.getElementById("ul-contact");
    if (ulContact.classList.contains('d-none')) {
        showSelectionContacts(ulContact);
        document.getElementById('all-contacts-initials').classList.add('d-none');

    } else {
        hideSelectionContacts(ulContact);
        document.getElementById('all-contacts-initials').classList.remove('d-none');
        if (noSelectedContacts()) {
            document.getElementById('all-contacts-initials').classList.add('d-none');
        }
    }
}

function showSelectionContacts(ulContact) {
    ulContact.classList.remove('d-none');
    document.getElementById("select-div-contact").classList.add('no-border-bottom');
}

function hideSelectionContacts(ulContact) {
    ulContact.classList.add('d-none');
    document.getElementById("select-div-contact").classList.remove('no-border-bottom');
}

//---------------------

function selectContact(id) {
    liContact = id.replace('div-', '');
    let ulContact = document.getElementById("ul-contact");
    showSelectionContacts(ulContact);
}

function showSelectionContacts(ulContact) {
    ulContact.classList.remove('d-none');
    document.getElementById("select-div-contact").classList.add('no-border-bottom');
}

function hideSelectionContacts(ulContact) {
    ulContact.classList.add('d-none');
    document.getElementById("select-div-contact").classList.remove('no-border-bottom');
}