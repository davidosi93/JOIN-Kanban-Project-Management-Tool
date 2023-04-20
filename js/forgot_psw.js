let resetUserId;


//send a mail to reset the password
async function sendResetEmail() {
    let forgotEmail = document.getElementById('input1');
    let user = users.find((u) => u.email == forgotEmail.value);
    if (user) {
        let resetUserId = user.id;
        await backend.setItem('resetUserId', resetUserId);
        showAnim();
        delay();
    } else {
        document.getElementById('wrongInput').classList.remove('d-none');
    }
}


//show the animation 
function showAnim() {
    document.getElementById('email-confirm').classList.remove('d-none');
}


function delay() {
    setTimeout(function() { window.location.href = 'reset_psw.html' }, 700);
}


async function forgotPasswordinit() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    activeUser = backend.getItem('activeUser') || 0;
}