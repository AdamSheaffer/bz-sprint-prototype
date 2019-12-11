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

## Models

### Customer

```js
{
    "id": 1575559407787,
    "active": true,
    "firstName": "Nathanael",
    "lastName": "Laverenz",
    "address": "401 Nunya Business Dr",
    "city": "Herman",
    "state": "New York",
    "email": "n.lav@sbcglobal.net",
    "phone": "6151237584"
}
```

### Customer w/ Products

```js
{
    "id": 1575559407733,
    "active": true,
    "firstName": "Kimble",
    "lastName": "Peskett",
    "address": "508 Loop Cir",
    "city": "Nashville",
    "state": "Tennessee",
    "email": "peskykimble@hotmail.com",
    "phone": "5671234567",
    "products": [
        {
            "id": 15755594079866,
            "productTypeId": 1575501970047,
            "customerId": 1575559407733,
            "price": 76.91,
            "description": "morbi ut odio cras mi pede malesuada in imperdiet et commodo",
            "title": "Passat",
            "dateAdded": "2019-08-25T00:00:00.000Z"
        },
        {
            "productTypeId": 1575559407749,
            "customerId": 1575559407733,
            "price": 79.92,
            "description": "semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero",
            "title": "Santa Fe",
            "dateAdded": "2019-09-25T00:00:00.000Z",
            "id": 1575669305071
        }
    ]
}
```

### Product

```js
{
    "id": 15755594079867,
    "productTypeId": 1575501970045,
    "customerId": 1575559407755,
    "price": 62.54,
    "description": "pede ullamcorper augue a suscipit nulla elit ac nulla sed",
    "title": "Murciélago LP640",
    "dateAdded": "2018-12-25T00:00:00.000Z"
}
```

### PaymentType

```js
{
    "id": 1575501974871,
    "name": "Mastercard",
    "active": true
}
```

### UserPaymentType

```js
{
    "id": 1575501978463,
    "customerId": 1575559407787,
    "paymentTypeId": 1575501974871,
    "acctNumber": "2234 56789 0123",
    "active": true
}
```

### Order

```js
{
    "id": 1575559407665,
    "customerId": 1575559407787,
    "userPaymentId": null
}
```

### CustomerProduct

```js
{
    "customerId": 1575559407787,
    "productId": 1575501970208
}
```

### ProductType

```js
{
    "id": 1575501970045,
    "name": "Accessories"
}
```

### Employee

```js
{
    "id": 1575501974625,
    "firstName": "Madi",
    "lastName": "Peper",
    "departmentId": 1575559403193,
    "isSupervisor": true,
    "computerId": 1575566566334,
    "email": "everythingisawesome@bangzon.com"
}
```

### Department

```js
{
    "id": 1575559403194,
    "name": "Accounting",
    "budget": 1230000
}
```

### Computers

```js
{
    "id": 1575566566333,
    "purchaseDate": "2016-01-01T23:28:56.782Z",
    "decomissionDate": null,
    "make": "Apple",
    "model": "Macbook Pro"
}
```

### TrainingProgram

```js
{
    "id": 1575559403194,
    "name": "GIS Application",
    "startDate": "2018-09-25T00:00:00.000Z",
    "endDate": "2018-10-05T00:00:00.000Z",
    "maxAttendees": 45
}
```
