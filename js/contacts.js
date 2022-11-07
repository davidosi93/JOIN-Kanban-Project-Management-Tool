function changeBckgrClr() {
    const div = document.getElementById('contactDiv');
    if (div.classList.contains('bg-white') == true) {
        document.getElementById('contactDiv').classList.remove('hover');
        document.getElementById('contactDiv').classList.remove('bg-white');
        document.getElementById('contactDiv').classList.add('bg-blue');
        document.getElementById('contactDiv').classList.add('clr-white');
    } else {
        document.getElementById('contactDiv').classList.add('hover');
        document.getElementById('contactDiv').classList.add('bg-white');
        document.getElementById('contactDiv').classList.remove('bg-blue');
        document.getElementById('contactDiv').classList.remove('clr-white');
    }
}

function showContact() {
    document.getElementById('contactBox').classList.remove('d-none');
    document.getElementById('contactBox').classList.add('animation');
}