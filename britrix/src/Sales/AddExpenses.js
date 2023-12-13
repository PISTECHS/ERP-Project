import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Fetchdata from "../Component/FetchData";
import { useNavigate } from "react-router-dom";
import { ExpenseSchema } from "../TaskManagement/ValidationSchemas";
import BoxModel, {handelOpenModelBox, handelCloseModelBox} from "../Component/ComponentElement/BoxModel";

function AddExpenses() {
  useEffect(() => {
    GetExpenseID();
  }, []);
  const [Mes, setMes] = useState("");
  const [ExpenseID, setExpenseID] = useState("E00");
  const Navigate = useNavigate();


  const OpenBox = (value) => {
    setMes("")
     if(typeof value === 'string'){
      setMes(value);
      handelOpenModelBox("dialog");
     } 
  }

  const GetExpenseID = async () => {
    setMes("");
    try {
      const resp = await Fetchdata(
        "GET",
        "http://localhost:8080/GetLastExpenseID"
      );
      if (resp.length > 0) {
        setExpenseID(resp[0].ID + 1);
      } else {
        setExpenseID(resp.length + 1);
      }
    } catch (err) {
      OpenBox(err.message)
    }
  };

  const SubmitExpense = async (obj) => {
    let OBJ = { ...obj, ID: ExpenseID };
    setMes("");
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/AddExpense",
        OBJ
      );
      OpenBox(response.mes)
    } catch (error) {
      OpenBox(error.message)
    }
  };

  const AddExpenseValues = {
    ExpenseName: "",
    ExpenseMonth: "",
    ExpenseDate: "",
    ExpenseAmount: "",
    ExpenseType: "",
    AddBy: "",
  };

  const formik = useFormik({
    initialValues: AddExpenseValues,
    validationSchema: ExpenseSchema,
    onSubmit: (values) => {
      //   console.log(values);
      SubmitExpense(values);
    },
  });
  return (
    <>
      <div className="conatainer m-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-lg rounded-0 m-3 p-4">
            <div className=" d-flex flex-wrap col-12 m-3 justify-content-between">
              <div>
                {" "}
                <h4 className="h4">Add Expense</h4>
              </div>
              <div>
                <button
                  className="btn btn-danger rounded-0"
                  onClick={() => Navigate("/services/expenses")}
                >
                  Expense List
                </button>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="ExpenseID"
                      value={ExpenseID}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Expense Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="ExpenseName"
                      onChange={formik.handleChange}
                      value={formik.values.ExpenseName}
                    />
                  </div>

                  {formik.touched.ExpenseName && formik.errors.ExpenseName ? (
                    <div className="text-danger">
                      {formik.errors.ExpenseName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Expense Type</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="ExpenseType"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.ExpenseType}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="FixedExpense">
                        Fixed Expense
                      </option>
                      <option className="dropdown-item" value="SavingExpense">
                        Saving Expense
                      </option>
                    </select>
                  </div>
                  {formik.touched.ExpenseType && formik.errors.ExpenseType ? (
                    <div className="text-danger">
                      {formik.errors.ExpenseType}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="date"
                      name="ExpenseDate"
                      onChange={formik.handleChange}
                      value={formik.values.ExpenseDate}
                    />
                  </div>
                  {formik.touched.ExpenseDate && formik.errors.ExpenseDate ? (
                    <div className="text-danger">
                      {formik.errors.ExpenseDate}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Expense Month</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="month"
                      name="ExpenseMonth"
                      onChange={formik.handleChange}
                      value={formik.values.ExpenseMonth}
                    />
                  </div>
                  {formik.touched.ExpenseMonth && formik.errors.ExpenseMonth ? (
                    <div className="text-danger">
                      {formik.errors.ExpenseMonth}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Expense Amount</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="ExpenseAmount"
                      onChange={formik.handleChange}
                      value={formik.values.ExpenseAmount}
                    />
                  </div>
                  {formik.touched.ExpenseAmount &&
                  formik.errors.ExpenseAmount ? (
                    <div className="text-danger">
                      {formik.errors.ExpenseAmount}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Add By</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="AddBy"
                      onChange={formik.handleChange}
                      value={formik.values.AddBy}
                    />
                  </div>
                  {formik.touched.AddBy && formik.errors.AddBy ? (
                    <div className="text-danger">{formik.errors.AddBy}</div>
                  ) : null}
                </div>
              </div>

              <div className="m-5 text-center">
                {/* {Mes && <div className="border border-2 p-2 m-2">{Mes}</div>} */}
                <button
                  className="btn btn-primary border-0 shadow-sm rounded-0"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <dialog
        className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
        id="dialog"
      >
        <BoxModel mes={Mes} closeFunc={handelCloseModelBox("dialog")} />
      </dialog>
    </>
  );
}

export default AddExpenses;
