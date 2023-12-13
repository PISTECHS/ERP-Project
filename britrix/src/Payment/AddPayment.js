import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { PaymentSchema } from "../TaskManagement/ValidationSchemas";
import Fetchdata from "../Component/FetchData";
import BoxModel, {handelOpenModelBox, handelCloseModelBox} from "../Component/ComponentElement/BoxModel";

const AddPayment = () => {
  useEffect(() => {
    LastPaymentID();
  }, []);

  const Navigate = useNavigate();
  const [PaymentID, setPaymentID] = useState();
  const [Mes, setMes] = useState("");
  const location = useLocation();
  const Data = location.state;

  const OpenBox = (value) => {
    setMes("");
      setMes(value);
      handelOpenModelBox("dialog");
  };

  const InsertPayment = async (obj) => {
    try {
      const resp = await Fetchdata("POST", "http://localhost:8080/addpayment", {
        ...obj,
        PaymentID,
      });
      OpenBox(resp.mes)
    } catch (err) {
      OpenBox(err.message)
    }
  };

  const LastPaymentID = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/getlastpaymentid"
      );
      if (response.length > 0) {
        setPaymentID(response[0].PaymentID + 1);
      } else {
        setPaymentID(response.length + 1);
      }
    } catch (err) {
      OpenBox(err.message)
    }
  };

  const AddPaymentValues = {
    InvoiceID: Data.InvoiceID,
    // PaymentID : "",
    PaymentAmmount: "",
    AcceptedBy: "",
    PaymentType: "",
    Date: "",
    Month: "",
    Company: Data.CompanyName,
  };

  const formik = useFormik({
    initialValues: AddPaymentValues,
    validationSchema: PaymentSchema,
    onSubmit: (values) => {
      // console.log(values);
      InsertPayment(values);
    },
  });
  return (
    <>
      <div className="head d-flex justify-content-between flex-wrap m-3">
        <div>
          <h3>Add Payment</h3>
        </div>
        <div className="d-flex gap-2">
          <div>
            <button
              className="btn btn-primary rounded-0"
              onClick={() => Navigate("/services/payment/manage")}
            >
              View Invoices
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
                    <h6 className="h6 mt-2">Invoice ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="InvoiceID"
                      onChange={formik.handleChange}
                      value={formik.values.InvoiceID}
                      readOnly
                    />
                  </div>
                  {formik.touched.InvoiceID && formik.errors.InvoiceID ? (
                    <div className="text-danger">{formik.errors.InvoiceID}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Payment ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      value={PaymentID}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Payment Type</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="PaymentType"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.PaymentType}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="Cheque">
                        Cheque
                      </option>
                      <option className="dropdown-item" value="Cash">
                        Cash
                      </option>
                    </select>
                  </div>
                  {formik.touched.PaymentType && formik.errors.PaymentType ? (
                    <div className="text-danger">
                      {formik.errors.PaymentType}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Ammount</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="PaymentAmmount"
                      onChange={formik.handleChange}
                      value={formik.values.PaymentAmmount}
                    />
                  </div>
                  {formik.touched.PaymentAmmount &&
                  formik.errors.PaymentAmmount ? (
                    <div className="text-danger">
                      {formik.errors.PaymentAmmount}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Date :</h6>
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
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Month :</h6>
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
              </div>

              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Accepted By</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="AcceptedBy"
                      onChange={formik.handleChange}
                      value={formik.values.AcceptedBy}
                    />
                  </div>
                  {formik.touched.AcceptedBy && formik.errors.AcceptedBy ? (
                    <div className="text-danger">
                      {formik.errors.AcceptedBy}
                    </div>
                  ) : null}
                </div>

                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Company Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="Company"
                      onChange={formik.handleChange}
                      value={formik.values.Company}
                      readOnly
                    />
                  </div>
                  {formik.touched.Company && formik.errors.Company ? (
                    <div className="text-danger">{formik.errors.Company}</div>
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
        <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
      </dialog>
    </>
  );
};

export default AddPayment;
