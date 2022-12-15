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
