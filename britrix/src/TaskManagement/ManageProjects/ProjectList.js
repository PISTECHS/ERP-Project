import React, { useEffect, useState } from 'react'
import Fetchdata from "../../Component/FetchData";
import { useNavigate } from 'react-router-dom'
import LoadingSticks from '../../Component/ComponentElement/LoadingSticks';

function ProjectList() {
  
  useEffect(() => {
    GetProjectList()
  }, [])

  const [Data, setData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [Mes, setMes] = useState('')
  const [CardDisplay, setCardDisplay] = useState('flex')
  const Navigate = useNavigate();



  const GetProjectList = async () => {
    try {
      const response = await Fetchdata("GET", "http://localhost:8080/ProjectList");
    //   console.log(response);
      if(response.length<1){
        setCardDisplay('none')
        setMes('No Record Found')
      }else{
        setCardDisplay('none')
        setData(response)
        // console.log(response);
      }
    } catch (err) {
      setCardDisplay('none')
      setMes(err.message)
    }
  };

  const handleDeleteTask = async (ID) => {
    setMes('')
    try {
      const response = await Fetchdata("post", "http://localhost:8080/DeleteProject", {ID});
       setMes(response.mes)
    } catch (error) {
      setMes(error.message)
    }
  }



  return (
    <>
       <div className="main m-2">
       <div className="text-center"> 
       <h2 className="h2" style={{color: 'rgb(92, 219, 159)'}}>Manage Project</h2>
       <button className="btn btn-info border-0 rounded-0" style={{backgroundColor: 'rgb(92, 219, 159)', color:'white'}} onClick={() => Navigate('/services/project/create')}>Create Project</button></div>
       </div>
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
                  <h6 className="h6">Field</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Duration</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Status</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Start Date</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">End Date</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Progress</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Company</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Month</h6>
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
                    <th>{ele.ID}</th>
                      <td>{ele.ProjectName}</td>
                      <td>{ele.ProjectField}</td>
                      <td>{ele.ProjectDuration}</td>
                      <td>{ele.ProjectStatus}</td>
                      <td>{ele.StartDate}</td>
                      <td>{ele.EndDate}</td>
                      <td>{ele.Progress}%</td>
                      <td>{ele.Company}</td>
                      <td>{ele.Month}</td>
                      <td><div className="m-1 p-0"><button className="btn btn-outline-danger m-1 p-1 rounded-0"
                      onClick={() => handleDeleteTask(ele.ID)}
                      >Delete</button><button className="btn btn-outline-primary p-1 m-1 rounded-0"
                      onClick={() =>  Navigate("/services/project/update", { state: ele })}
                      >Update</button></div>
                      </td> 
                      </tr>
                    </>
                  );
                })}
                <div className={`d-${CardDisplay} placeholder-glow m-5 justify-content-center`}><LoadingSticks /></div>
            </tbody>
          </table>
       </div>
       {Mes && <div className="text-center border-2 p-2 rounded-0">{Mes}</div>}
    </>
  )
}

export default ProjectList