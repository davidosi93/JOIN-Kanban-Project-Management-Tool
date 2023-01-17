async function login() {
    let email = document.getElementById('input1');
    let password = document.getElementById('input2');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        let activeUser = user.id;
        await backend.setItem('activeUser', activeUser);
        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';
        window.location.href = 'contacts.html';
    } else {
        document.getElementById('wrongInput').classList.remove('d-none');
    }
}


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    activeUser = backend.getItem('activeUser') || 0;
}


function changeImg() {
    let passwordField = document.getElementById('input2');
    if (passwordField.value.length > 0) {
        document.getElementById('password').classList.add('d-none');
        document.getElementById('password-nonvisible').classList.remove('d-none');
    } else {
        document.getElementById('password').classList.remove('d-none');
        document.getElementById('password-nonvisible').classList.add('d-none');
    }
}


function setInputToText() {
    let passwordField = document.getElementById('input2');
    let showPassword = document.getElementById('password-nonvisible');
    let hidePassword = document.getElementById('password-visible');
    showPassword.addEventListener('click', () => {
        passwordField.type = 'text';
        showPassword.classList.add('d-none');
        hidePassword.classList.remove('d-none');
    });
    hidePassword.addEventListener('click', () => {
        passwordField.type = 'password';
        showPassword.classList.remove('d-none');
        hidePassword.classList.add('d-none');
    });
}