import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterUserSchema } from "../ValidationSchemas";
import { useFormik } from "formik";
import Fetchdata from "../../Component/FetchData";
import BoxModel from "../../Component/ComponentElement/BoxModel";

const UpdateUser = () => {
  const [Mes, setMes] = useState("");
  const location = useLocation();
  const Navigate = useNavigate();

  const UpdateUserData = async (obj) => {
    const OBJECT = {
      ContactNo: obj.EmpContactNo,
      Email: obj.EmpEmail,
      Field: obj.EmpField,
      ID: obj.EmpID,
      Name: obj.EmpName,
      Role: obj.EmpPosition,
      Status: obj.EmpStatus,
      Type: obj.EmpType,
      Username: obj.EmpUsername,
    };

    setMes("");
    try {
      let response = await Fetchdata(
        "post",
        "http://localhost:8080/updaterecord",
        OBJECT
      );
      console.log(response);
      setMes(response.mes);
      handelOpenModelBox();
      Navigate("/services/task/team/list");
    } catch (err) {
      setMes(err.message);
      handelOpenModelBox();
    }
  };

  const handelOpenModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.showModal();
  };

  const handelCloseModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.close();
  };

  const RegisterUserValues = {
    EmpName: location.state.Name,
    EmpID: location.state.ID,
    EmpType: location.state.Type,
    EmpField: location.state.Field,
    EmpEmail: location.state.Email,
    EmpContactNo: location.state.ContactNo,
    EmpPosition: location.state.Role,
    EmpStatus: location.state.Status,
    EmpUsername: location.state.Username,
  };

  const formik = useFormik({
    initialValues: RegisterUserValues,
    validationSchema: RegisterUserSchema,
    onSubmit: (values) => {
      // console.log(values);
      UpdateUserData(values);
    },
  });
  return (
    <>
      <div className="conatainer m-4">
        <dialog
          className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
          id="dialog"
        >
          <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
        </dialog>
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-lg rounded-0 m-3 p-4">
            <div className="row d-flex flex-wrap col-12 m-3">
              <h4 className="h4">Update User</h4>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="EmpName"
                      onChange={formik.handleChange}
                      value={formik.values.EmpName}
                    />
                  </div>
                  {formik.touched.EmpName && formik.errors.EmpName ? (
                    <div className="text-danger">{formik.errors.EmpName}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Type</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="EmpType"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.EmpType}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="hired">
                        Hired Employee
                      </option>
                      <option className="dropdown-item" value="internship">
                        Intern Employee
                      </option>
                    </select>
                  </div>

                  {formik.touched.EmpType && formik.errors.EmpType ? (
                    <div className="text-danger">{formik.errors.EmpType}</div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="EmpID"
                      onChange={formik.handleChange}
                      value={formik.values.EmpID}
                      readOnly
                    />
                  </div>
                  {formik.touched.EmpID && formik.errors.EmpID ? (
                    <div className="text-danger">{formik.errors.EmpID}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Field</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="EmpField"
                      onChange={formik.handleChange}
                      value={formik.values.EmpField}
                    />
                  </div>
                  {formik.touched.EmpField && formik.errors.EmpField ? (
                    <div className="text-danger">{formik.errors.EmpField}</div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Email</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="EmpEmail"
                      onChange={formik.handleChange}
                      value={formik.values.EmpEmail}
                    />
                  </div>
                  {formik.touched.EmpEmail && formik.errors.EmpEmail ? (
                    <div className="text-danger">{formik.errors.EmpEmail}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Contact</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="EmpContactNo"
                      onChange={formik.handleChange}
                      value={formik.values.EmpContactNo}
                    />
                  </div>
                  {formik.touched.EmpContactNo && formik.errors.EmpContactNo ? (
                    <div className="text-danger">
                      {formik.errors.EmpContactNo}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Position</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="EmpPosition"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.EmpPosition}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="Developer">
                        Developer
                      </option>
                      <option className="dropdown-item" value="GraphicDesigner">
                        Graphic Designer
                      </option>
                      <option className="dropdown-item" value="HR">
                        HR
                      </option>
                      <option className="dropdown-item" value="Manager">
                        Manager
                      </option>
                    </select>
                  </div>
                  {formik.touched.EmpPosition && formik.errors.EmpPosition ? (
                    <div className="text-danger">
                      {formik.errors.EmpPosition}
                    </div>
                  ) : null}
                </div>

                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Status</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="EmpStatus"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.EmpStatus}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="Active">
                        Active
                      </option>
                      <option className="dropdown-item" value="DeActive">
                        DeActive
                      </option>
                    </select>
                  </div>
                  {formik.touched.EmpStatus && formik.errors.EmpStatus ? (
                    <div className="text-danger">{formik.errors.EmpStatus}</div>
                  ) : null}
                </div>
              </div>
              <div className="m-5 text-center">
                <button
                  className="btn btn-primary border-0 shadow-sm rounded-0"
                  type="submit"
                >
                  Update Record
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
