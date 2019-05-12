//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Moonie!4411",
  database: "corebay"
});


connection.connect(function(err) {
    if (err) throw err;
    managerMenu ();
});


function managerMenu () {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
            //use if/else statement to check if inventory is less than 5;
            //console.log the results
          "View Low Inventory",
            //use update on MySQL to add to inventory
          "Add to Inventory",
            //use insert and inquirer.prompt to add new product
          "Add New Product",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;
  
          case "View Low Inventory":
          //lowInventory();
          break;
         
          case "Add to Inventory":
          //addInventory();
          break;
  
          case "Add New Product":
          //addProduct();
          break;
            
          case "exit":
          connection.end();
          break;
        }
      });
  }

  function viewProducts () {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.table(results);
        managerMenu();
    
    })   
  }

  function lowInventory () {
    connection.query("SELECT quanity FROM products", function(error, results) {
        if (error) throw error;
        console.table(results);
        managerMenu();
    
    })   



  }