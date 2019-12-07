const productControllerFactory = db => {
  const getAllProducts = (req, res, next) => {
    const { q, sortBy, asc } = req.query;
    let products = db.get("products");

    if (q) {
      products = products.filter(p => p.title.includes(q));
    }

    if (sortBy === "price" || sortBy === "dateAdded") {
      const sortOrder = asc === "true" ? "asc" : "desc";
      const sortKey = sortBy === "price" ? "price" : "dateAdded";
      products = products.orderBy(sortKey, [sortOrder]);
    }

    // TODO: sort by popularity
    if (sortBy === "popularity") {
      const sortOrder = asc === "true" ? "asc" : "desc";
      products = products.orderBy(
        p => {
          return db
            .get("orderProducts")
            .filter({ productId: p.id })
            .value().length;
        },
        [sortOrder]
      );
    }

    return res.json(products.value());
  };

  const getProduct = (req, res, next) => {
    const id = +req.params.id;
    const product = db
      .get("products")
      .find({ id })
      .value();

    if (!product) return res.status(404).send();

    return res.json(product);
  };

  const addProduct = (req, res, next) => {
    const product = Object.assign(req.body, { id: Date.now() });

    db.get("products")
      .push(product)
      .write();

    return res.json(product);
  };

  const updateProduct = (req, res, next) => {
    const id = +req.params.id;
    const updated = Object.assign(req.body, { id });

    db.get("products")
      .find({ id })
      .assign(updated)
      .write();

    return res.json(updated);
  };

  const removeProduct = (req, res, next) => {
    const id = +req.params.id;

    db.get("products")
      .remove({ id })
      .write();

    return res.status(204).send();
  };

  return {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    removeProduct
  };
};

module.exports = productControllerFactory;
