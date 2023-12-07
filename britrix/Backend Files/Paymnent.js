const {
    LastUser,
    UpdateQuery,
    GetValues,
    DeleteQuery,
    InsertQuery
  } = require("./CRUDOperation");


  const AddInvoice = async (Connection, Data, InvoiceID ) => {
    // console.log(obj);
    const filter = { InvoiceID:  InvoiceID };
    const result = await InsertQuery(
        Connection,
        "Payment",
        "RegisterInvoices",
        filter,
        Data
      );
      return result; 
  };


  const RegisterPaymentList = async (ConnectionFunc) => {
    let client = await ConnectionFunc();
    let res = await client.connect();
    let database = res.db("Payment");
    let collection = database.collection("RegisterInvoices");
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



  const DeleteInvoice = async (ConnectionFunc, InvoiceID) => {
    const filter = { InvoiceID:  InvoiceID };
    const result = await DeleteQuery(
      ConnectionFunc,
      "Payment",
      "RegisterInvoices",
      filter
    );
    return result; 
  };

  const UpdateInvoice = async (ConnectionFunc, Data, InvoiceID) => {
    const filter = { InvoiceID:  InvoiceID };
    const result = await UpdateQuery( 
        ConnectionFunc,
      "Payment",
      "RegisterInvoices",
      filter,
      Data 
    );  
    return result; 
  };
  

  const AddPayment = async (Connection, Data, PaymentID) => {
    const filter = { PaymentID:  PaymentID };
    const result = await InsertQuery(
        Connection,
        "Payment",
        "RegisterInvoices",
        filter,
        Data
      );
      return result; 
  };



  module.exports = {
    AddInvoice,
    RegisterPaymentList,
    DeleteInvoice,
    UpdateInvoice,
    AddPayment
  }