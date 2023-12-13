// CRUD OPenration Function
const {
  LastUser,
  UpdateQuery,
  GetValues,
  DeleteQuery,
  InsertQuery
} = require("./CRUDOperation");

const RegisterUser = async (Connection, Data) => {
  const filter = { Username: Data.Username } ;
  const result = await InsertQuery(
    Connection,
    "TaskManager",
    "RegisterUser",
    filter,
    Data
  );
  return result; 
};

const DeleteUser = async (ConnectionFunc, Username) => {
  const filter = { Username: Username };
  const result = await DeleteQuery(
    ConnectionFunc,
    "TaskManager",
    "RegisterUser",
    filter
  );
  return result;
};

const TaskProjectlist = async(ConnectionFunc) => {
  const fields = {
    _id: 0,
    ProjectName:1,
    ProjectField:1,
    ProjectStatus:1,
    Month:1,
  };
  const result = await GetValues(
    ConnectionFunc,
    "Projects",
    "RegisterdProjects",
    fields
  );
  return result;
}


const TaskUsers = async(ConnectionFunc, Obj) => {
  const values = {
    _id: 0,
    Name:1,
    Username:1,
    Field:1,
    Type:1
  };

  let client = await ConnectionFunc();
  let res = await client.connect();
  let database = await res.db("TaskManager").collection("RegisterUser");
  const existingUser = await database.find({Field: Obj.Field}).project(values).toArray();
   
  return existingUser;
}


const RegisterUsersList = async (ConnectionFunc) => {
  let client = await ConnectionFunc();
  let res = await client.connect();
  let database = res.db("TaskManager");
  let collection = database.collection("RegisterUser");
  const fields = [
    {
      $project: {
        _id: 0,
        Name: 1,
        ID: 1,
        Email: 1,
        ContactNo: 1,
        Type: 1,
        Field: 1,
        Role: 1,
        Status: 1,
        Username: 1,
      },
    },
  ];
  const result = await collection.aggregate(fields).toArray();

  return result;
};





const GEtLastUserID = async (Connection) => {
  const fields = [
    {
      $project: {
        _id: 0,
        ID: 1,
      },
    },
  ];

  let client = await Connection();
  let res = await client.connect();
  let database = res.db("TaskManager").collection("RegisterUser");
  const result = await database.aggregate(fields).sort({ ID: -1 }).limit(1).toArray();
  return result;
};



const GetLastTaskID = async (Connection) => {
  const fields = [
    {
      $project: {
        _id: 0,
        ID: 1,
      },
    },
  ];
  const result = await LastUser(Connection, "TaskManager", "RegisterTask", fields);
  return result;
};

const UpdateUserRecord = async (Connection, obj) => {
  let filter = { Username: obj.Username };
  const result = await UpdateQuery(
    Connection,
    "TaskManager",  
    "RegisterUser",
    filter,
    obj   
  );
  return result;
};

const RegisterTask = async (Connection, obj) => {
  const filter = { TaskID: obj.TaskID } ;
  const result = await InsertQuery(
    Connection,
    "TaskManager",
    "RegisterTask",
    filter,
    obj
  );
  return result;
};

const GetTaskList = async (ConnectionFunc) => {
  const fields = {
    _id: 0,
  }; 
  const result = await GetValues(
    ConnectionFunc,  
    "TaskManager",
    "RegisterTask",  
    fields
  );
  return result;
}; 

const DeleteTask = async (ConnectionFunc, TaskID) => {
  const filter = { TaskID };
  const result = await DeleteQuery(
    ConnectionFunc,
    "TaskManager",
    "RegisterTask",
    filter
  );
  return result; 
};



const UpdateTaskRecord = async (Connection, obj) => {
  let filter = { TaskID: obj.TaskID };
  const result = await UpdateQuery( 
    Connection,
    "TaskManager",
    "RegisterTask", 
    filter,
    obj 
  );  
  return result; 
}






module.exports = {
  RegisterUser,
  RegisterUsersList,
  DeleteUser,
  GEtLastUserID,
  UpdateUserRecord,
  RegisterTask,
  GetTaskList,
  DeleteTask,
  UpdateTaskRecord,
  TaskProjectlist,
  TaskUsers,
  GetLastTaskID,
};
