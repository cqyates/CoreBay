# CoreBay
My application has a customer side node application for buying vintage patterns, which is what I do in real life, so I renamed my assignment CoreBay as a bit of an inside joke.

First my application welcomes the buyer.
![product-list](images/Screenshot%202019-05-12%2019.03.16.png)

Then it brings up my list of products from the MySQL database and fills in a raw list of options that grows with the items in the database.
![product-list](images/Screenshot%202019-05-12%2019.04.43.png)

After you select the item, the application asks you how many you would like to buy of the pattern you choose and validates that it is a number. It is at this point we check to make sure we have enough of that item in stock
![product-list](images/Screenshot%202019-05-12%2019.06.37.png)

After we check the quanity and update the database, we display the shopping cart and ask the buyer if they would like anything else.  If they answer yes, we run buy function again. If they answer no I use a ternary function to check the length of the shopping cart.  If the cart is empty the application disconnects from the server but if there is at least one item, the checkout function runs which updates the quantity in my database.
