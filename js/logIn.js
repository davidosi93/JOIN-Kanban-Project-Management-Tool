//login function
async function login() {
    let email = document.getElementById('input1');
    let password = document.getElementById('input2');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        let activeUser = user.id;
        await backend.setItem('activeUser', activeUser);
        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';
        window.location.href = 'summary.html';
    } else {
        document.getElementById('wrongInput').classList.remove('d-none');
    }
}


//show the html site at guest login
async function guestLogin() {
    window.location.href = 'summary.html';
}


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    activeUser = backend.getItem('activeUser') || 0;
}


//toggle password visibility icon
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


//a function to toggle password visibility
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