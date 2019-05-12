
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

//after connection, start the application
connection.connect(function (err) {
  if (err) throw err;
  start();
});

var shoppingCart = []

//starts the application
function start() {
  console.log("\n------------------------\n");
  console.log("Hi! Welcome to CoreBay");
  console.log("\n------------------------\n");
  inviteToBuy();
}

//Brings up list of Products
function getProducts() {
  connection.query("SELECT * FROM products", function (error, results) {
    if (error) throw error;
    console.table(results);
    buy(results);
  })
}

function DisplayCart(){
  console.log("Your cart contains!")
  shoppingCart.forEach(function(item){
    console.log(`Item: ${item.product.product_name}, amount: ${item.purchaseAmount}`)
  })
}

function inviteToBuy() {
  //console.log(shoppingCart);
  shoppingCart.length > 0 ? DisplayCart() : null;

  inquirer
    .prompt({
      name: "buy",
      type: "list",
      message: "Would you like to buy a pattern?",
      choices: ["YES", "NO", "Checkout"]
    }).then(function (answer) {
      if (answer.buy === "YES") {
        getProducts();
      } 
      else if(answer.buy === "Checkout") {
        checkout(shoppingCart);
      }
      else {
        console.log("Thanks");
        connection.end();
      }
    });
}

function checkout(cart){
  for(var i = 0; i < cart.length; i++){
    updateInventory(cart[i].product, cart[i].purchaseAmount);
  }
}

function updateInventory(item, amount){
  var sqlQuery = `UPDATE products
                  SET quanity = quanity - ?
                  WHERE product_name = ?`;

  connection.query(sqlQuery, [ parseInt(amount), item.product_name ], function(err, res){
    if(err) throw err;

    console.log("Thank you for shopping!")
    connection.end();
  })
}

function buy(data) {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < data.length; i++) {
            choiceArray.push(data[i].product_name);
          }
          return choiceArray;
        },
        message: "What would you like to buy?"
      }
    ]).then(function (answer) {
      var chosenItem = ReturnItem(data, answer.choice);
      promptQuantity(chosenItem);
    }
    )
};

function promptQuantity(item){
  //console.log(item)
  inquirer.prompt({
    name: "quantity",
    type: "input",
    message: "How many do you want?",
    validate: function(val){
      return !isNaN(val) && val < item.quanity
    }
  }).then(function(answer){
    var cartItem = {
      product: item,
      purchaseAmount: answer.quantity
    }
    shoppingCart.push(cartItem);
    inviteToBuy();
  })
}

function ReturnItem(database, choiceName) {
  for (let i = 0; i < database.length; i++) {
    if (database[i].product_name === choiceName) {
      return database[i];
    }
  }
  return null
}

