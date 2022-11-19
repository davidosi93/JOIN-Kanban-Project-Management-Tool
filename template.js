async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function showContactDiv(name, email, str, i, color) {
    return `<div id="contactDiv${i}" onclick="showContact(${i});"
                class="contactDiv hover">
                    <div id="contactLetter${i}" style="background-color: ${color}" class="contactLetter">
                        ${str}
                    </div>
                <div class="contactName">
                    <p class="name">${name}</p>
                    <p class="email">${email}</p>
                </div>
            </div>`;
}

function showBigConactDiv(str, name, email, phone, i, color) {
    return `<div id="contactBox${i}" class="contactBox d-none">
                <div class="contact">
                    <p style="background-color: ${color}" class="contactP">${str}</p>
                    <div class="contactNameRight">
                        <p class="contactNameRightP">${name}</p>
                        <div class="addTaskBox">
                            <img src="asseds/img/plus.png">
                            <p class="addTask">Add Task</p>
                        </div>
                    </div>
                 </div>

                <div class="contactInfo">
                    <p class="contactInfoP">Contact Information</p>
                    <div class="contactInfoEdit">
                        <img src="asseds/img/pencil.png">
                        <p class="contactInfoEditP">Edit Contact</p>
                    </div>
                </div>

                <div class="phoneMailBox">
                    <div class="mail">
                        <p class="mailP">Email</p>
                        <p class="mailAdress">${email}</p>
                    </div>
                     <div class="mail">
                        <p class="mailP">Phone</p>
                        <p class="phoneNumber">${phone}</p>
                    </div>
                </div>
            </div>`;
}