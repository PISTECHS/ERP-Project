const {
    LastUser,
    InsertQuery,
    GetValues,
    DeleteQuery,
    UpdateQuery,
  } = require("./CRUDOperation");
  
  const GetLastFieldID = async (Connection) => {
    const fields = [
      {
        $project: {
          _id: 0,
          ID:1,
        },
      },
    ];
    const result = await LastUser(Connection, "Projects", "RegisterdField", fields);
    return result;
  };
  
  const AddField = async (Connection, Data) => {
    const filter = { ID: Data.ID };
    const result = await InsertQuery(
      Connection,
      "Projects",
      "RegisterdField",
      filter,
      Data
    );
    return result;
  };
  
  const FieldList = async (ConnectionFunc) => {
    const fields = {
      _id: 0,
    };
    const result = await GetValues(
      ConnectionFunc,
      "Projects",
      "RegisterdField",
      fields
    );
    return result;
  };
  
//   const UpdateProject = async (Connection, obj) => {
//     let filter = { ID: obj.ID };
  
//     const result = await UpdateQuery(
//       Connection,
//       "Projects",
//       "RegisterdProjects",
//       filter,
//       obj
//     );
//     return result;
//   };
  
  const DeleteField = async (ConnectionFunc, ID) => {
    const filter = { ID };
    const result = await DeleteQuery(
      ConnectionFunc,
      "Projects",
      "RegisterdField",
      filter
    );
    return result;
  };
  
  module.exports = {
    AddField,
    GetLastFieldID,
    FieldList,
    DeleteField
  };
  