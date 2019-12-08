const userPaymentTypesControllerFactory = db => {
  const getCustomerPaymentTypes = (req, res, next) => {
    const customerId = +req.query.customerId;
    const paymentTypes = db
      .get("userPaymentTypes")
      .filter({ customerId, active: true })
      .value();

    return res.json(paymentTypes);
  };

  const addCustomerPaymentType = (req, res, next) => {
    const paymentType = Object.assign(req.body, {
      id: Date.now(),
      active: true
    });

    db.get("userPaymentTypes")
      .push(paymentType)
      .write();

    return res.json(paymentType);
  };

  const updatePaymentType = (req, res, next) => {
    const id = +req.params.id;
    const updated = Object.assign(req.body, { id });

    db.get("userPaymentTypes")
      .find({ id })
      .assign(updated)
      .write();

    return res.json(updated);
  };

  const deleteUserPaymentType = (req, res, next) => {
    const id = +req.params.id;

    db.get("userPaymentTypes")
      .find({ id })
      .assign({ active: false })
      .write();

    return res.status(204).send();
  };

  return {
    getCustomerPaymentTypes,
    addCustomerPaymentType,
    updatePaymentType,
    deleteUserPaymentType
  };
};

module.exports = userPaymentTypesControllerFactory;
