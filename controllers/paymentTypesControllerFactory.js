const paymentTypesControllerFactory = db => {
  const getAllPaymentTypes = (req, res, next) => {
    const paymentTypes = db
      .get("paymentTypes")
      .filter(pt => pt.active)
      .value();

    return res.json(paymentTypes);
  };

  const addPaymentType = (req, res, next) => {
    const paymentType = Object.assign(req.body, {
      id: Date.now(),
      active: true
    });

    db.get("paymentTypes")
      .push(paymentType)
      .write();

    return res.json(paymentType);
  };

  const removePaymentType = (req, res, next) => {
    const id = +req.params.id;

    db.get("paymentTypes")
      .find({ id })
      .assign({ active: false })
      .write();

    return res.status(204).send();
  };

  return {
    getAllPaymentTypes,
    addPaymentType,
    removePaymentType
  };
};

module.exports = paymentTypesControllerFactory;
