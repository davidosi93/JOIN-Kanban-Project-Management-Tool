function help(){
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('help').classList.remove('d-none');
}

function goBacktoMainContainer(){
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('help').classList.add('d-none');
}

function onHoverLeft(){
    document.getElementById('left-img').src = 'asseds/img/stift-weiss.png';
}

function offHoverLeft(){
    document.getElementById('left-img').src = 'asseds/img/Frame 59.png';
}

function onHoverRight(){
    document.getElementById('right-img').src = 'asseds/img/hacken-weiss.png';
    
}

function offHoverRight(){
    document.getElementById('right-img').src = 'asseds/img/Group 7 (1).png';
}