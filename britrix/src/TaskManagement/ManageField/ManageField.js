import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Fetchdata from "../../Component/FetchData";
import { useNavigate } from "react-router-dom";
import { RegisterFieldSchema } from "../ValidationSchemas";

function ManageField() {
  useEffect(() => {
    runFunction()
  }, []);

  const [Data, setData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [Mes, setMes] = useState("");
  const Navigate = useNavigate();
  const [ID, setID] = useState('0')


  const runFunction = async() => {
    await GetFieldList();
    await LastID();
  }
  const LastID = async() => {
    setMes('')
    try{
     const resp = await Fetchdata('GET',"http://localhost:8080/GetLastFieldID")
     // console.log(resp.length);
     if(resp.length>0){
       setID(resp[0].ID + 1)
     }else{
       setID(resp.length + 1)
     } 
    }
    catch(err){
     console.log(err.message)
    }
 }

  const GetFieldList = async () => {
    try {
      const response = await Fetchdata("GET", "http://localhost:8080/FieldList");
    //   console.log(response);
      if(response.length<1){
        setMes('No Record Found')
      }else{
        setData(response)
        // console.log(response);
      }
    } catch (err) {
      setMes(err.message)
    }
  };

  const handleDeleteField = async (ID) => {
    
    setMes('')
    try {
      const response = await Fetchdata("post", "http://localhost:8080/DeleteField", {ID});
       setMes(response.mes)
       runFunction()
    } catch (error) {
      setMes(error.message)
    }
    
  };

  const handleAddField = async (obj) => {
    // console.log({...obj,ID});
    setMes('')
    try {
      const response = await Fetchdata("post", "http://localhost:8080/AddField", {...obj,ID});
       setMes(response.mes)
       runFunction()
    } catch (error) {
      setMes(error.message)
    }
  };

  const RegisterFieldValues = {
    FieldName: '',
  };

  const formik = useFormik({
    initialValues: RegisterFieldValues,
    validationSchema: RegisterFieldSchema,
    onSubmit: (values) => {
    //   console.log(values);
    handleAddField(values)
    },
  });
  return (
    <>
      <div className="main m-2 text-center">
        <h2 className="h2" style={{ color: "rgb(92, 219, 159)" }}>
          Manage Field
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
      <div className="d-flex flex-wrap justify-content-center text-center">
      
        <div className="me-2">
          <h6 className="h6 mt-2">Name</h6>
        </div>
        <div className="col-lg-5">
          <input
            name="FieldName"
            className="form-control shadow-sm"
            onChange={formik.handleChange}
            value={formik.values.FieldName}
          />
        </div>
        <div className="ms-2">
        <button
                  className="btn btn-primary border-0 shadow-sm rounded-0"
                  type="submit"
                >
                  Add Field
                </button>
        </div>
        {formik.touched.FieldName && formik.errors.FieldName ? (
          <div className="text-danger">{formik.errors.FieldName}</div>
        ) : null}
       
      </div>
      {Mes && <div className="text-center border-2 p-2 rounded-0">{Mes}</div>}
      </form>

      {/* Task List */}
      <div className="d-flex">
        <table className="table shadow-sm  table-bordered m-3">
          <thead className="table-light text-center " key={"thead"}>
            <tr className="mb-2">
              <th scope="col">
                <h6 className="h6">ID</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Name</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Option</h6>
              </th>
            </tr>
          </thead>
          <tbody className="border-dark text-center " key={"tbody"}>
            {Data &&
              Data.map((ele, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{ele.ID}</td>
                      <td>{ele.FieldName}</td>
                      <td>
                        <div className="m-1 p-0">
                          <button
                            className="btn btn-outline-danger m-1 p-1 rounded-0"
                            onClick={() => handleDeleteField(ele.ID)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
     
    </>
  );
}

export default ManageField;
