const {
    LastUser,
    UpdateQuery,
    GetValues,
    DeleteQuery,
    InsertQuery
  } = require("./CRUDOperation");


  const AddInvoice = async (Connection, Data, InvoiceID ) => {
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
  

  const GetLastInvoiceID = async (Connection) => {
    const fields = [
      {
        $project: {
          _id: 0,
          InvoiceID: 1
        },
      },
    ];
    let client = await Connection();
    let res = await client.connect();
    let database = await res.db("Payment").collection("RegisterInvoices")
    let result = database.aggregate(fields)
    .sort({ InvoiceID: -1 })
    .limit(1) 
    .toArray();
    return result;
  };
  

  const AddPayment = async (Connection, Data, PaymentID) => {
    const filter = { PaymentID:  PaymentID };
    const result = await InsertQuery(
        Connection,
        "Payment",
        "RegisterPayment",
        filter,
        Data
      );
      return result; 
  };


  const FilterPaymentRecord = async(Connection,InvoiceID) => {
    // console.log('invoice id is '+InvoiceID);
    let client = await Connection();
    let res = await client.connect();
    let database = res.db("Payment");
    let collection = database.collection("RegisterPayment");
    const fields = [
      {
        $match: {
          InvoiceID: InvoiceID
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]
    const result = await collection.aggregate(fields).toArray();
    return result;
  }


  const DeletePayment = async (ConnectionFunc, PaymentID) => {
    const filter = {  PaymentID : PaymentID };
    const result = await DeleteQuery(
      ConnectionFunc,
      "Payment",
      "RegisterPayment",
      filter
    );
    return result; 
  };

  const GetLastPaymentID = async (Connection) => {
    const fields = [
      {
        $project: {
          _id: 0,
          PaymentID: 1
        },
      },
    ];
    let client = await Connection();
    let res = await client.connect();
    let database = await res.db("Payment").collection("RegisterPayment")
    let result = database.aggregate(fields)
    .sort({ PaymentID: -1 })
    .limit(1)
    .toArray();
    return result;
  };


  module.exports = {
    AddInvoice,
    RegisterPaymentList,
    DeleteInvoice,
    UpdateInvoice,
    AddPayment,
    GetLastInvoiceID,
    FilterPaymentRecord,
    DeletePayment,
    GetLastPaymentID
  }