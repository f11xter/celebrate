console.log("Dedicated to Madi");

// Read stored name
var nameInput = document.getElementById("name");
nameInput.value = localStorage.getItem("name");

// Display date
var dateObj = new Date();
document.getElementById("date").textContent = dateObj.toISOString().slice(0, 10);

// Store name locally every second
setInterval(() => {
    localStorage.setItem("name", nameInput.value);
}, 1000);

// Achievement editor
var lines = 1;
var achievements = document.getElementById("achievements");
achievements.addEventListener("keydown", keydown);

// Submit button
var isSubmitted = false;
var button = document.querySelector("button");
button.addEventListener("click", submit);

function keydown(e) {
    if (e.key == "Enter") {
        lines++;
        achievements.insertAdjacentHTML(
            "beforeend", 
            `<div class="flex-container" id="div${lines}">
                <label for="${lines}">${lines}.</label>
                <input type="text" name="${lines}" id="${lines}" placeholder=" ">
            </div>`
        );
        document.getElementById(lines).focus();
    }
}

function submit() {
    if (!isSubmitted) {
        isSubmitted = true;

        // Create spinner and msg
        const MSGS = ["Excellent work", "You're on fire", "Godlike", "Pop off", "Good stuff"];
        document.querySelector("body").insertAdjacentHTML(
            "beforeend", 
            `<div id="spinner"></div>
            <p id="msg">${MSGS[Math.floor(Math.random() * MSGS.length)]}</p>`
        );
        let msg = document.getElementById("msg");
        msg.hidden = true;

        // Adjust msg if user entered a name
        let name = nameInput.value;
        if (name) {
            msg.textContent += `, ${name}!`;
        } else {
            msg.textContent += "!";
        }

        // Remove spinner and show msg after 4 seconds
        setTimeout(() => {
            document.getElementById("spinner").hidden = true;
            msg.hidden = false;
        }, 4000);
    }
}
