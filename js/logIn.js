function login() {
    let email = document.getElementById('input1');
    let password = document.getElementById('input2');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        window.location.href = 'summary.html';
        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';
    } else {
        document.getElementById('wrongInput').classList.remove('d-none');
    }
}

function changeImg() {
    let input = document.getElementById('input2');
    if (input.value.length > 0) {
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
        showPassword.style.display = 'none';
        hidePassword.style.display = 'inline';
    });
    hidePassword.addEventListener('click', () => {
        passwordField.type = 'password';
        showPassword.style.display = 'inline';
        hidePassword.style.display = 'none';
    });
}

