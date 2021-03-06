const productTypeControllerFactory = db => {
  const getAllProductTypes = (req, res, next) => {
    const productTypes = db.get("productTypes").value();

    return res.json(productTypes);
  };

  const getProductType = (req, res, next) => {
    const id = +req.params.id;
    const { include } = req.query;
    const productType = db
      .get("productTypes")
      .find({ id })
      .clone()
      .value();

    if (!productType) return res.status(404).send();

    if (include === "products") {
      const products = db
        .get("products")
        .filter({ productTypeId: id })
        .value();

      productType.products = products;
    }

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

  const getRevenueBreakdown = (req, res, next) => {
    const breakdown = db.get("productTypes").map(pt => {
      const products = db
        .get("products")
        .filter({ productTypeId: pt.id })
        .value();

      const totalRevenue = db
        .get("orderProducts")
        .map(op => {
          const product = products.find(p => p.id === op.productId);
          return !!product ? product.price : 0;
        })
        .reduce((p, c) => p + c, 0);

      return {
        productTypeId: pt.id,
        productType: pt.name,
        totalRevenue
      };
    });

    return res.json(breakdown);
  };

  return {
    getAllProductTypes,
    getProductType,
    addProductType,
    updateProductType,
    getRevenueBreakdown
  };
};

module.exports = productTypeControllerFactory;
