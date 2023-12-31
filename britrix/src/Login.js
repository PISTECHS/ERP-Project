import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Fetchdata from "./Component/FetchData";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "./UserRoleContext";

const LoginPage = () => {
  const [Mes, setMes] = useState("");
  const Navigate = useNavigate();
  // const [userField, setuserField] = useState('')
  const { setUserRole } = useUserRole();
  
  


  const handleLogin = async (obj) => {
    setMes("");
    // console.log(obj);
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/userlogin",
        obj
      );
      // console.log(response);
      if (response.success === false) {
        setMes(response.mes);
        handleOpen();
      } else {
        // console.log(response.mes);
        setUserRole(obj.EmpEmail.split("@")[1].split(".")[0]);
        localStorage.setItem('brtrixUsername' , obj.EmpEmail)
        Navigate("/");
      }
    } catch (error) {
      setMes(error.message);
      handleOpen();
      console.log(error.message);
    }
  };

  const handleOpen = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.showModal();
  };

  const handleClose = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.close();
  };

  const LoginUserSchema = Yup.object({
    EmpEmail: Yup.string().email().required("Email is Required"),
    EmpPass: Yup.string().required("Password is Required"),
  });

  const LoginUserValues = {
    EmpEmail: "",
    EmpPass: "",
  };

  const formik = useFormik({
    initialValues: LoginUserValues,
    validationSchema: LoginUserSchema,
    onSubmit: (values) => {
      //   console.log(values);
      handleLogin(values);
    },
  });

  return (
    <>
      {/* <GETUserRole value={userField ? userField : 'Login'} /> */}
      <div className="px-4 py-5 px-md-5 px-sm-6 text-center text-lg-start">
        <form onSubmit={formik.handleSubmit}>
          <div className="container d-flex justify-content-center p-3">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card shadow-lg p-4 rounded-0">
                <h2 className="text-center">BitriX</h2>
                <h3 className="h3 text-center" style={{ color: "#379683" }}>
                  Dashboard Login
                </h3>
                <div className="card-body m-3">
                  <div className="form-outline mb-4">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      name="EmpEmail"
                      value={formik.values.EmpEmail}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.EmpEmail && formik.errors.EmpEmail ? (
                      <div className="text-danger">
                        {formik.errors.EmpEmail}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-sm"
                      name="EmpPass"
                      value={formik.values.EmpPass}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.EmpPass && formik.errors.EmpPass ? (
                      <div className="text-danger">{formik.errors.EmpPass}</div>
                    ) : null}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-danger btn-block mb-4 p-2 ps-3 pe-3 shadow-sm border-0 rounded-0"
                      style={{ backgroundColor: "#8EE4AF" }}
                    >
                      Sign up
                    </button>
                  </div>
                  <dialog
                    className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
                    id="dialog"
                  >
                    <div className="modal-content ">
                      <div className="text-center">
                        <div>
                          <h5 className="h5">{Mes}</h5>
                        </div>
                        <div>
                          <button
                            className="btn btn-danger rounded-0"
                            onClick={handleClose}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
