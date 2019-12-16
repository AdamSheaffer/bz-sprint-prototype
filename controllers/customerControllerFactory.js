const customerControllerFactory = db => {
  const getAllCustomers = (req, res, next) => {
    const { q } = req.query;
    let customersRef = db.get("customers").filter();

    if (q) {
      customersRef = customersRef.filter(customer => {
        return `${customer.firstName} ${customer.lastName}`.includes(q);
      });
    }

    return res.json(customersRef.value());
  };

  const getCustomer = (req, res, next) => {
    const { include } = req.query;
    const id = +req.params.id;

    const customer = db
      .get("customers")
      .find({ id })
      .clone()
      .value();

    if (!customer) return res.status(404).send();

    customer.products = [];

    if (include === "products") {
      const products = db
        .get("products")
        .filter(p => p.customerId === customer.id)
        .value();

      customer.products = products;
    }

    return res.json(customer);
  };

  const addCustomer = (req, res, next) => {
    const customer = Object.assign(req.body, {
      id: Date.now(),
      createdDate: new Date().toISOString()
    });

    db.get("customers")
      .push(customer)
      .write();

    return res.json(customer);
  };

  const updateCustomer = (req, res, next) => {
    const id = +req.params.id;
    const updated = Object.assign(req.body, { id });

    db.get("customers")
      .find({ id })
      .assign(updated)
      .write();

    return res.json(updated);
  };

  const removeCustomer = (req, res, next) => {
    const id = +req.params.id;

    db.get("customers")
      .find({ id })
      .assign({ active: false })
      .write();

    return res.status(204).send();
  };

  return {
    getAllCustomers,
    getCustomer,
    addCustomer,
    updateCustomer,
    removeCustomer
  };
};

module.exports = customerControllerFactory;
