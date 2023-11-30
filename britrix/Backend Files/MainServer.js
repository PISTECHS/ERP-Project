const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const server = express();
const { MongoClient } = require("mongodb");

const bcrypt = require("bcrypt");
let saltRound = 10;

//TaskManagement Functions
const {
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
  TaskUsers
} = require("./TaskManagement");

//Sales & Expense Record

const {
  GetLastExpenseID,
  AddExpense,
  ExpensesList,
  DeleteExpense,
  UpdateExpenses,
  GetLastSaleID,
  AddSale,
  SalesList,
  UpdateSales,
  DeleteSale
  
} = require("./Sales&Expense");

//Project Management
const {
  AddProject,
  GetLastProjectID,
  ProjectList,
  DeleteProject,
  UpdateProject
} = require("./ProjectManagement");


//Project Management
const {
  AddField,
  FieldList,
  GetLastFieldID,
  DeleteField
} = require("./ManageField");





server.use(cors());
server.use(bodyParse.json());
server.use(express.json());

let ConnectionFunc = async () => {
  // const url = `mongodb+srv://fa7711598:no01gVHy9SIQjGSN@cluster0.wrjtyys.mongodb.net/`;
  const url = `mongodb+srv://fa7711598:bekcflaHuPdiuYfT@cluster0.cxkipa1.mongodb.net/?retryWrites=true&w=majority`
  const client = new MongoClient(url);
  return client;
};

let UserLogin = async (username, password) => {
  let client = await ConnectionFunc();
  let res = await client.connect();
  let database = res.db("TaskManager").collection("RegisterUser");
  const user = await database.findOne({ Username: username });
  if (!user) {
    return { success: false, mes: "User not found" };
  }
  const passwordMatch = await bcrypt.compare(password, user.Password);
  if (passwordMatch) {
    return { success: true, mes: "Login successful" };
  } else {
    return { success: false, mes: "Incorrect password" };
  }
};

//TaskManager Functions
server.post("/registeruser", async (req, resp) => {
  let salt = bcrypt.genSaltSync(saltRound);
  let hashPass = bcrypt.hashSync("pistechs12345", salt);

  let Data = {
    Name: req.body.EmpName,
    ID: req.body.EmpID,
    Username: `EMP-${req.body.EmpID}@${req.body.EmpPosition}.pistechs.com`,
    Type: req.body.EmpType,
    Field: req.body.EmpField,
    Email: req.body.EmpEmail,
    Role: req.body.EmpPosition,
    ContactNo: req.body.EmpContactNo,
    Status: "Active",
    Password: hashPass, 
  };

  let result = await Promise.resolve(RegisterUser(ConnectionFunc, Data)).then(
    (res) => {
      return res;
    }
  );   
  resp.json(result);
});


server.post("/updaterecord", async (req, resp) => {
  let result = await Promise.resolve(
    UpdateUserRecord(ConnectionFunc, req.body)
  ).then((res) => {
    return res;
  });
  // console.log(result);
  resp.json(result)
});

server.post("/deleteuser", async (req, resp) => {
  
  let result = await Promise.resolve(
    DeleteUser(ConnectionFunc, req.body.Username)
  ).then((res) => {
    return res;
  });
  resp.json(result); 
});

server.get("/userlist", async (req, resp) => {
  let result = await Promise.resolve(RegisterUsersList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  // console.log(result);
  resp.json(result);
});


server.get("/TaskProjectlist", async (req, resp) => {
  let result = await Promise.resolve(TaskProjectlist(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});


server.post("/TaskUsers", async (req, resp) => {
  // console.log(req.body.Field);
  let result = await Promise.resolve(TaskUsers(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);

});

server.get("/GEtLastUserID", async (req, resp) => {
  let result = await Promise.resolve(GEtLastUserID(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  // console.log(result);
  resp.json(result);  

});

server.get("/GetTaskList", async (req, resp) => {
  let result = await Promise.resolve(GetTaskList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});


 //Task Management 
server.post("/RegisterTask", async (req, resp) => {
  let result = await Promise.resolve(RegisterTask(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});


server.post("/DeleteTask", async (req, resp) => {
  let result = await Promise.resolve(DeleteTask(ConnectionFunc, req.body.TaskID)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.post("/UpdateTaskRecord", async (req, resp) => {
  let result = await Promise.resolve(UpdateTaskRecord(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

// Sales & Expense

server.get("/GetLastExpenseID", async (req, resp) => {
  let result = await Promise.resolve(GetLastExpenseID(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.post("/AddExpense", async (req, resp) => {
  let result = await Promise.resolve(AddExpense(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.get("/ExpensesList", async (req, resp) => {
  let result = await Promise.resolve(ExpensesList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  // console.log(result);
  resp.json(result);
});

server.post("/DeleteExpense", async (req, resp) => {
  let result = await Promise.resolve(DeleteExpense(ConnectionFunc, req.body.ID)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});



server.post("/UpdateExpenses", async (req, resp) => {
  let result = await Promise.resolve(UpdateExpenses(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});



server.get("/GetLastSaleID", async (req, resp) => {
  let result = await Promise.resolve(GetLastSaleID(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});


server.post("/AddSale", async (req, resp) => {
  let result = await Promise.resolve(AddSale(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.get("/SalesList", async (req, resp) => {
  let result = await Promise.resolve(SalesList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  // console.log(result);
  resp.json(result);
});


server.post("/UpdateSales", async (req, resp) => {
  let result = await Promise.resolve(UpdateSales(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});


server.post("/DeleteSale", async (req, resp) => {
  let result = await Promise.resolve(DeleteSale(ConnectionFunc, req.body.ID)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

//Project Management
server.post("/AddProject", async (req, resp) => {
  let result = await Promise.resolve(AddProject(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.get("/GetLastProjectID", async (req, resp) => {
  let result = await Promise.resolve(GetLastProjectID(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.get("/ProjectList", async (req, resp) => {
  let result = await Promise.resolve(ProjectList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.post("/DeleteProject", async (req, resp) => {
  let result = await Promise.resolve(DeleteProject(ConnectionFunc, req.body.ID)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.post("/UpdateProject", async (req, resp) => {
  let result = await Promise.resolve(UpdateProject(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

//ManageField


server.post("/AddField", async (req, resp) => {
  let result = await Promise.resolve(AddField(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});


server.get("/FieldList", async (req, resp) => {
  let result = await Promise.resolve(FieldList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});


server.post("/DeleteField", async (req, resp) => {
  let result = await Promise.resolve(DeleteField(ConnectionFunc, req.body.ID)).then(
    (res) => {
      return res;
    }
  ); 
  resp.json(result);
});

server.get("/GetLastFieldID", async (req, resp) => {
  let result = await Promise.resolve(GetLastFieldID(ConnectionFunc, req.body)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
}); 



server.post("/userlogin", async (req, resp) => {
  let result = await Promise.resolve(
    UserLogin(req.body.EmpEmail, req.body.EmpPass)
  ).then((res) => {
    return res;
  });
  // console.log(result);
  resp.json(result);
});

server.get("/server", async (req, resp) => {
  resp.send("connected");
});

server.listen(8080, () => {
  console.log("Started");
});
