// var addingTrial = Math.floor(Math.random() * 20) + 1 + 5;
// console.log(addingTrial);
var pcClass;
var pcAC;
var pcHealth;
var enemyType;
var enemyHealth;
var enemyAC;
var enemyAttack;
var enemyDamage;
var damage;
var pcTurn = true;


var inquirer = require("inquirer");
function classChoice() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose your class",
                choices: ["Fighter", "Mage"],
                name: "class"
            }
        ]).then(function (character) {
            pcClass = character.class;
            console.log(pcClass);
            if (pcClass === "Fighter") {
                pcAC = 16;
                pcHealth = 40;
                console.log(pcAC);
                combatStart();
            }
            if (pcClass === "Mage") {
                pcAC = 15;
                pcHealth = 26;
                console.log(pcAC);
                combatStart();
            }
        })
}
classChoice();

function enemyChoice() {
    var enemies = ["Skeleton", "Orc", "Dragon Wyrmling"]
    var randomEnemy = Math.floor(Math.random() * enemies.length);
    enemyType = enemies[randomEnemy];
}
enemyChoice();

function combatStart() {
    if (enemyType === "Skeleton") {
        enemyAC = 13;
        enemyHealth = 13;
        enemyAttack = Math.floor(Math.random() * 20) + 1 + 4;
        enemyDamage = Math.floor(Math.random() * 6) + 1 + 2;
    }
    else if (enemyType === "Orc") {
        enemyAC = 13;
        enemyHealth = 15;
        enemyAttack = Math.floor(Math.random() * 20) + 1 + 5;
        enemyDamage = Math.floor(Math.random() * 12) + 1 + 3;
    }
    else if (enemyType === "Dragon Wyrmling") {
        enemyAC = 16;
        enemyHealth = 16;
        enemyAttack = Math.floor(Math.random() * 20) + 1 + 4;
        enemyDamage = Math.floor(Math.random() * 10) + 1 + 2;
    }
    console.log("\n===============================");
    console.log("You VS. " + enemyType + "!!");
    console.log("===============================");
    console.log("\nYou have " + pcHealth + " HP");
    console.log("\nYour enemy is undamaged!");
    console.log("\n===============================");
    turnChecker();
}

function turnChecker() {
    if (pcTurn === true) {
        if (pcClass === "Fighter") {
            combatRoundFighter();
        }
        else if (pcClass === "Mage") {
            combatRoundMage();
        }
    }
    else if (pcTurn === false) {
        enemyTurn();
    }
}

function healthCheck() {
    if (enemyHealth < (Math.floor(enemyHealth * .5)) && enemyHealth > 0) {
        console.log("===============================");
        console.log("\nYou have " + pcHealth + " HP");
        console.log("\nYour enemy is bloodied!");
        console.log("\n===============================");
        turnChecker();
    }
    else if (enemyHealth > (Math.floor(enemyHealth * .5))) {
        console.log("===============================");
        console.log("\nYou have " + pcHealth + " HP");
        console.log("\nYour enemy is undamaged!");
        console.log("\n===============================");
        turnChecker();
    }
    else if (enemyHealth <= 0 && pcHealth >= 0) {
        console.log("===============================");
        console.log("\nYou have " + pcHealth + " HP");
        console.log("\nYour enemy is dead! Well done!");
        console.log("\n===============================");
        process.exit();
    }
    else if (pcHealth <= 0 && enemyHealth >= 0) {
        console.log("===============================");
        console.log("\nYou have " + pcHealth + " HP");
        console.log("\nYour enemy has vanquished you! Better luck next time.");
        console.log("\n===============================");
        process.exit();
    }
}


function hitChecker(attacker, target) {
    if (attacker >= target) {
        damage = true;
    }
    else {
        damage = false;
    }
}

function combatRoundFighter() {
    var pcAttack;
    var pcDamage;

    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose your action.",
                choices: ["Attack", "Power Attack", "Flee"],
                name: "Actions"
            }
        ]).then(function (fight) {
            if (fight.Actions === "Attack") {
                pcAttack = Math.floor(Math.random() * 20) + 1 + 5;
                pcturn = false;
                hitChecker(pcAttack, enemyAC);
                if (damage === true) {
                    pcDamage = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + 3;
                    console.log("==========================");
                    console.log("You rolled a " + pcAttack + " to hit!");
                    console.log("==========================");
                    enemyHealth -= pcDamage;
                    console.log("You have dealt " + pcDamage + " damage!");
                    healthCheck();
                }
                else {
                    console.log("==========================");
                    console.log("You missed!");
                    console.log("==========================");
                    healthCheck();
                }
            }
            if (fight.Actions === "Power Attack") {
                pcAttack = Math.floor(Math.random() * 20) + 1;
                pcturn = false;
                console.log("==========================");
                console.log("You rolled a " + pcAttack + " to hit!");
                console.log("==========================");
                hitChecker(pcAttack, enemyAC);
                if (damage === true) {
                    pcDamage = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + 13;
                    enemyHealth -= pcDamage;
                    healthCheck();
                }
                else {
                    console.log("==========================");
                    console.log("You missed!");
                    console.log("==========================");
                    healthCheck();
                }
            }
            if (fight.Actions === "Flee") {
                console.log("==========================");
                console.log("You've successfully fled. Better to live and fight another day.");
                console.log("==========================");
                process.exit();
            }
        })
}
function enemyTurn() {
    if (enemyType === "Skeleton") {
        enemyAttack = Math.floor(Math.random() * 20) + 1 + 4;
        console.log("==========================");
        console.log("A " + enemyAttack + " was rolled to hit.");
        console.log("==========================");
        hitChecker();
        if (damage === true) {
            enemyDamage = Math.floor(Math.random() * 6) + 1 + 2;
            console.log("==========================");
            console.log("You been hit for " + enemyDamage + " damage!");
            console.log("==========================");
            pcHealth -= enemyDamage;
            healthCheck();
        }
    }
    else if (enemyType === "Orc") {
        enemyAttack = Math.floor(Math.random() * 20) + 1 + 5;
        console.log("==========================");
        console.log("A " + enemyAttack + " was rolled to hit.");
        console.log("==========================");
        hitChecker();
        if (damage === true) {
            enemyDamage = Math.floor(Math.random() * 12) + 1 + 3;
            console.log("==========================");
            console.log("You been hit for " + enemyDamage + " damage!");
            console.log("==========================");
            pcHealth -= enemyDamage;
            healthCheck();
        }
    }
    else if (enemyType === "Dragon Wyrmling") {
        enemyAttack = Math.floor(Math.random() * 20) + 1 + 4;
        console.log("==========================");
        console.log("A " + enemyAttack + " was rolled to hit.");
        console.log("==========================");
        hitChecker();
        if (damage === true) {
            enemyDamage = Math.floor(Math.random() * 10) + 1 + 2;
            console.log("==========================");
            console.log("You been hit for " + enemyDamage + " damage!");
            console.log("==========================");
            pcHealth -= enemyDamage;
            healthCheck();
        }
    }
}