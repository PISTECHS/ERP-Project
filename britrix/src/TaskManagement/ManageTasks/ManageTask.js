import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetchdata from "../../Component/FetchData";
import LoadingSticks from "../../Component/ComponentElement/LoadingSticks";
import BoxModel from "../../Component/ComponentElement/BoxModel";

const ManageTask = () => {
  useEffect(() => {
    TaskProjectlist();
  }, []);

  const Navigate = useNavigate();
  const [Mes, setMes] = useState("");
  const [TaskField, setTaskField] = useState([])
  const [CardDisplay, setCardDisplay] = useState('flex')
  const [ProjectList, setProjectList] = useState([]);

  const TaskProjectlist = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/TaskProjectlist"
      );
      //   console.log(response);
      if (response.length < 1) {
        setCardDisplay('none')
        setMes("No Record Found");
        handelOpenModelBox()
      } else {
        setProjectList(response);
        // setfilterProjects(response);
        // console.log(response);
        setCardDisplay('none')   
        const uniqueProjectFields = [
          ...new Set(response.map((item) => item.ProjectField)),
        ];
        // console.log(uniqueProjectFields);
        setTaskField(uniqueProjectFields);
      }
    } catch (err) {
      setCardDisplay('none')
      setMes(err.message);
      handelOpenModelBox()
    }
  };


  const handleAddTask = async(value) => {
      let filter =  ProjectList.filter((item) => item.ProjectField === value)
      Navigate('/services/task/create', {state: {ProjectField:value, Obj:filter}})
  }

 

const handelOpenModelBox = () => {
let dialogElem = document.getElementById("dialog");
dialogElem.showModal();
}

const handelCloseModelBox = () => {
let dialogElem = document.getElementById("dialog");
dialogElem.close();
}

  return (
    <>
     
      <div className="main m-2 d-flex justify-content-between">
    
        <div>
          <h2 className="h2" style={{ color: "rgb(92, 219, 159)" }}>
            Manage Tasks
          </h2>
        </div>
        <div>
          <button
            className="btn btn-info border-0 rounded-0"
            style={{ backgroundColor: "rgb(92, 219, 159)", color: "white" }}
            onClick={() => Navigate("/services/task/view")}
          >
            Task List
          </button>
        </div>
       
      </div>
      <dialog className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm" id="dialog">
  <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
</dialog>
      {/* Task Projects */}
      <div className={`d-${CardDisplay} placeholder-wave justify-content-center`}><LoadingSticks /></div>

      <div className="d-flex flex-wrap justify-content-center m-3">
        
        {TaskField.map((ele) => {
          
          return (
            <>
              <div class="card w-75 shadow-sm m-2">
                <div class="card-body d-flex justify-content-between">
                  <div>
                    <h4 className="h4">{ele}</h4>
                  </div>
                  <div>
                    <button className="btn btn-primary rounded-0 shadow-sm" onClick={() => handleAddTask(ele)}>
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ManageTask;
