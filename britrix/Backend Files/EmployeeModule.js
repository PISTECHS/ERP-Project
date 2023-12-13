const {
  LastUser,
  UpdateQuery,
  GetValues,
  DeleteQuery,
  InsertQuery
} = require("./CRUDOperation");

const FilterEmployeeTask = async(Connection, person) => {
    // console.log(person);
    // console.log('invoice id is '+InvoiceID);
    let client = await Connection();
    let res = await client.connect();
    let database = res.db("TaskManager");
    let collection = database.collection("RegisterTask");
    const fields = [
      {
        $match: {
          TaskAllocation: person
        }
      },
      {
        $project: {
          _id: 0,
        }
      }
    ]
    const result = await collection.aggregate(fields).toArray();
    return result;
  }


  const FilterEmployeeInfo = async(Connection, person) => {
    let client = await Connection();
    let res = await client.connect();
    let database = res.db("TaskManager");
    let collection = database.collection("RegisterUser");
    const fields = [
      {
        $match: {
          Username: person
        }
      },
      {
        $project: {
          _id: 0,
          Password:0,
        }
      }
    ]
    const result = await collection.aggregate(fields).toArray();
    return result;
  }


  const UpdateEmployeeInfo = async (Connection, obj) => {
    let filter = { Username: obj.Username };
    const result = await UpdateQuery( 
      Connection,
      "TaskManager",
      "RegisterUser", 
      filter,
      obj 
    );  
    return result; 
  }



  


  



  module.exports = {
    FilterEmployeeTask,
    FilterEmployeeInfo,
    UpdateEmployeeInfo
  }