let users = [];


async function addUser() {
    let name = document.getElementById('input3name').value;
    let email = document.getElementById('input1email').value;
    let password = document.getElementById('input2password').value;
    let user = {
        'name': name,
        'email': email,
        'password': password
    };
    users.push(user);
    await backend.setItem('users', JSON.stringify(users));
    console.log(users);
    window.location.href = 'index.html';
}


async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}