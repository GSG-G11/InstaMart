# InstaMart


[![Contributors][contributors-shield]][contributors-url] [![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url]




    
![](https://i.imgur.com/OwYwq1T.png)
  

## Links
- [Figma](https://www.figma.com/file/aHLtyJ81lfSfg8MKYOMDS4/Untitled?node-id=0%3A1)
- [Demo](https://insta--mart.herokuapp.com/)

## Problem
Because of the limited time during our affiliation with the code academy, we find it difficult to shop and buy products because the process takes a lot of time to go to the supermarket and there is a lot of crowding in it with the comming of Ramadan.

Also, the owner of the shop faces difficulties in selling and managing the products because there are people in the supermarket and people who call him for home delivery, which makes the management process difficult and stressful.

## Solution
A web app that combines a supermarket and its customers to solve the problem of ordering and managing products.

## Technologies
- [React.js](https://reactjs.org)
- [sequelize](https://sequelize.org/)
- [Express.js](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Material UI](https://mui.com/) 
- [Cloudinary](https://cloudinary.com/)
- [Web socket](https://socket.io/)
- [ Twillo](https://www.twilio.com/)

## User Journey 

* As a Seller When you visit the website , you will see a home page that includes product categories, new products, and customer reviews. You can log in to manage your market through your dashboard, where you can add, edit, or delete your products, as well as add the quantity of your products. You can also see a notification when you receive an order, where you can see all the orders in a table and accept or reject the order, you can see all the products for each order and you can delete any order yoy want.

* As a customer, you will be presented with a home page that includes product categories, new products, and customer reviews. You can sign up if you are a new customer, or sign in if you already have an account, and you can add any product to your cart even if you are not signed in. You can see all products and search for any product you want, or filter the product by categories or price.You can view what you've put to your cart and the total amount, then checkout to order your cart. You'll get a text message when your order is approved.

<p align="right"><a href="#top">back to top</a></p>

## User stories
as a Seller
- I can sgin In to the website
- I can see all the products in dashboard .
- I can add the product.
- I can search for any product in dashboard.
- I can see all the orders Regardless it's in or out .
- I can increment the quantity of any products.
- I can see a notification  when i recieve an order from the cutomers .
- I can accept or reject customer orders.
- I can also delete the orders.
- I can see  the product for each order separately .



as a customer
- I can see the catgories in home page
- I can see the latest products in home page .
- I can see the customer reviews in home page . 
- I can sign up if I'm an new cutomer.
- I can add to my cart even if i'm not sgin in.
- I can sign in if I'm already hav an acoount.
- I can see and search for products.
- I can filter the products by price or category.
- I can add products to the cart.
- I can order a products (enter my address and mobile number for delivery).
- I can recieve a message when  my order accepted.

## Getting Started
 Follow these simple steps to get a local copy up and running.
 
 1.Create a free [Cloudinary](https://cloudinary.com/) account.
 
 2.Clone the repo 
 ```
 https://github.com/GSG-G11/InstaMart.git
 ```
 3.Install NPM packages (in project root folder)
 ```
 npm install
 ```
 4. Install NPM packages (in client folder)
   ``` 
   cd client
   ```
then 
   ```
   npm install
   ```
5. in project root folder add `.env` file and and fill in the environment variables
```
PRIVATE_KEY='<your private key>'
DEV_DB_URL=postgres://<username>:<password>@localhost:<port || 5432>/<development database>
TEST_DB_URL=postgres://<username>:<password>@localhost:<port || 5432>/<test database>
CLOUDINARY_API_KEY= <Your cloudinary API key>
CLOUDINARY_API_SECRET=<Your cloudinary API secret>
CLOUDINARY_NAME=<Your cloudinary name>
```

## Database Schema
![](https://i.imgur.com/zxsfdZI.png)

## Our Team

* [Yosra Jaradh](https://github.com/yousrakhaleel)
* [Salma Issa](https://github.com/SalmaIssa96)
* [Ibrahim-Jarada](https://github.com/Ibrahim-Jarada)
* [Mahmoud J AlDabba](https://github.com/MahmoudJD95)

## Our Great Team Leader
 * [Abdallah Abu Amra](https://github.com/aaamra)

### Project Link : [InstaMart](https://github.com/GSG-G11/InstaMart)


[contributors-shield]: https://img.shields.io/github/contributors/GSG-G11/wasslni?style=for-the-badge
[contributors-url]: https://github.com/GSG-G11/InstaMart/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GSG-G11/InstaMart?style=for-the-badge
[forks-url]: https://github.com/GSG-G11/InstaMart/network/members
[stars-shield]: https://img.shields.io/github/stars/GSG-G11/InstaMart?style=for-the-badge
[stars-url]: https://github.com/GSG-G11/wasslni/stargazers
[issues-shield]: https://img.shields.io/github/issues/GSG-G11/InstaMart?style=for-the-badge
[issues-url]: https://github.com/GSG-G11/InstaMart/issues
