const _ = require("lodash");

const departmentControllerFactory = db => {
  const getAllDepartments = (req, res, next) => {
    const { include } = req.query;
    const departments = db
      .get("departments")
      .map(d => {
        const dept = Object.assign({ employees: [] }, d);
        if (!!include && include.toLowerCase() === "employees") {
          dept.employees = db
            .get("employees")
            .filter({ departmentId: dept.id })
            .value();
        }
        return dept;
      })
      .value();

    return res.json(departments);
  };

  const getDepartment = (req, res, next) => {
    const { id } = req.params;
    const { include } = req.query;

    const department = db
      .get("departments")
      .find({ id: +id })
      .assign({ employees: [] })
      .value();

    if (!!include && include.toLowerCase() === "employees") {
      department.employees = db
        .get("employees")
        .filter({ departmentId: department.id })
        .value();
    }

    return res.json(department);
  };

  const addDepartment = (req, res, next) => {
    const department = Object.assign(req.body, { id: Date.now() });

    db.get("departments")
      .push(department)
      .write();

    return res.json(department);
  };

  const updateDepartment = (req, res, next) => {
    const { id } = req.params;
    const updated = _.pick(req.body, ["name", "budget"]);
    const department = Object.assign(updated, { id: +id });

    db.get("departments")
      .find({ id: +id })
      .assign(department)
      .write();

    return res.json(department);
  };

  const deleteDepartment = (req, res, next) => {
    const { id } = req.params;
    const hasEmployees = db
      .get("employees")
      .some({ departmentId: +id })
      .value();

    if (hasEmployees) {
      return res
        .status(403)
        .send(
          `Department with id ${id} has employees and cannot be deleted. Remove employees before deleting`
        );
    }

    db.get("departments")
      .remove({ id: +id })
      .write();

    return res.status(204).send();
  };

  return {
    getAllDepartments,
    getDepartment,
    addDepartment,
    updateDepartment,
    deleteDepartment
  };
};

module.exports = departmentControllerFactory;
