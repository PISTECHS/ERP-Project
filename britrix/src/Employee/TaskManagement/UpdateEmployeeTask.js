import React, { useState } from 'react'
import { RegisterTaskSchema } from '../../TaskManagement/ValidationSchemas'
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import BoxModel from '../../Component/ComponentElement/BoxModel';
import Fetchdata from '../../Component/FetchData';


const UpdateEmployeeTask = () => {
   
  
  const location = useLocation()
  const Data = location.state; 
  const [Mes, setMes]= useState('')
  const Navigate = useNavigate()


  const UpdateTaskData = async (obj) => {
    setMes("");
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/UpdateTaskRecord",
        obj
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
  }

  const handelCloseModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.close();
  }


  const formik = useFormik({
    initialValues: {...Data},
    validationSchema: RegisterTaskSchema,
    onSubmit: (values) => {
    // console.log(values);
      UpdateTaskData(values);
    },
  });
  return (
    <>
          <dialog
          className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
          id="dialog"
        >
          <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
        </dialog>
          <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-lg rounded-0 m-3 p-4">
            <div className=" d-flex flex-wrap col-12 m-3 justify-content-between">
              <div>
                {" "}
                <h4 className="h4">Update Task Progress</h4>
              </div>
              <div>
                <button
                  className="btn btn-danger rounded-0"
                  onClick={() => Navigate("/manage")}
                >
                  Your Tasks
                </button>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Task Field</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      name="TaskField"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.TaskField}
                      readOnly={true}
                    />
                  </div>
                  {formik.touched.TaskField && formik.errors.TaskField ? (
                    <div className="text-danger">{formik.errors.TaskField}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Project Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      name="ProjectName"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.ProjectName}
                      readOnly
                    />
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
                    <h6 className="h6 mt-2">ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="TaskID"
                      onChange={formik.handleChange}
                      value={formik.values.TaskID}
                      readOnly
                    />
                  </div>
                  {formik.touched.TaskID && formik.errors.TaskID ? (
                    <div className="text-danger">{formik.errors.TaskID}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Task Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="TaskName"
                      onChange={formik.handleChange}
                      value={formik.values.TaskName}
                      readOnly
                    />
                  </div>

                  {formik.touched.TaskName && formik.errors.TaskName ? (
                    <div className="text-danger">{formik.errors.TaskName}</div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
              <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Progress</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="Progress"
                      onChange={formik.handleChange}
                      value={formik.values.Progress}
                    />
                  </div>
                  {formik.touched.Progress && formik.errors.Progress ? (
                    <div className="text-danger">{formik.errors.Progress}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Status</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      name="TaskStatus"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.TaskStatus}
                      readOnly
                    />
                  </div>
                  {formik.touched.TaskStatus && formik.errors.TaskStatus ? (
                    <div className="text-danger">{formik.errors.TaskStatus}</div>
                  ) : null}
                </div>
               
              </div>
              
              <div className="m-3 text-center">
                
                <button
                  className="btn btn-primary border-0 shadow-sm rounded-0"
                  type="submit"
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </form>
    </>
  )
}

export default UpdateEmployeeTask