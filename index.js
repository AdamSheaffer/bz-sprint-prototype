const port = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const empFactory = require("./controllers/employeeControllerFactory");
const deptFactory = require("./controllers/departmentsControllerFactory");
const compFactory = require("./controllers/computersControllerFactory");
const trainingFactory = require("./controllers/trainingProgramsControllerFactory");
const customerFactory = require("./controllers/customerControllerFactory");
const productFactory = require("./controllers/productControllerFactory");
const orderFactory = require("./controllers/orderControllerFactory");
const paymentTypeFactory = require("./controllers/paymentTypesControllerFactory");
const userPaymentFactory = require("./controllers/userPaymentTypesControllerFactory");
const productTypeFactory = require("./controllers/productTypeControllerFactory");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const adapter = new FileAsync("db.json");
low(adapter)
  .then(db => {
    // Employees
    const employeesController = empFactory(db);
    app.get("/api/employees", employeesController.getAllEmployees);
    app.get("/api/employees/:id", employeesController.getEmployee);
    app.post("/api/employees", employeesController.addEmployee);
    app.put("/api/employees/:id", employeesController.updateEmployee);

    // Departments
    const departmentController = deptFactory(db);
    app.get("/api/departments", departmentController.getAllDepartments);
    app.get("/api/departments/:id", departmentController.getDepartment);
    app.post("/api/departments", departmentController.addDepartment);
    app.put("/api/departments/:id", departmentController.updateDepartment);
    app.delete("/api/departments/:id", departmentController.deleteDepartment);

    // Computers
    const computerController = compFactory(db);
    app.get("/api/computers", computerController.getAllComputers);
    app.get("/api/computers/:id", computerController.getComputer);
    app.post("/api/computers", computerController.addComputer);
    app.put("/api/computers/:id", computerController.updateComputer);
    app.delete("/api/computers/:id", computerController.deleteComputer);

    // Training Programs
    const programsController = trainingFactory(db);
    app.get("/api/trainingPrograms", programsController.getAllTrainingPrograms);
    app.get("/api/trainingPrograms/:id", programsController.getTrainingProgram);
    app.post("/api/trainingPrograms", programsController.addTrainingProgram);
    app.post(
      "/api/trainingPrograms/:id/employees",
      programsController.addEmployeeToTraining
    );
    app.put(
      "/api/trainingPrograms/:id",
      programsController.updateTrainingProgram
    );
    app.delete(
      "/api/trainingPrograms/:trainingProgramId/employees/:employeeId",
      programsController.removeEmployeeFromProgram
    );
    app.delete(
      "/api/trainingPrograms/:id",
      programsController.removeTrainingProgram
    );

    // Customers
    const customerController = customerFactory(db);
    app.get("/api/customers", customerController.getAllCustomers);
    app.get("/api/customers/:id", customerController.getCustomer);
    app.post("/api/customers/", customerController.addCustomer);
    app.put("/api/customers/:id", customerController.updateCustomer);
    app.delete("/api/customers/:id", customerController.removeCustomer);

    // Products
    const productController = productFactory(db);
    app.get("/api/products", productController.getAllProducts);
    app.get("/api/products/:id", productController.getProduct);
    app.post("/api/products/", productController.addProduct);
    app.put("/api/products/:id", productController.updateProduct);
    app.delete("/api/products/:id", productController.removeProduct);

    // Orders
    const orderController = orderFactory(db);
    app.get("/api/orders", orderController.getAllOrders);
    app.get("/api/orders/:id", orderController.getOrder);
    app.post("/api/orders", orderController.addToOrder);
    app.put("/api/orders/:id", orderController.purchaseOrder);
    app.delete(
      "/api/orders/:orderId/products/:productId",
      orderController.removeProductFromOrder
    );

    // Payment Types
    const paymentTypeController = paymentTypeFactory(db);
    app.get("/api/paymentTypes", paymentTypeController.getAllPaymentTypes);
    app.get("/api/paymentType/:id", paymentTypeController.getPaymentType);
    app.post("/api/paymentTypes", paymentTypeController.addPaymentType);
    app.delete(
      "/api/paymentTypes/:id",
      paymentTypeController.removePaymentType
    );

    // User Payment Types
    const userPaymentController = userPaymentFactory(db);
    app.get(
      "/api/userPaymentTypes",
      userPaymentController.getCustomerPaymentTypes
    );
    app.post(
      "/api/userPaymentTypes",
      userPaymentController.addCustomerPaymentType
    );
    app.put(
      "/api/userPaymentTypes/:id",
      userPaymentController.updatePaymentType
    );
    app.delete(
      "/api/userPaymentTypes/:id",
      userPaymentController.deleteUserPaymentType
    );

    // Product Types
    const productTypeController = productTypeFactory(db);
    app.get("/api/productTypes", productTypeController.getAllProductTypes);
    app.get("/api/productTypes/:id", productTypeController.getProductType);
    app.post("/api/productTypes", productTypeController.addProductType);
    app.put("/api/productTypes/:id", productTypeController.updateProductType);
    app.get("/api/revenueReport", productTypeController.getRevenueBreakdown);
  })
  .then(() => {
    app.listen(port, () => {
      console.log("\x1b[35m%s\x1b[0m", "NOW RUNNING THE BANGAZON PROTOTYPE!");
      console.log("\n");
      console.log(`🐠 🐠 🐠 Listening on port ${port} 🐡 🐡 🐡`);
      console.log(`🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊`);
    });
  });
