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

// Celebrate msg
var msg = document.getElementById("msg");

// Submit button
var isSubmitted = false;
document.getElementById("submit").addEventListener("click", submit);

// Clear button
var isCleared = false;
document.getElementById("clear").addEventListener("click", clear);

function keydown(e) {
    isCleared = false;
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
        isCleared = false;

        // Create spinner and msg
        const MSGS = ["Excellent work", "You're on fire", "Godlike", "Pop off", "Good stuff"];
        document.querySelector("body").insertAdjacentHTML(
            "beforeend",
            `<div id="spinner"></div>`
        );

        // Remove spinner and show msg after 4 seconds
        setTimeout(() => {
            let spinner = document.getElementById("spinner");
            if (spinner) {
                spinner.remove();
            }

            if (!isCleared) {
                // Adjust msg if user entered a name
                let name = nameInput.value;
                let msgContent = MSGS[Math.floor(Math.random() * MSGS.length)];
                if (name) {
                    msgContent += `, ${name}!`;
                } else {
                    msgContent += "!";
                }

                msg.textContent = msgContent;
            }
        }, 4000);
    }
}

function clear() {
    isCleared = true;
    isSubmitted = false;

    // Remove msg
    msg.textContent = "";

    // Remove spinner
    let spinner = document.getElementById("spinner");
    if (spinner) {
        spinner.remove();
    }

    // Remove a line every 100ms
    let clear = setInterval(() => {
        document.getElementById(`div${lines}`).remove();
        lines--;

        if (lines < 1) {
            lines = 1;
            clearInterval(clear);
            achievements.insertAdjacentHTML(
                "beforeend",
                `<div class="flex-container" id="div1">
                    <label for="1">1.</label>
                    <input type="text" name="1" id="1" placeholder="First achievement...">
                </div>`
            );
        }
    }, 100);
}
