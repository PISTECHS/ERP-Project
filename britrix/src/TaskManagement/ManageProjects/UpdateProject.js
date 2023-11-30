import React, {useState, useEffect} from "react";
import { useFormik } from "formik";
import { RegisterProjectSchema } from "../ValidationSchemas";
import { useNavigate, useLocation } from "react-router-dom";
import Fetchdata from "../../Component/FetchData";
function UpdateProject() {
  
  const [Mes, setMes] = useState('')
  const Navigate = useNavigate()
  const location= useLocation()


  const UpdateData = async(obj) => {
    // console.log(obj);
     setMes('')
     try{
      let response = await Fetchdata("post", "http://localhost:8080/UpdateProject", obj)
      console.log(response);
       setMes(response.mes)
     }
     catch(err){
      console.log(err.message);
     }
  }

   
  const RegisterProjectValues = {
    // ProjectID: '',
    ...location.state
  };

  const formik = useFormik({
    initialValues: RegisterProjectValues,
    validationSchema: RegisterProjectSchema,
    onSubmit: (values) => {
    //   console.log(values);
      UpdateData(values)
    },
  });
  return (
    <>
      <div className="conatainer m-4">
        <form onSubmit={formik.handleSubmit}>
          <div
            className="card shadow-lg rounded-0 m-3 p-4"  
          >
            <div className=" d-flex flex-wrap col-12 m-3 justify-content-between">
              <div><h4 className="h4">Update Project</h4></div>
              <div><button className="btn btn-warning rounded-0 shadow-sm" onClick={() => Navigate('/services/project/list')}>Project List</button></div>
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
                      name="ProjectName"
                      onChange={formik.handleChange}
                      value={formik.values.ProjectName}
                    
                    />
                  </div>
                  {formik.touched.ProjectName && formik.errors.ProjectName ? (
                    <div className="text-danger">{formik.errors.ProjectName}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Field</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="ProjectField"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.ProjectField}
                      
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="SEO">
                        SEO
                      </option>
                      <option className="dropdown-item" value="Mern">
                        Mern
                      </option>
                      <option className="dropdown-item" value="WordPress">
                        WordPress
                      </option>
                      <option className="dropdown-item" value="internship">
                        Graphic
                      </option>
                    </select>
                  </div>
                  {formik.touched.ProjectField && formik.errors.ProjectField ? (
                    <div className="text-danger">{formik.errors.ProjectField}</div>
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
                      name="ID"
                      onChange={formik.handleChange}
                      value={formik.values.ID}
                      readOnly
                    />
                  </div>
                  {/* {formik.touched.EmpID && formik.errors.EmpID ? (
                    <div className="text-danger">{formik.errors.EmpID}</div>
                  ) : null} */}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Duration</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="ProjectDuration"
                      placeholder="2 Month"
                      onChange={formik.handleChange}
                      value={formik.values.ProjectDuration}
                    />
                  </div>
                  {formik.touched.ProjectDuration && formik.errors.ProjectDuration ? (
                    <div className="text-danger">
                      {formik.errors.ProjectDuration}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Start Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="date"
                      name="StartDate"
                      onChange={formik.handleChange}
                      value={formik.values.StartDate}
                    />
                  </div>
                  {formik.touched.StartDate && formik.errors.StartDate ? (
                    <div className="text-danger">{formik.errors.StartDate}</div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">End Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="date"
                      name="EndDate"
                      onChange={formik.handleChange}
                      value={formik.values.EndDate}
                    />
                  </div>
                  {formik.touched.EndDate && formik.errors.EndDate ? (
                    <div className="text-danger">{formik.errors.EndDate}</div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
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

                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Status</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                  <select
                      name="ProjectStatus"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.ProjectStatus}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="Pending">
                        Pending
                      </option>
                      <option className="dropdown-item" value="In-Progress">
                        In Progress
                      </option>
                      <option className="dropdown-item" value="Complete">
                        Complete
                      </option>
                      <option className="dropdown-item" value="Block">
                        Block
                      </option>
                    </select>
                  </div>
                  {formik.touched.ProjectStatus && formik.errors.ProjectStatus ? (
                    <div className="text-danger">{formik.errors.ProjectStatus}</div>
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
                    <h6 className="h6 mt-2">Company</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                  <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="Company"
                      onChange={formik.handleChange}
                      value={formik.values.Company}
                    />
                  </div>
                  {formik.touched.Company && formik.errors.Company ? (
                    <div className="text-danger">{formik.errors.Company}</div>
                  ) : null}
                </div>
                
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
              <div className="col-12 d-flex flex-wrap mt-1">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Summary</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                  <textarea
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="ProjectSummary"
                      onChange={formik.handleChange}
                      value={formik.values.ProjectSummary}
                    />
                  </div>
                  {formik.touched.ProjectSummary && formik.errors.ProjectSummary ? (
                    <div className="text-danger">{formik.errors.ProjectSummary}</div>
                  ) : null}
                </div>
                </div>
              <div className="m-5 text-center">
              {Mes && <div className="border shadow-sm d-flex justify-content-center gap-3 p-3 mb-3" style={{backgroundColor: 'lightblue'}}>
                  <div> <h6 className="">{Mes}</h6> </div>
                 
                  <div><button
                  className="btn btn-danger rounded-0"
                  onClick={() => Navigate("/services/project/list")}
                >
                  Project List
                </button></div>
                  <div><button className="btn btn-info border-0 shadow-sm rounded-0"
                   onClick={() => Navigate("/services/task")}
                  
                  >Task Manager</button></div>
               
                </div>}
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
}

export default UpdateProject;
