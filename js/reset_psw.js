async function resetPasswordInit() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    activeUser = backend.getItem('activeUser') || 0;
    resetUserId = backend.getItem('resetUserId') || 0;
}

function changePassword() {
    let newPassword = document.getElementById('input1ForgotPsw').value;
    let confirmNewPassword = document.getElementById('input2ForgotPsw').value;
    if (newPassword == confirmNewPassword) {
        changePasswordInArray(newPassword);
        showAnim();
        resetPasswordDelay();
    } else (
        document.getElementById('wrongInput').classList.remove('d-none')
    )
}


async function changePasswordInArray(newPassword) {
    users[resetUserId]['password'] = newPassword;
    await backend.deleteItem('resetUserId', resetUserId);
    await backend.setItem('users', JSON.stringify(users));
}


function resetPasswordDelay() {
    setTimeout( function() { window.location.href = 'index.html' }, 700 );
}