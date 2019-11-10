var inquirer = require("inquirer");
var userHealth = 70;
var zombieHealth = 15;
game();
function game() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose your attack",
                choices: [1, 2, 3, 4, 5],
                name: "userAttack"
            }
        ]).then(function (attack) {
            var zombieDefense = Math.floor(Math.random() * 5) + 1;
            if (attack.userAttack === zombieDefense) {
                zombieHealth -= Math.floor(Math.random() * 5) + 1;
            }
            else {
                userHealth -= Math.floor(Math.random() * 5) + 1;
            }
            console.log("Player Health: " + userHealth);
            console.log("Zombie Health: " + zombieHealth);
            if (userHealth && zombieHealth > 0) {
                game();
            }
            else if (zombieHealth <= 0) {
                console.log("Congratz!");
                process.exit();
            }
            else if (userHealth <= 0) {
                console.log("You Ded!");
                process.exit();
            }
        })
}