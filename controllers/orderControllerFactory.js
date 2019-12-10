const orderControllerFactory = db => {
  const getOrderById = orderId => {
    const order = db
      .get("orders")
      .find({ id: orderId })
      .value();

    if (!order) return res.status(404).send();

    const products = db
      .get("orderProducts")
      .filter(op => op.orderId === orderId)
      .map(op => {
        return db
          .get("products")
          .find({ id: op.productId })
          .value();
      })
      .value();

    order.products = products;

    return order;
  };

  const getAllOrders = (req, res, next) => {
    const { customerId, cart } = req.query || {};

    if (!customerId) {
      return res
        .status(400)
        .send("Please include a customerId query parameter");
    }

    if (!!customerId) {
      const id = +customerId;
      const orders = db
        .get("orders")
        .filter(o => o.customerId === id)
        .map(o => {
          const order = Object.assign({}, o);
          order.products = db
            .get("orderProducts")
            .filter(op => op.orderId === order.id)
            .map(orderProduct => {
              return db
                .get("products")
                .find({ id: orderProduct.productId })
                .value();
            })
            .value();
          return order;
        })
        .value();

      if (cart) {
        const shoppingCart = orders.find(o => !o.userPaymentId);

        return res.json(shoppingCart);
      }

      return res.json(orders);
    }
  };

  const getOrder = (req, res, next) => {
    const orderId = +req.params.id;
    const order = getOrderById(orderId);

    return res.json(order);
  };

  const addToOrder = (req, res, next) => {
    if (!req.body)
      return res
        .status(400)
        .send("Request body must include customerId and productId");

    const { customerId, productId } = req.body;

    if (!customerId || !productId) {
      return res
        .status(400)
        .send("Request body must include customerId and productId");
    }

    let currentPendingOrder = db
      .get("orders")
      .find(o => o.customerId === customerId && !o.userPaymentId)
      .value();

    if (!currentPendingOrder) {
      currentPendingOrder = {
        id: Date.now(),
        customerId,
        userPaymentId: null
      };
      db.get("order")
        .push(currentPendingOrder)
        .write();
    }

    const orderProduct = {
      id: Date.now(),
      orderId: currentPendingOrder.id,
      productId
    };

    db.get("orderProducts")
      .push(orderProduct)
      .write();

    const order = getOrderById(currentPendingOrder.id);

    return res.json(order);
  };

  const purchaseOrder = (req, res, next) => {
    const orderId = +req.params.id;

    if (!req.body)
      return res.status(400).send("Request body must include userPaymentId");

    const { userPaymentId } = req.body;

    if (!userPaymentId)
      return res.status(400).send("Request body must include userPaymentId");

    const pendingOrder = db
      .get("orders")
      .find(order => order.id === orderId && !order.userPaymentId);

    if (!pendingOrder.value())
      return res
        .status(404)
        .send("Order either does not exist or has already been paid for");

    pendingOrder.assign({ userPaymentId }).write();

    return res.status(204).send();
  };

  const removeProductFromOrder = (req, res, next) => {
    const { orderId, productId } = req.params;

    db.get("orderProducts")
      .remove(op => op.orderId === +orderId && op.productId === +productId)
      .write();

    return res.status(204).send();
  };

  return {
    getAllOrders,
    getOrder,
    addToOrder,
    purchaseOrder,
    removeProductFromOrder
  };
};

module.exports = orderControllerFactory;
