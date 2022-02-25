#!/usr/bin/env node

import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const msgs = ['Excellent work!', 'You\'re on fire!', 'Godlike!', 'Pop off!', 'Good stuff!'];

const sleep500 = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const sleep2000 = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// show title
console.clear();
figlet('Celebrate!', { font: 'Nancyj' }, (err, data) => {
    console.log(gradient.fruit.multiline(data));
});
await sleep500();

// welcome text
const dateObj = new Date();
const date = dateObj.toISOString().slice(0, 10);
console.log(date);
console.log('Recall your achievements\nRecord them below\nTo finish, enter a blank line\n');

// achievement entry
let i = 1;
while (true) {
    const answers = await inquirer.prompt({
        name: 'text',
        type: 'input',
        message: i++,
    });

    if (answers.text == '') {
        break;
    }
}

const spinner = createSpinner('Calculating...').start();
await sleep2000();
spinner.success();

const success_msg = chalkAnimation.neon(msgs[Math.floor(Math.random() * msgs.length)]);
await sleep2000();
await sleep2000();
success_msg.stop();
