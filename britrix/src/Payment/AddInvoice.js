import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { InvoiceSchema } from "../TaskManagement/ValidationSchemas";
import Fetchdata from "../Component/FetchData";
import BoxModel from "../Component/ComponentElement/BoxModel";

const AddInvoice = () => {
  useEffect(() => {
    GetProjectList();
  }, []);

  const Navigate = useNavigate();
  const [InvoiceID, setInvoiceID] = useState(1);
  const [FilterData, setFilterData] = useState([]);
  const [Data, setData] = useState([]);
  const [Mes, setMes] = useState("");
  const [ProjectList, setProjectList] = useState([]);


  const GetProjectList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/ProjectList"
      );
      if (response.length < 1) {
        setMes(
          <p>
            No Project Found Kindly{" "}
            <Link to={"/services/project/create"}>Add Project</Link>
          </p>
        );
        handelOpenModelBox();
      } else {
        setFilterData(response);
        setData(response);
      }
    } catch (err) {
      setMes(err.message);
      handelOpenModelBox();
    }
  };

    const addInvoice = async (obj) => {
      try {
        const resp = await Fetchdata(
          "POST",
          "http://localhost:8080/addinvoice",
          { ...obj, InvoiceID }
        );
        setMes(resp.mes);
        handelOpenModelBox();
      } catch (err) {
        setMes(err.message);
        handelOpenModelBox();
      }
    };

  const handleProjects = (comp) => {
   
      const filterProjects = [...Data].filter((e) => e.Company === comp)
      setProjectList(filterProjects)
  }

  const handelOpenModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.showModal();
  };

  const handelCloseModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.close();
  };



  const AddInvoiceValues = {
    // InvoiceID: "",
    CompanyName: "",
    TotalPayment: "",
    ProjectName: "",
    PaymentDeadline: "",
    PaymentStatus: "",
    Date: "",
    Month: "",
  };

  const formik = useFormik({
    initialValues: AddInvoiceValues,
    validationSchema: InvoiceSchema,
    onSubmit: (values) => {
    //   console.log(values);
      addInvoice(values);
    },
  });
  return (
    <>
      <div className="head d-flex justify-content-between flex-wrap m-3">
        <div>
          <h3>Add Invoice</h3>
        </div>
        <div className="d-flex gap-2">
          <div>
            <button
              className="btn btn-primary rounded-0"
              onClick={() => Navigate("/services/payment/manage")}
            >
              Manage Payment
            </button>
          </div>
          <div>
            <button
              className="btn btn-warning rounded-0"
              onClick={() => Navigate("/services")}
            >
              Services
            </button>
          </div>
        </div>
      </div>
      <div className="conatainer m-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-lg border-0 rounded-0 m-3 p-4">
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
                      value={InvoiceID}
                      //   readOnly
                      onChange={(e) => setInvoiceID(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Company Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    {/* <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="CompanyName"
                      onChange={formik.handleChange}
                      value={formik.values.CompanyName}
                    /> */}

                    <select
                      name="CompanyName"
                      className="form-control shadow-sm"
                      onChange={(e) => {formik.handleChange(e); handleProjects(e.target.value)}}
                      value={formik.values.CompanyName}
                    >
                      <option className="dropdown-item" value=" ">
                        Select Company
                      </option>
                      {FilterData.map((ele) => {
                        return (
                          <>
                            <option
                              className="dropdown-item"
                              value={ele.Company}
                            >
                              {ele.Company}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  {formik.touched.CompanyName && formik.errors.CompanyName ? (
                    <div className="text-danger">
                      {formik.errors.CompanyName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Payment Status</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="PaymentStatus"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.PaymentStatus}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="Pending">
                        Pending
                      </option>
                      <option className="dropdown-item" value="Clear">
                        Clear
                      </option>
                    </select>
                  </div>
                  {formik.touched.PaymentStatus &&
                  formik.errors.PaymentStatus ? (
                    <div className="text-danger">
                      {formik.errors.PaymentStatus}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Payment Deadline</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="date"
                      name="PaymentDeadline"
                      onChange={formik.handleChange}
                      value={formik.values.PaymentDeadline}
                    />
                  </div>
                  {formik.touched.PaymentDeadline &&
                  formik.errors.PaymentDeadline ? (
                    <div className="text-danger">
                      {formik.errors.PaymentDeadline}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Register Month</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="month"
                      name="Month"
                      onChange={formik.handleChange}
                      value={formik.values.Month}
                    />
                  </div>
                  {formik.touched.Month && formik.errors.Month ? (
                    <div className="text-danger">{formik.errors.Month}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Total Payment</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="TotalPayment"
                      onChange={formik.handleChange}
                      value={formik.values.TotalPayment}
                    />
                  </div>
                  {formik.touched.TotalPayment && formik.errors.TotalPayment ? (
                    <div className="text-danger">
                      {formik.errors.TotalPayment}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Project</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="ProjectName"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.ProjectName}
                    >
                      <option className="dropdown-item" value=" ">
                        Select Project
                      </option>
                      {ProjectList.map((ele) => {
                        return (
                          <>
                            <option
                              className="dropdown-item"
                              value={ele.ProjectName}
                            >
                              {ele.ProjectName}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  {formik.touched.ProjectName && formik.errors.ProjectName ? (
                    <div className="text-danger">
                      {formik.errors.ProjectName}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="date"
                      name="Date"
                      onChange={formik.handleChange}
                      value={formik.values.Date}
                    />
                  </div>
                  {formik.touched.Date && formik.errors.Date ? (
                    <div className="text-danger">{formik.errors.Date}</div>
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
        <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
      </dialog>
    </>
  );
};

export default AddInvoice;
