console.log("Dedicated to Madi");

// Read stored name
const stored_name = localStorage.getItem("name");
var name_input = document.querySelector("#name");
name_input.value = stored_name;

// Display date
const dateObj = new Date();
document.querySelector("#date").textContent = dateObj.toISOString().slice(0, 10);

// Store name locally every second
setInterval(() => {
    localStorage.setItem("name", name_input.value);
}, 1000);

// Achievement entry logic
var lines = 1
var achievements = document.getElementById("achievements");
achievements.addEventListener("keypress", key_pressed);

// Submit button logic
var isSubmitted = false;
var button = document.querySelector("button");
button.addEventListener("click", submit_clicked);

function key_pressed(e) {
    if (e.key == "Enter") {
        lines++;
        achievements.insertAdjacentHTML(
            "beforeend", 
            `<div class="flex-container" id="div${lines}">
                <label for="${lines}">${lines}.</label>
                <input type="text" name="${lines}" id="${lines}" placeholder=" ">
            </div>`
        );
        let inputs = document.querySelectorAll("#achievements input");
        inputs[inputs.length - 1].focus();
    }
}

function submit_clicked() {
    if (!isSubmitted) {
        isSubmitted = true;

        // Create spinner and msg
        const msgs = ["Excellent work", "You're on fire", "Godlike", "Pop off", "Good stuff"];
        document.querySelector("body").insertAdjacentHTML(
            "beforeend", 
            `<div id="spinner"></div>
            <p id="msg">${msgs[Math.floor(Math.random() * msgs.length)]}</p>`
        );
        let msg = document.getElementById("msg");
        msg.hidden = true;

        // Adjust msg if user entered a name
        let name = name_input.value;
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
