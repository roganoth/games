var inquirer = require("inquirer");
var zomHealth = 15;
var pcHealth = 70;
console.log("Zombie Health: " + zomHealth);
console.log("Your Health: " + pcHealth);

playGame();

function playGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose your attack.",
                choices: [1, 2, 3, 4, 5],
                name: "attack"
            }
        ]).then(function (combat) {
            var zomDefense = Math.floor(Math.random() * 5) + 1;
            var damage = Math.floor(Math.random() * 5) + 1;
            if (combat.attack === zomDefense) {
                zomHealth -= damage;
                console.log("============================");
                console.log("You've hit the zombie for " + damage + " damage!");
                console.log("============================");
                console.log("Current zombie health: " + zomHealth);
                console.log("Current PC health: " + pcHealth);
                console.log("============================");
                gameCheck();

            }
            else {
                pcHealth -= damage;
                console.log("============================");
                console.log("The zombie has hit you for " + damage + " damage!");
                console.log("============================");
                console.log("Current zombie health: " + zomHealth);
                console.log("Current PC health: " + pcHealth);
                console.log("============================");
                gameCheck();

            }
        })
}

function gameCheck() {
    if (zomHealth && pcHealth >= 0) {
        playGame();
    }
    if (zomHealth <= 0) {
        console.log("Zombie ded!");
        process.exit();
    }
    if (pcHealth <= 0) {
        console.log("You ded!");
        process.exit();
    }
}
