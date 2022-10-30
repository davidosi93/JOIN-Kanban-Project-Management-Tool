function help(){
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('help').classList.remove('d-none');
}

function goBacktoMainContainer(){
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('help').classList.add('d-none');
}