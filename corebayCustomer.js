var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  //To Do Figure Out How to Hide the Password
  password: "Moonie!4411",
  database: "corebay"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start () {
    console.log("\n\n------------------------\n\n");
    console.log("Hi! Welcome to CoreBay");
    console.log("\n\n------------------------\n\n");
    console.log("Here is a List of Our Products");
    connection.query("SELECT product_name FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
        inviteToBuy();
    })
    

}

function inviteToBuy () {
  inquirer
  .prompt({
    name: "buy",
    type: "list",
    message: "Would you like to buy a pattern today?",
    choices: ["YES", "NO",]
  }).then(function(answer) {
    if (answer.buy === "YES") {
        buy();
    } else {
        console.log("Bye");
        connection.end();
    }
  });
}

function anythingElse () {
  inquirer
  .prompt ({
    name: "buy",
    type: "list",
    message: "Would you like to buy anything else?",
    choices: ["YES", "NO",]
  }).then(function(answer) {
    if (answer.buy === "YES") {
        buy();
    } checkout();
  
  });
}

function buy() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What would you like to buy?"
        }
      ]).then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        //for loop ties the choice item to the item in the database
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
            console.log("You've choosen to buy " + chosenItem.product_name);
            console.log("The price is " + chosenItem.price);
            anythingElse();
          }  
        }
      });
      

  });
}
function checkout() {
 console.log("Thank You for Your Purchase");
 
}

   
