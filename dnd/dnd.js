var pcClass;
var pcAC;
var pcHealth;
var enemyType;
var enemyHealth;
var enemyAC;
var enemyAttack;
var enemyDamage;
var damage;
var pcTurn;


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
    var enemies = ["Allosaurus", "Brown Bear", "Duergar"]
    var randomEnemy = Math.floor(Math.random() * enemies.length);
    enemyType = enemies[randomEnemy];
}
enemyChoice();

function combatStart() {
    if (enemyType === "Allosaurus") {
        enemyAC = 13;
        enemyHealth = 51;
    }
    else if (enemyType === "Brown Bear") {
        enemyAC = 11;
        enemyHealth = 34;
    }
    else if (enemyType === "Duergar") {
        enemyAC = 16;
        enemyHealth = 26;
    }
    console.log("\n===============================");
    console.log("You VS. " + enemyType + "!!");
    console.log("===============================");
    console.log("\nYou have " + pcHealth + " HP");
    console.log("\nYour enemy is undamaged!");
    console.log("\n===============================");
    pcTurn = true;
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
    if (enemyHealth < 15 && enemyHealth > 0) {
        console.log("===============================");
        console.log("\nYou have " + pcHealth + " HP");
        console.log("\nYour enemy is bloodied!");
        console.log("\n===============================");
        turnChecker();
    }
    else if (enemyHealth > 15) {
        console.log("===============================");
        console.log("\nYou have " + pcHealth + " HP");
        console.log("\nYour enemy is healthy!");
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
                var pcD20 = Math.floor(Math.random() * 20) + 1;
                pcAttack = pcD20 + 5;
                if (pcD20 === 20) {
                    var damageDice = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
                    pcDamage = damageDice * 2 + 3;
                    console.log("=========================");
                    console.log("You crit for " + pcDamage + " damage!!");
                    console.log("=========================");
                    enemyHealth -= pcDamage;
                    pcTurn = false;
                    healthCheck();
                }
                else {
                    console.log("==========================");
                    console.log("You rolled a " + pcAttack + " to hit!");
                    console.log("==========================");
                    pcturn = false;
                    hitChecker(pcAttack, enemyAC);
                    if (damage === true) {
                        pcDamage = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + 3;
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
            }
            if (fight.Actions === "Power Attack") {
                var pcD20 = Math.floor(Math.random() * 20) + 1;
                pcAttack = pcD20;
                if (pcD20 === 20) {
                    var damageDice = Math.floor(Math.random() * 6) + 1 * 2;
                    pcDamage = damageDice * 2 + 3;
                    console.log("=========================");
                    console.log("You crit for " + pcDamage + " damage!!");
                    console.log("=========================");
                    enemyHealth -= pcDamage;
                    pcTurn = false;
                    healthCheck();
                }
                console.log("==========================");
                console.log("You rolled a " + pcAttack + " to hit!");
                console.log("==========================");
                pcturn = false;
                hitChecker(pcAttack, enemyAC);
                if (damage === true) {
                    pcDamage = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + 13;
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
            if (fight.Actions === "Flee") {
                console.log("==========================");
                console.log("You've successfully fled. Better to live and fight another day.");
                console.log("==========================");
                process.exit();
            }
        })
}
function enemyTurn() {
    if (enemyType === "Allosaurus") {
        enemyD20 = Math.floor(Math.random() * 20) + 1
        enemyAttack = enemyD20 + 6;
        if (enemyD20 === 20) {
            var enemyDice = Math.floor(Math.random() * 10) + 1;
            enemyDamage = enemyDice * 2 + 4;
            console.log("=========================");
            console.log("You've been crit for " + enemyDamage + " damage!!");
            console.log("=========================");
            pcTurn = true;
            healthCheck();
        }
        else {
            console.log("==========================");
            console.log("A " + enemyAttack + " was rolled to hit.");
            console.log("==========================");
            hitChecker();
            if (damage === true) {
                enemyDamage = Math.floor(Math.random() * 10) + 1 + Math.floor(Math.random() * 10) + 1 + 4;
                console.log("==========================");
                console.log("You been hit for " + enemyDamage + " damage!");
                console.log("==========================");
                pcHealth -= enemyDamage;
                pcTurn = true;
                healthCheck();
            }
        }
        if (enemyType === "Brown Bear") {
            enemyD20 = Math.floor(Math.random() * 20) + 1
            enemyAttack = enemyD20 + 6;
            if (enemyD20 === 20) {
                var enemyDice = Math.floor(Math.random() * 8) + 1;
                enemyDamage = enemyDice * 2 + 4;
                console.log("=========================");
                console.log("You've been crit for " + enemyDamage + " damage!!");
                console.log("=========================");
                pcHealth -= enemyDamage;
                pcTurn = true;
                healthCheck();
            }
            else {
                console.log("==========================");
                console.log("A " + enemyAttack + " was rolled to hit.");
                console.log("==========================");
                hitChecker();
                if (damage === true) {
                    enemyDamage = Math.floor(Math.random() * 8) + 1 + 4;
                    console.log("==========================");
                    console.log("You been hit for " + enemyDamage + " damage!");
                    console.log("==========================");
                    pcHealth -= enemyDamage;
                    pcTurn = true;
                    healthCheck();
                }
                enemyAttack = Math.floor(Math.random() * 20) + 1 + 6;
                console.log("==========================");
                console.log("A " + enemyAttack + " was rolled to hit.");
                console.log("==========================");
                hitChecker();
                if (damage === true) {
                    enemyDamage = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + 4;
                    console.log("==========================");
                    console.log("You been hit for " + enemyDamage + " damage!");
                    console.log("==========================");
                    pcHealth -= enemyDamage;
                    pcTurn = true;
                    healthCheck();
                }
            }
        }
        else if (enemyType === "Duergar") {
            enemyD20 = Math.floor(Math.random() * 20) + 1
            enemyAttack = enemyD20 + 4;
            if (enemyD20 === 20) {
                var enemyDice = Math.floor(Math.random() * 8) + 1;
                enemyDamage = enemyDice * 2 + 2;
                console.log("=========================");
                console.log("You've been crit for " + enemyDamage + " damage!!");
                console.log("=========================");
                pcHealth -= enemyDamage;
                pcTurn = true;
                healthCheck();
            }
            else {
                console.log("==========================");
                console.log("A " + enemyAttack + " was rolled to hit.");
                console.log("==========================");
                hitChecker();
                if (damage === true) {
                    enemyDamage = Math.floor(Math.random() * 8) + 1 + 2;
                    console.log("==========================");
                    console.log("You been hit for " + enemyDamage + " damage!");
                    console.log("==========================");
                    pcHealth -= enemyDamage;
                    pcTurn = true;
                    healthCheck();
                }
            }
        }
    }
}