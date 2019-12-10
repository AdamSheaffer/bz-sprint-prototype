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

| Description            | Endpoint              | Method | Request Body       | Response Body      |
| ---------------------- | --------------------- | ------ | ------------------ | ------------------ |
| Get all payment types  | api/paymentTypes      | GET    |                    | PaymentType Array  |
| Get payment type by id | api/paymentTypes/{id} | GET    |                    | PaymentType Object |
| Add new payment type   | api/paymentTypes      | POST   | PaymentType Object | PaymentType Object |
| Remove a payment type  | api/paymentTypes/{id} | DELETE |                    |                    |

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

### Product Types

| Description            | Endpoint              | Method | Request Body       | Response Body      |
| ---------------------- | --------------------- | ------ | ------------------ | ------------------ |
| Get all product types  | api/productTypes      | GET    |                    | ProductType Array  |
| Get product type by Id | api/productTypes/{id} | GET    |                    | ProductType Object |
| Add a product type     | api/productTypes      | POST   | ProductType Object | ProductType Object |
| Update a product type  | api/productTypes/{id} | PUT    | ProductType Object | ProductType Object |

### Employees

| Description                 | Endpoint                                    | Method | Request Body    | Response Body   |
| --------------------------- | ------------------------------------------- | ------ | --------------- | --------------- |
| Get all employees           | api/employees                               | GET    |                 | Employee Array  |
| Get employee by Id          | api/employees/{id}                          | GET    |                 | Employee Object |
| Search for employee by name | api/employees?firstName=John&lastName=Smith | GET    |                 | Employee Array  |
| Add an employee             | api/employees                               | POST   | Employee Object | Employee Object |
| Update an employee          | api/employees/{id}                          | PUT    | Employee Object | Employee Object |

### Departments

| Description                   | Endpoint                               | Method | Request Body      | Response Body                 |
| ----------------------------- | -------------------------------------- | ------ | ----------------- | ----------------------------- |
| Get all departments           | api/departments                        | GET    |                   | Department Array              |
| Get department by Id          | api/departments/{id}                   | GET    |                   | Department Object             |
| Get department with employees | api/departments/{id}?include=employees | GET    |                   | Department Array w/ Employees |
| Add a department              | api/departments                        | POST   | Department Object | Department Object             |
| Update a department           | api/departments/{id}                   | PUT    | Department Object | Department Object             |

### Computers

| Description               | Endpoint                      | Method | Request Body    | Response Body   |
| ------------------------- | ----------------------------- | ------ | --------------- | --------------- |
| Get available computers   | api/computers?available=true  | GET    |                 | Computer Array  |
| Get unavailable computers | api/computers?available=false | GET    |                 | Computer Array  |
| Get computer by Id        | api/computers/{id}            | GET    |                 | Computer Object |
| Add computer              | api/computers                 | POST   | Computer Object | Computer Object |
| Update computer record    | api/computers/{id}            | PUT    | Computer Object | Computer Object |
| Delete a computer record  | api/computers/{id}            | DELETE |                 |                 |

### Training Programs

| Description                      | Endpoint                                         | Method | Request Body           | Response Body                       |
| -------------------------------- | ------------------------------------------------ | ------ | ---------------------- | ----------------------------------- |
| Get upcoming training programs   | api/trainingPrograms                             | GET    |                        | TrainingProgram Array               |
| Get training program by Id       | api/trainingPrograms/{id}                        | GET    |                        | TrainingProgram Object w/ Employees |
| Add training program             | api/trainingPrograms                             | POST   | TrainingProgram Object | Training Program Object             |
| Add employee to training program | api/trainingPrograms/{id}/employees              | POST   | Employee Object        | TrainingProgram Object w/ Employees |
| Update training program          | api/trainingPrograms/{id}                        | PUT    | TrainingProgram Object | TrainingProgram Object              |
| Remove training program          | api/trainingPrograms/{id}                        | DELETE |                        |                                     |
| Remove employee from program     | api/trainingPrograms/{id}/employees/{employeeId} | DELETE |                        |                                     |
