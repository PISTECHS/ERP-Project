const {
    LastUser,
    UpdateQuery,
    GetValues,
    DeleteQuery,
    InsertQuery
  } = require("./CRUDOperation");



  const GetLastCompanyID = async (Connection) => {
    const fields = [
      {
        $project: {
          _id: 0,
          CompanyID: 1,
        },
      },
    ];
  
    let client = await Connection();
    let res = await client.connect();
    let database = res.db("Companies").collection("RegisterCompanies");
    const result = await database.aggregate(fields).sort({ CompanyID: -1 }).limit(1).toArray();
    return result;
  };


  const RegisterCompany = async (Connection, Data, ID) => {

    // console.log(Data);
    const filter = { CompanyID: ID } ;
    const result = await InsertQuery(
      Connection,
      "Companies",
      "RegisterCompanies",
      filter,
      Data
    );
    return result; 
  };


  const RegisterCompanyList = async (ConnectionFunc) => {
    let client = await ConnectionFunc();
    let res = await client.connect();
    let database = res.db("Companies");
    let collection = database.collection("RegisterCompanies");
    const fields = [
      {
        $project: {
          _id: 0,
        },
      },
    ];
    const result = await collection.aggregate(fields).toArray();
    return result;
  };


  const DeleteCompany = async (ConnectionFunc, CompanyID) => {
    const filter = { CompanyID:  CompanyID };
    const result = await DeleteQuery(
      ConnectionFunc,
      "Companies",
      "RegisterCompanies",
      filter
    );
    return result; 
  };

  
  const UpdateCompany = async (ConnectionFunc, Data, CompanyID) => {
    let filter = { CompanyID: CompanyID };
    const result = await UpdateQuery( 
        ConnectionFunc,
      "Companies",
      "RegisterCompanies",
      filter,
      Data 
    );  
    return result; 
  };

  module.exports = {
    RegisterCompany,
    GetLastCompanyID,
    RegisterCompanyList,
    DeleteCompany,
    UpdateCompany

}