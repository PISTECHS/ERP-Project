import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { RegisterTaskSchema } from "../ValidationSchemas";
import Fetchdata from "../../Component/FetchData";
import { useNavigate, useLocation } from "react-router-dom";
import BoxModel from "../../Component/ComponentElement/BoxModel";



function RegisterTask() {
  useEffect(() => {
    MainRun();
  }, []);

  const [Mes, setMes] = useState("");
  const Navigate = useNavigate();
  const Location = useLocation();


  const [ProjectList, setProjectList] = useState([]);
  const [UserList, setUserList] = useState([]);

  const MainRun = async () => {
    await TaskUsers();
    setProjectList(Location.state.Obj);
  };

  const TaskUsers = async () => {
    setMes("");
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/TaskUsers",
        { Field: Location.state.ProjectField }
      );
      // console.log(response);
      setUserList(response);
    } catch (error) {
      setMes(error.message);
      handelOpenModelBox()
    }
  };

  const AddTask = async (obj) => {
    // console.log(obj);
    setMes("");
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/RegisterTask",
        obj
      );
      setMes(response.mes);
      handelOpenModelBox()
    } catch (error) {
      setMes(error.message);
      handelOpenModelBox()
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

  

  const RegisterTaskValues = {
    TaskID: "",
    TaskName: "",
    // TaskField: "",
    TaskField: Location.state.ProjectField,
    TaskDuration: "",
    TaskAllocation: "",
    StartDate: "",
    EndDate: "",
    Progress: "",
    ProjectName: "",
    Type: "",
    Summary: "",
    Priority: "",
    Month: "",
  };

  const formik = useFormik({
    initialValues: RegisterTaskValues,
    validationSchema: RegisterTaskSchema,
    onSubmit: (values) => {
      // console.log(values);
      AddTask(values);
    },
  });
  return (
    <>
      
      <div className="conatainer m-4">
      <dialog className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm" id="dialog">
           <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
       </dialog>
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-lg rounded-0 m-3 p-4">
            <div className=" d-flex flex-wrap col-12 m-3 justify-content-between">
              <div>
                {" "}
                <h4 className="h4">Register Task</h4>
              </div>
              <div>
                <button
                  className="btn btn-danger rounded-0"
                  onClick={() => Navigate("/services/task/view")}
                >
                  Task List
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
                    <select
                      name="ProjectName"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.ProjectName}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
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
                    <h6 className="h6 mt-2">ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="TaskID"
                      onChange={formik.handleChange}
                      value={formik.values.TaskID}
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
                    <h6 className="h6 mt-2">Task Type</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="Type"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.Type}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="Bug">
                        Bug
                      </option>
                      <option className="dropdown-item" value="Task">
                        Task
                      </option>
                      <option className="dropdown-item" value="Epic">
                        Epic
                      </option>
                    </select>
                  </div>
                  {formik.touched.Type && formik.errors.Type ? (
                    <div className="text-danger">{formik.errors.Type}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Task Duration</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="TaskDuration"
                      placeholder="3 Month"
                      onChange={formik.handleChange}
                      value={formik.values.TaskDuration}
                    />
                  </div>
                  {formik.touched.TaskDuration && formik.errors.TaskDuration ? (
                    <div className="text-danger">
                      {formik.errors.TaskDuration}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Task Allocation</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="TaskAllocation"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.TaskAllocation}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      {UserList.map((key) => {
                        return (
                          <>
                            <option
                              className="dropdown-item"
                              value={key.Username}
                            >
                              {key.Name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  {formik.touched.TaskAllocation &&
                  formik.errors.TaskAllocation ? (
                    <div className="text-danger">
                      {formik.errors.TaskAllocation}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Start Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="Date"
                      name="StartDate"
                      onChange={formik.handleChange}
                      value={formik.values.StartDate}
                    />
                  </div>
                  {formik.touched.StartDate && formik.errors.StartDate ? (
                    <div className="text-danger">{formik.errors.StartDate}</div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">End Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="Date"
                      name="EndDate"
                      onChange={formik.handleChange}
                      value={formik.values.EndDate}
                    />
                  </div>
                  {formik.touched.EndDate && formik.errors.EndDate ? (
                    <div className="text-danger">{formik.errors.EndDate}</div>
                  ) : null}
                </div>

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
              </div>

              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Priority</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="Priority"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.Priority}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="High">
                        High
                      </option>
                      <option className="dropdown-item" value="Medium">
                        Medium
                      </option>
                      <option className="dropdown-item" value="Low">
                        Low
                      </option>
                    </select>
                  </div>
                  {formik.touched.Priority && formik.errors.Priority ? (
                    <div className="text-danger">{formik.errors.Priority}</div>
                  ) : null}
                </div>

                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Month</h6>
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

                <div className="col-12 col-lg-12 mt-2 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Summary</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <textarea
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="Summary"
                      onChange={formik.handleChange}
                      value={formik.values.Summary}
                    />
                  </div>
                  {formik.touched.Summary && formik.errors.Summary ? (
                    <div className="text-danger">{formik.errors.Summary}</div>
                  ) : null}
                </div>
              </div>

              <div className="m-5 text-center">
                {Mes && <div className="border shadow-sm d-flex justify-content-center gap-3 p-3 mb-3" style={{backgroundColor: 'lightblue'}}>
                  <div> <h6 className="">{Mes}</h6> </div>
                 
                  <div><button
                  className="btn btn-danger rounded-0"
                  onClick={() => Navigate("/services/task/view")}
                >
                  Task List
                </button></div>
                  <div><button className="btn btn-info border-0 shadow-sm rounded-0"
                   onClick={() => Navigate("/services/task")}
                  
                  >Task Manager</button></div>
               
                </div>}
                <button
                  className="btn btn-primary border-0 shadow-sm rounded-0"
                  type="submit"
                >
                  Add New Task
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterTask;
