const computersControllerFactory = db => {
  const getAllComputers = (req, res, next) => {
    const { available } = req.query;
    const computers = db
      .get("computers")
      .filter(c => {
        const isAssigned = db
          .get("employees")
          .some({ computerId: c.id })
          .value();

        if (available === "true") {
          return !c.decomissionDate && !isAssigned;
        }
        if (available === "false") {
          return !!c.decomissionDate || isAssigned;
        }
        return true;
      })
      .value();

    return res.json(computers);
  };

  const getComputer = (req, res, next) => {
    const id = +req.params.id;
    const computer = db
      .get("computers")
      .find({ id })
      .value();

    if (!computer) return res.status(404).send();

    return res.json(computer);
  };

  const addComputer = (req, res, next) => {
    const { decomissionDate, purchaseDate } = req.body;
    const defaults = {
      id: Date.now(),
      decomissionDate:
        decomissionDate && new Date(decomissionDate).toISOString(),
      purchaseDate: purchaseDate && new Date(purchaseDate).toISOString()
    };
    const computer = Object.assign(req.body, defaults);

    db.get("computers")
      .push(computer)
      .write();

    return res.json(computer);
  };

  const updateComputer = (req, res, next) => {
    const { id } = req.params;
    const updated = Object.assign(req.body, { id: +id });

    db.get("computers")
      .find({ id: +id })
      .assign(updated)
      .write();

    return res.json(updated);
  };

  const deleteComputer = (req, res, next) => {
    const { id } = req.params;
    const isAssigned = db
      .get("employees")
      .some({ computerId: +id })
      .value();

    const computer = db
      .get("computers")
      .find({ id: +id })
      .value();

    if (isAssigned || !computer.decomissionDate) {
      return res
        .status(403)
        .send("Computer must be unassigned and decomissed before deleting");
    }

    db.get("computers")
      .remove({ id: +id })
      .write();

    return res.status(204).send();
  };

  return {
    getAllComputers,
    getComputer,
    addComputer,
    updateComputer,
    deleteComputer
  };
};

module.exports = computersControllerFactory;
