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


function showHeader(color, str) {
    return `<div class="headerContent">
                <p>Kanban Project Management Tool</p>

                 <div class="headerContentRight">
                    <div class="buttonsTopRight">
                        <img onclick="help()" class="information" src="/asseds/img/information.png">
                        <div id="userButton" onclick="showLogOutButton()" class="personLogIn" style="background-color: ${color}; cursor: pointer">${str}</div>
                    </div>
                    <div id="logOutButton" class="logOutButton d-none" onclick="logOut()">Log Out</div>
                </div>
            </div>`;
}


function contactLetterHeadline(firstChar) {
    return `<div id="contactLetter-${firstChar}" class="letter">
                <p>${firstChar}</p>
                <div class="letterUnderline"></div>
            </div>`;
}


// Templates contact.js von David
function showContactDiv(name, email, str, color, i) {
    return `<div id="contactDiv${i}" onclick="showContact(${i});" class="contactDiv hover">
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
                            <img src="asseds/img/blueplus.png">
                            <p class="addTask">Add Task</p>
                        </div>
                    </div>
                 </div>

                <div class="contactInfo">
                    <p class="contactInfoP">Contact Information</p>
                    <div onclick="showEditContactBox(${i})" class="contactInfoEdit">
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


function editContactBox(i, color, str) {
    return `    <div id="editContactBox${i}" class="newContactBox">
                    <img onclick="closeEditBox()" class="closeImg" src="asseds/img/cross.png">
                    <div class="leftContent">
                            <img src="asseds/img/littleLogo.png">
                            <h1>Edit Contact</h1>
                        <div class="newContactBoxLine"></div>
                    </div>

                    <div class="contactRightContent">
                        <div class="contactRightContentImg">
                            <p style="background-color: ${color}" class="contactP">${str}</p>
                        </div>
                        <form class="inputFieldSection">
                            <div class="inputField">
                                <input id="input1Filled" type="name" required placeholder="Name">
                            </div>
                            <div class="inputField">
                                <input id="input2Filled" type="email" required placeholder="Email">
                            </div>
                            <div class="inputField">
                                <input id="input3Filled" type="phone" required placeholder="Phone">
                            </div>
                        </form>

                        <div class="SaveButtonDiv">
                            <div onclick="saveContactChanges(${i})" class="saveButton">
                                <p>Save</p>
                            </div>
                        </div>
                    </div>
                </div>`;
}