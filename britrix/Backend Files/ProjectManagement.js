const {
    LastUser,
    InsertQuery,
    GetValues,
    DeleteQuery,
    UpdateQuery,
  } = require("./CRUDOperation");
  
  const GetLastProjectID = async (Connection) => {
    const fields = [
      {
        $project: {
          _id: 0,
          ID: 1,
        },
      },
    ];
    const result = await LastUser(Connection, "Projects", "RegisterdProjects", fields);
    return result;
  };
  
  const AddProject = async (Connection, Data) => {
    const filter = { ID: Data.ID };
    const result = await InsertQuery(
      Connection,
      "Projects",
      "RegisterdProjects",
      filter,
      Data
    );
    return result;
  };
  
  const ProjectList = async (ConnectionFunc) => {
    const fields = {
      _id: 0,
    };
    const result = await GetValues(
      ConnectionFunc,
      "Projects",
      "RegisterdProjects",
      fields
    );
    return result;
  };
  
  const UpdateProject = async (Connection, obj) => {
    let filter = { ID: obj.ID };
  
    const result = await UpdateQuery(
      Connection,
      "Projects",
      "RegisterdProjects",
      filter,
      obj
    );
    return result;
  };
  
  const DeleteProject = async (ConnectionFunc, ID) => {
    const filter = { ID };
    const result = await DeleteQuery(
      ConnectionFunc,
      "Projects",
      "RegisterdProjects",
      filter
    );
    return result;
  };
  
  module.exports = {
    AddProject,
    GetLastProjectID,
    ProjectList,
    DeleteProject,
    UpdateProject
  };
  