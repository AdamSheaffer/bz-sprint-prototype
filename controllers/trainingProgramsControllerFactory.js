const trainingProgramsControllerFactory = db => {
  const getAllTrainingPrograms = (req, res, next) => {
    const programs = db.get("trainingPrograms").value();

    return res.json(programs);
  };

  const getTrainingProgram = (req, res, next) => {
    const { id } = req.params;
    const program = db
      .get("trainingPrograms")
      .find({ id: +id })
      .value();

    if (!program) return res.status(404).send();

    const employees = db
      .get("employeeTrainingPrograms")
      .filter(etp => etp.trainingProgramId === +id)
      .map(etp => {
        return db
          .get("employees")
          .find({ id: etp.employeeId })
          .value();
      })
      .value();

    program.employees = employees;

    return res.json(program);
  };

  const addTrainingProgram = (req, res, next) => {
    const { startDate, endDate } = req.body;
    const defaults = {
      id: Date.now(),
      startDate: startDate && new Date(startDate).toISOString(),
      endDate: endDate && new Date(endDate).toISOString()
    };
    const program = Object.assign(req.body, defaults);
    db.get("trainingPrograms")
      .push(program)
      .write();

    return res.json(program);
  };

  const updateTrainingProgram = (req, res, next) => {
    const { startDate, endDate } = req.body;
    const id = +req.params.id;
    const defaults = {
      id,
      startDate: startDate && new Date(startDate).toISOString(),
      endDate: endDate && new Date(endDate).toISOString()
    };
    const updated = Object.assign(req.body, defaults);

    db.get("trainingPrograms")
      .find({ id })
      .assign(updated)
      .write();

    return res.json(updated);
  };

  const addEmployeeToTraining = (req, res, next) => {
    const programId = +req.params.id;
    const employee = req.body;

    db.get("employeeTrainingPrograms")
      .push({
        id: Date.now(),
        employeeId: employee.id,
        programId
      })
      .write();

    return res.status(204).send();
  };

  const removeTrainingProgram = (req, res, next) => {
    const id = +req.params.id;

    db.get("trainingPrograms")
      .remove({ id })
      .write();

    db.get("employeeTrainingPrograms")
      .remove(etp => etp.trainingProgramId === id)
      .write();

    return res.status(204).send();
  };

  const removeEmployeeFromProgram = (req, res, next) => {
    const { trainingProgramId, employeeId } = req.params;

    db.get("employeeTrainingPrograms")
      .remove(etp => {
        return (
          etp.employeeId === +employeeId &&
          etp.trainingProgramId === +trainingProgramId
        );
      })
      .write();

    return res.status(204).send();
  };

  return {
    getAllTrainingPrograms,
    getTrainingProgram,
    addTrainingProgram,
    updateTrainingProgram,
    addEmployeeToTraining,
    removeTrainingProgram,
    removeEmployeeFromProgram
  };
};

module.exports = trainingProgramsControllerFactory;
