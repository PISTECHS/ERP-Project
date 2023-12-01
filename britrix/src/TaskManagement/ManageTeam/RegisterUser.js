import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { RegisterUserSchema } from "../ValidationSchemas";
import Fetchdata from "../../Component/FetchData";
import { useNavigate } from "react-router-dom";
import BoxModel from "../../Component/ComponentElement/BoxModel";

function RegisterUser() {
  const [Mes, setMes] = useState("");
  const [UserID, setUserID] = useState("E00");
  const [FieldList, setFieldList] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    runProject();
  }, []);

  const runProject = async () => {
    await LastUserID();
    await GetFieldList();
  };
  const GetFieldList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/FieldList"
      );
      //   console.log(response);
      if (response.length < 1) {
        setMes("No Record Found");
      } else {
        setFieldList(response);
        // console.log(response);
      }
    } catch (err) {
      setMes(err.message);
    }
  };

  const LastUserID = async () => {
    setMes("");
    try {
      const resp = await Fetchdata(
        "GET",
        "http://localhost:8080/GEtLastUserID"
      );
      // console.log(resp.length);
      if (resp.length > 0) {
        setUserID(resp[0].ID + 1);
      } else {
        setUserID(resp.length + 1);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const AddUser = async (obj) => {
    setMes("");
    let OBJ = { ...obj, EmpID: UserID };
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/registeruser",
        OBJ
      );
      setMes(response.mes);
      handelOpenModelBox();
    } catch (error) {
      setMes(error.message);
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
    EmpName: "",
    // EmpID: UserID,
    EmpType: "",
    EmpField: "",
    EmpEmail: "",
    EmpContactNo: "",
    EmpPosition: "",
    EmpStatus: "",
  };

  const formik = useFormik({
    initialValues: RegisterUserValues,
    validationSchema: RegisterUserSchema,
    onSubmit: (values) => {
      // console.log(values);
      AddUser(values);
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
              <h4 className="h4">Register User</h4>
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
                      // onChange={formik.handleChange}
                      // value={formik.values.EmpID}
                      value={UserID}
                      readOnly
                    />
                  </div>
                  {/* {formik.touched.EmpID && formik.errors.EmpID ? (
                    <div className="text-danger">{formik.errors.EmpID}</div>
                  ) : null} */}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Field</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="EmpField"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.EmpField}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      {FieldList.map((ele) => {
                        return (
                          <>
                            <option
                              className="dropdown-item"
                              value={ele.FieldName}
                            >
                              {ele.FieldName}
                            </option>
                          </>
                        );
                      })}
                    </select>
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
                        Designer
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
                {Mes && (
                  <div
                    className="border shadow-sm d-flex justify-content-center gap-3 p-3 mb-3"
                    style={{ backgroundColor: "lightblue" }}
                  >
                    <div>
                      {" "}
                      <h6 className="">{Mes}</h6>{" "}
                    </div>

                    <div>
                      <button
                        className="btn btn-danger rounded-0"
                        onClick={() => Navigate("/services/task/team/list")}
                      >
                        User List
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-info border-0 shadow-sm rounded-0"
                        onClick={() => Navigate("/services/task")}
                      >
                        Task Manager
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-primary border-0 shadow-sm rounded-0"
                  type="submit"
                >
                  Add New Record
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterUser;
