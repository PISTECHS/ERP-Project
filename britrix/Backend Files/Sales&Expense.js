const {
  LastUser,
  InsertQuery,
  GetValues,
  DeleteQuery,
  UpdateQuery,
} = require("./CRUDOperation");

const GetLastExpenseID = async (Connection) => {
  const fields = [
    {
      $project: {
        _id: 0,
        ID: 1,
      },
    },
  ];
  const result = await LastUser(Connection, "Sales", "ExpenseRecord", fields);
  return result;
};

const AddExpense = async (Connection, Data) => {
  const filter = { ID: Data.ID };
  const result = await InsertQuery(
    Connection,
    "Sales",
    "ExpenseRecord",
    filter,
    Data
  );
  return result;
};

const ExpensesList = async (ConnectionFunc) => {
  const fields = {
    _id: 0,
  };
  const result = await GetValues(
    ConnectionFunc,
    "Sales",
    "ExpenseRecord",
    fields
  );
  return result;
};

const DeleteExpense = async (ConnectionFunc, ID) => {
  const filter = { ID };
  const result = await DeleteQuery(
    ConnectionFunc,
    "Sales",
    "ExpenseRecord",
    filter
  );
  return result;
};

const UpdateExpenses = async (Connection, obj) => {
  let filter = { ID: obj.ID };
  const result = await UpdateQuery(
    Connection,
    "Sales",
    "ExpenseRecord",
    filter,
    obj
  );
  return result;
};

const GetLastSaleID = async (Connection) => {
  const fields = [
    {
      $project: {
        _id: 0,
        ID: 1,
      },
    },
  ];
  const result = await LastUser(Connection, "Sales", "SalesRecord", fields);
  return result;
};

const AddSale = async (Connection, Data) => {
  const filter = { ID: Data.ID };
  const result = await InsertQuery(
    Connection,
    "Sales",
    "SalesRecord",
    filter,
    Data
  );
  return result;
};

const SalesList = async (ConnectionFunc) => {
  const fields = {
    _id: 0,
  };
  const result = await GetValues(
    ConnectionFunc,
    "Sales",
    "SalesRecord",
    fields
  );
  return result;
};

const UpdateSales = async (Connection, obj) => {
  let filter = { ID: obj.ID };

  const result = await UpdateQuery(
    Connection,
    "Sales",
    "SalesRecord",
    filter,
    obj
  );
  return result;
};

const DeleteSale = async (ConnectionFunc, ID) => {
  const filter = { ID };
  const result = await DeleteQuery(
    ConnectionFunc,
    "Sales",
    "SalesRecord",
    filter
  );
  return result;
};

module.exports = {
  GetLastExpenseID,
  AddExpense,
  ExpensesList,
  DeleteExpense,
  UpdateExpenses,
  GetLastSaleID,
  AddSale,
  SalesList,
  UpdateSales,
  DeleteSale,
};
