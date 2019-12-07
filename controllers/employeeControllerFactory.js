const employeeControllerFactory = db => {
  const getAllEmployees = (req, res, next) => {
    const employees = db.get("employees").filter(e => {
      return (
        e.firstName.includes(req.query.firstName || "") &&
        e.lastName.includes(req.query.lastName || "")
      );
    });

    return res.json(employees.value());
  };

  const getEmployee = (req, res, next) => {
    const { id } = req.params;

    const employee = db
      .get("employees")
      .find({ id: +id })
      .value();

    return res.json(employee);
  };

  const addEmployee = (req, res, next) => {
    const employee = Object.assign(req.body, { id: Date.now() });
    db.get("employees")
      .push(employee)
      .write();

    return res.json(employee);
  };

  const updateEmployee = (req, res, next) => {
    const { id } = req.params;
    const employee = Object.assign(req.body, { id: +id });
    db.get("employees")
      .find({ id: employee.id })
      .assign(employee)
      .write();

    return res.json(employee);
  };

  return {
    getAllEmployees,
    getEmployee,
    addEmployee,
    updateEmployee
  };
};

module.exports = employeeControllerFactory;
