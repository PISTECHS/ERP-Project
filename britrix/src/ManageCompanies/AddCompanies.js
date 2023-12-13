import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { CompanySchema } from "../TaskManagement/ValidationSchemas";
import Fetchdata from "../Component/FetchData";
import BoxModel, {
  handelCloseModelBox,
  handelOpenModelBox,
} from "../Component/ComponentElement/BoxModel";

const AddCompanies = () => {
  
  useEffect(() => {
    GetCompanyID();
  }, []);

  const Navigate = useNavigate();
  const [CompanyID, setCompanyID] = useState(0);
  const [Mes, setMes] = useState("");

  const OpenBox = (value) => {
    setMes("");
    if (typeof value === "string") {
      setMes(value);
      handelOpenModelBox("dialog");
    }
  };

  const GetCompanyID = async () => {
    try {
      const resp = await Fetchdata(
        "GET",
        "http://localhost:8080/GetLastCompanyID"
      );
      if (resp.length > 0) {
        setCompanyID(resp[0].CompanyID + 1);
      } else {
        setCompanyID(resp.length + 1);
      }
    } catch (err) {
      OpenBox(err.message);
    }
  };

  const addComapny = async (obj) => {
    try {
      const resp = await Fetchdata(
        "POST",
        "http://localhost:8080/registercomapny",
        { ...obj, CompanyID }
      );
      OpenBox(resp.mes);
    } catch (err) {
      OpenBox(err.message);
    }
  };

  const AddCompanyValues = {
    CompanyName: "",
    CompanyType: "",
    CompanyPhno: "",
    CompanyEmail: "",
    CompanyMonth: "",
    CompanyLocation: "",
  };

  const formik = useFormik({
    initialValues: AddCompanyValues,
    validationSchema: CompanySchema,
    onSubmit: (values) => {
      //   console.log(values);
      addComapny(values);
    },
  });
  return (
    <>
      <dialog
        className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
        id="dialog"
      >
        <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
      </dialog>
      <div className="head d-flex justify-content-between flex-wrap m-3">
        <div>
          <h3>Add Company</h3>
        </div>
        <div className="d-flex gap-2">
          <div>
            <button
              className="btn btn-primary rounded-0"
              onClick={() => Navigate("/services/companies/view")}
            >
              Companies List
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
                      value={CompanyID}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Company Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="CompanyName"
                      onChange={formik.handleChange}
                      value={formik.values.CompanyName}
                    />
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
                    <h6 className="h6 mt-2">CompanyType Type</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="CompanyType"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.CompanyType}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="Local">
                        Local
                      </option>
                      <option className="dropdown-item" value="Foreigner">
                        Foreigner
                      </option>
                    </select>
                  </div>
                  {formik.touched.CompanyType && formik.errors.CompanyType ? (
                    <div className="text-danger">
                      {formik.errors.CompanyType}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Comapny Email</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="CompanyEmail"
                      onChange={formik.handleChange}
                      value={formik.values.CompanyEmail}
                    />
                  </div>
                  {formik.touched.CompanyEmail && formik.errors.CompanyEmail ? (
                    <div className="text-danger">
                      {formik.errors.CompanyEmail}
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
                      name="CompanyMonth"
                      onChange={formik.handleChange}
                      value={formik.values.CompanyMonth}
                    />
                  </div>
                  {formik.touched.CompanyMonth && formik.errors.CompanyMonth ? (
                    <div className="text-danger">
                      {formik.errors.CompanyMonth}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Company Phno</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="CompanyPhno"
                      onChange={formik.handleChange}
                      value={formik.values.CompanyPhno}
                    />
                  </div>
                  {formik.touched.CompanyPhno && formik.errors.CompanyPhno ? (
                    <div className="text-danger">
                      {formik.errors.CompanyPhno}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Company Location</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <textarea
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="CompanyLocation"
                      onChange={formik.handleChange}
                      value={formik.values.CompanyLocation}
                    />
                  </div>
                  {formik.touched.CompanyLocation &&
                  formik.errors.CompanyLocation ? (
                    <div className="text-danger">
                      {formik.errors.CompanyLocation}
                    </div>
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
    </>
  );
};

export default AddCompanies;
