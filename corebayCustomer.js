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
  password: "",
  database: "corebay"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start () {
    console.log("Hi! Welcome to CoreBay");
    console.log("Here is our Product List");
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    console.log("______________________");
    inviteToBuy();

}

function inviteToBuy () {
    inquirer
    .prompt({
        name: "buy",
        type: "list",
        message: "Would you like to buy a pattern today?",
        choices: ["YES", "NO",]
          })
            .then(function(answer) {
            if (answer.buy === "YES") {
                buy();
                } else {
                console.log("Bye Bye");
                connection.end();
                }
            });
      
      
}

function buy() {
    // query the database for all items available
    connection.query("SELECT product_name FROM products", function(err, results) {
        console.log("These are the patterns we have available" + results);
      if (err) throw err;
    });
}
