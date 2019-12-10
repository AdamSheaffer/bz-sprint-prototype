const productTypeControllerFactory = db => {
  const getAllProductTypes = (req, res, next) => {
    const productTypes = db.get("productTypes").value();

    return res.json(productTypes);
  };

  const getProductType = (req, res, next) => {
    const id = +req.params.id;
    const productType = db
      .get("productTypes")
      .find({ id })
      .value();

    if (!productType) return res.status(404).send();

    const products = db
      .get("products")
      .filter({ productTypeId: id })
      .value();

    productType.products = products;

    return res.json(productType);
  };

  const addProductType = (req, res, next) => {
    const productType = Object.assign(req.body, { id: Date.now() });

    db.get("productTypes")
      .push(productType)
      .write();

    res.json(productType);
  };

  const updateProductType = (req, res, next) => {
    const id = +req.params.id;
    const updated = Object.assign(req.body, { id });

    db.get("productTypes")
      .find({ id })
      .assign(updated)
      .write();

    return res.json(updated);
  };

  return {
    getAllProductTypes,
    getProductType,
    addProductType,
    updateProductType
  };
};

module.exports = productTypeControllerFactory;
