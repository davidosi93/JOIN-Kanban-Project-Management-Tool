async function addUser() {
    let name = document.getElementById('input3name').value;
    let email = document.getElementById('input1email').value;
    let password = document.getElementById('input2password').value;
    let color = getRandomColor();
    let initials = getFirstLetters(name);
    let user = {
        'id': users.length,
        'name': name,
        'email': email,
        'password': password,
        'color': color,
        'initials': initials,
        'contacts': [],
        'tasks': [],
        'categorys': []
    };
    users.push(user);
    await backend.setItem('users', JSON.stringify(users));
    emptySignUpInputFields();
    window.location.href = 'index.html';
}


function emptySignUpInputFields() {
    document.getElementById('input3name').value = '';
    document.getElementById('input1email').value = '';
    document.getElementById('input2password').value = '';
}


async function signUpInit() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}