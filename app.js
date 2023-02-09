console.log("Dedicated to Madi");

const CONGRATULATIONS = [
    "Excellent work",
    "You're on fire",
    "Godlike",
    "Pop off",
    "Good stuff",
    "Nicely done",
    "Amazing stuff",
    "Really well done",
    "Congrats",
    "Outstanding",
    "Proud of you",
    "You rule",
    "Way to go",
    "Great work",
    "Super job",
];

const PLACEHOLDERS = [
    "rested",
    "read a book",
    "watched a film",
    "showered",
    "washed",
    "done the washing up",
    "gone for a walk",
    "exercised",
    "ate breakfast",
    "drunk some water",
    "done something I love",
    "done some work",
    "accomplished a goal",
    "spoken to friends",
    "spoken to my family",
];

// time taken for loading bar transitions
const widthTime = 1000;
const opacityTime = 1000;

/**
 * true when displaying congratulations
 */
let isSubmitted = false;
/**
 * true when displaying loading bar
 */
let isSubmitting = false;
/**
 * false when some achievements written
 */
let isClear = true;

// User name
const nameInput = document.getElementById("name");
nameInput.value = localStorage.getItem("name");
nameInput.addEventListener("change", () => {
    localStorage.setItem("name", nameInput.value);
})

// Date
var dateObj = new Date();
document.getElementById("date").innerText = dateObj.toISOString().slice(0, 10);;

// Achievement editor
let lines = 1;
const achievements = document.getElementById("achievements");
achievements.addEventListener("keydown", keydown);
addNewLine(achievements, lines);

// Button actions
document.getElementById("submit").addEventListener("click", submit);
document.getElementById("clear").addEventListener("click", clear);

/**
 * Add input line if `<Enter>` clicked
 * 
 * Called on `keydown` event in text editor
 * @param {KeyboardEvent} e 
 */
function keydown(e) {
    isClear = false;
    if (e.key == "Enter") {
        // Add new line if <Enter> pressed on current final line
        if (e.target.id === lines.toString()) {
            lines++;
            addNewLine(achievements, lines);
        }
        document.getElementById((parseInt(e.target.id) + 1).toString()).focus();
    }
}

/**
 * Display randomly timed loading bar then call `showMsg`
 * 
 * Called on `submit` button press
 */
function submit() {
    if (!isSubmitting && !isSubmitted && !isClear) {
        isSubmitting = true;
        isSubmitted = true;

        const bar = document.getElementById("loading");
        bar.style.display = "block";
        bar.style.opacity = 1;
        bar.scrollIntoView();

        // random loading animation
        bar.style.width = "60%";
        setTimeout(() => {
            bar.style.width = "85%";
            setTimeout(() => {
                bar.style.width = "100%";
                setTimeout(() => {
                    bar.style.opacity = 0;
                    setTimeout(() => {
                        bar.style.width = 0;
                        bar.style.display = "none";
                        showMsg()
                        isSubmitting = false;
                    }, opacityTime);
                }, widthTime);
            }, widthTime + Math.random() * 2000);
        }, widthTime + Math.random() * 2000);
    }
}

/**
 * Display random congratulatory message
 */
function showMsg() {
    const msgText = document.getElementById("msg");

    // pick random msg
    let msgContent = chooseRandom(CONGRATULATIONS);

    // Adjust msg if user entered a name
    if (nameInput.value) {
        msgContent += `, ${nameInput.value}!`;
    } else {
        msgContent += "!";
    }

    msgText.textContent = msgContent;
    msgText.style.opacity = 1;
}

/**
 * Remove congratulatory message and clear text editor
 * 
 * Deletes text editor lines one at a time from last to first
 * with a short delay between
 */
function clear() {
    if (!isSubmitting && !isClear) {
        isClear = true;
        isSubmitted = false;

        // Remove msg
        const msg = document.getElementById("msg");
        msg.textContent = "";
        msg.style.opacity = 0;

        // Prevent loading bar pop-in on next submit
        document.getElementById("loading").style.display = "block";

        let delay = 100;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            delay = 0;
        }

        // Remove a line of text editor every delay ms
        let clear = setInterval(() => {
            achievements.querySelector(`div:nth-of-type(${lines})`).remove();
            lines--;

            if (lines < 1) {
                lines = 1;
                clearInterval(clear);
                addNewLine(achievements, 1);
                document.getElementById("1").focus();
            }
        }, delay);
    }
}

/**
 * Add new line to text editor with random placeholder
 * 
 * @param {HTMLElement} el HTML element to insert into
 * @param {int} line line number
 */
function addNewLine(el, line) {
    el.insertAdjacentHTML(
        "beforeend",
        `<div class="input-container">
            <label for="${line}">${line}.</label>
            <input type="text" id="${line}" placeholder="${chooseRandom(PLACEHOLDERS)}">
        </div>`
    );
}

/**
 * Return random element from array
 * 
 * @param {Array} list 
 * @returns 
 */
function chooseRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
