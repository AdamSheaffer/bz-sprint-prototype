# Bangazon API Prototype

Bangazon has provided a prototype of their API while the back-end team builds a production ready one. It is populated with development data. It can be found online [here](https://bangazon-prototype-api.herokuapp.com/api/customers), although you will likely find that it is easier to run this on your local development machines.

## To Run Locally

1. Clone this repository
1. Run `npm i`
1. Run `npm run dev` at the root of the project

   The prototype will be served on http://localhost:5000 and the URL endpoints listed below will be available to you

## Supported URL Endpoints

### Customers

| Description                               | Endpoint                            | Method | Request Body    | Response Body                     |
| ----------------------------------------- | ----------------------------------- | ------ | --------------- | --------------------------------- |
| Get all customers                         | api/customers                       | GET    |                 | Customer Array                    |
| Search for customer                       | api/customers?q={someSearchTerm}    | GET    |                 | Customer Array                    |
| Get customer by Id                        | api/customers/{id}                  | GET    |                 | Customer Object                   |
| Get customer and include product listings | api/customers/{id}?include=products | GET    |                 | Customer Object w/ Products Array |
| Add a customer                            | api/customers                       | POST   | Customer Object | Customer Object                   |
| Update a customer                         | api/customers/{id}                  | PUT    | Customer Object | Customer Object                   |
| Make customer inactive                    | api/customer/{id}                   | DELETE |                 |                                   |

### Products

| Description                      | Endpoint                            | Method | Request Body   | Response Body  |
| -------------------------------- | ----------------------------------- | ------ | -------------- | -------------- |
| Get all products                 | api/products                        | GET    |                | Product Array  |
| Search products by name          | api/products?q={searchTerm}         | GET    |                | Product Array  |
| Sort products by most recent     | api/products?sortBy=recent          | GET    |                | Product Array  |
| Sort products by popularity      | api/products?sortBy=popularity      | GET    |                | Product Array  |
| Sort products by least expensive | api/products?sortBy=price&asc=true  | GET    |                | Product Array  |
| Sort products by most expensive  | api/products?sortBy=price&asc=false | GET    |                | Product Array  |
| Add a new product                | api/products                        | POST   | Product Object | Product Object |
| Update a product                 | api/products/{id}                   | PUT    | Product Object | Product Object |
| Remove a product                 | api/products/{id}                   | DELETE |                |                |

### Payment Types

| Description           | Endpoint              | Method | Request Body       | Response Body      |
| --------------------- | --------------------- | ------ | ------------------ | ------------------ |
| Get all payment types | api/paymentTypes      | GET    |                    | PaymentType Array  |
| Add new payment type  | api/paymentTypes      | POST   | PaymentType Object | PaymentType Object |
| Remove a payment type | api/paymentTypes/{id} | DELETE |                    |                    |

### User Payment Options

| Description                       | Endpoint                                      | Method | Request Body           | Response Body          |
| --------------------------------- | --------------------------------------------- | ------ | ---------------------- | ---------------------- |
| Get a customer's payment options  | api/userPaymentTypes?customerId={customer id} | GET    |                        | UserPaymentType Array  |
| Add a payment option for customer | api/userPaymentTypes                          | POST   | UserPaymentType Object | UserPaymentType Object |
| Update customer payment option    | api/userPaymentTypes/{id}                     | PUT    | UserPaymentType Object | UserPaymentType Object |
| Remove customer payment option    | api/userPaymentTypes/{id}                     | DELETE |                        |                        |

### Orders \*

| Description                    | Endpoint                                 | Method | Request Body           | Response Body |
| ------------------------------ | ---------------------------------------- | ------ | ---------------------- | ------------- |
| Get orders made by customer    | api/orders?customerId={customer Id}      | GET    |                        | Order Array   |
| Get order by order ID          | api/orders/{id}                          | GET    |                        | Order Object  |
| Add a product to shopping cart | api/orders                               | POST   | CustomerProduct Object | Order Object  |
| Purchase order in cart\*\*     | api/orders/{id}                          | PUT    | Order Object\*\*       |               |
| Remove product from cart       | api/orders/{orderId}/products{productId} | DELETE |                        |               |

\* Order objects that have a payment method that isn't NULL are considered complete and processed. An order that does not have a payment type would be considered a user's shopping cart. A user can have only one shopping cart, and therefore will only have a maximum of one Order record in the database with a NULL payment type at a given time.

\*\* To purchase an order, update the Order object's `userPaymentId` property
