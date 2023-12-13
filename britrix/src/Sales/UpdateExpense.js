import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Fetchdata from "../Component/FetchData";
import { ExpenseSchema } from "../TaskManagement/ValidationSchemas";
import BoxModel, {handelCloseModelBox, handelOpenModelBox} from "../Component/ComponentElement/BoxModel";


const UpdateExpense = () => {
  const [Mes, setMes] = useState("");
  const location = useLocation();
  const Naviagte = useNavigate();

  const UpdateData = async (obj) => {
    setMes("");
    try {
      let response = await Fetchdata(
        "post",
        "http://localhost:8080/UpdateExpenses",
        obj
      );
      console.log(response);
      setMes(response.mes);
      handelOpenModelBox("dialog");
    } catch (err) {
      setMes(err.message);
      handelOpenModelBox("dialog");
    }
  };

  const ExpensesValues = {
    ...location.state,
  };

  const formik = useFormik({
    initialValues: ExpensesValues,
    validationSchema: ExpenseSchema,
    onSubmit: (values) => {
      UpdateData(values);
    },
  });
  return (
    <>
      <div className="conatainer m-4">
        <dialog
          className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
          id="dialog"
        >
          <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
        </dialog>
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-lg rounded-0 m-3 p-4">
            <div className=" d-flex flex-wrap col-12 m-3 justify-content-between">
              <div>
                {" "}
                <h4 className="h4">Update Expense</h4>
              </div>
              <div>
                <button
                  className="btn btn-danger rounded-0"
                  onClick={() => Naviagte("/services/expenses")}
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
                      name="ID"
                      onChange={formik.handleChange}
                      value={formik.values.ID}
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
    </>
  );
};

export default UpdateExpense;
