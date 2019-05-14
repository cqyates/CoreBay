# CoreBay
My application has a customer side node application for buying vintage patterns, which is what I do in real life, so I renamed my assignment CoreBay as a bit of an inside joke.

First my application welcomes the buyer.
![product-list](images/Screenshot%202019-05-12%2019.03.16.png)


The next thing my application does is to add the selected pattern to a shopping cart and ask them if they would like to buy again. 

If they answer yes, the buying function runs again.  If they answer no I use a ternary function to check the length of the shopping cart.  If the cart is empty the application disconnects from the server but if there is at least one item, the checkout function runs which updates the quantity in my database.
