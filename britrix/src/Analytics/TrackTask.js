import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetchdata from "../Component/FetchData";
import LoadingSpinner from "../Component/ComponentElement/LoadingSpinner";
import BoxModel from "../Component/ComponentElement/BoxModel";


const TrackTask = () => {
  useEffect(() => {
    GetTaskList();
  }, []);
  const [CardDisplay, setCardDisplay] = useState("d-flex");
  const [FilterData, setFilterData] = useState([]);
  const [Data, setData] = useState([]);
  const [Month, setMonth] = useState('');
  const [Mes, setMes] = useState('')
  const Navigate = useNavigate();


  const CreateValueObj = (response) => {
    const EleKeys = [
        {
          TotalWorkingTasks: response.filter(
            (ele) =>
              ele.Type === "Task" || ele.Type === "Bug" || ele.Type === "Epic"
          ).length,
          totalTasks: response.filter((ele) => ele.Type === "Task").length,
          totalBug: response.filter((ele) => ele.Type === "Bug").length,
          totalEpic: response.filter((ele) => ele.Type === "Epic").length,
          HighPriority: response.filter((ele) => ele.Priority === "High")
            .length,
          MediumPriority: response.filter((ele) => ele.Priority === "Medium")
            .length,
          LowPriority: response.filter((ele) => ele.Priority === "Low")
            .length,
          CompletedTask: response.filter(
            (ele) => ele.TaskStatus === "Complete"
          ).length,
          InProgressTask: response.filter(
            (ele) => ele.TaskStatus === "InProgress"
          ).length,
          BlockedTask: response.filter((ele) => 
            ele.TaskStatus === "Block"
          ).length,
        },
      ];
      return EleKeys
  }
  const GetTaskList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/GetTaskList"
      );
      // console.log(response);
      if (response.length < 1) {
        console.log(response);
          setMes("No Record Found");
        setCardDisplay("d-none");
          handelOpenModelBox();
      } else {
        console.log(response);
        setCardDisplay("d-none");

        setData(response);

        let EleKeys = CreateValueObj(response)

        setFilterData(EleKeys);
      }
    } catch (err) {
      setCardDisplay("d-none");
      setMes(err.message);
      handelOpenModelBox();
      console.error(err);
    }
  };

  const handleMonth =(mn) => {
    setMonth(mn)
    console.log(mn);
    const filterData = [...Data].filter((ele) => 
        ele.Month === mn
    )
    // console.log(filterData);
    let EleKeys = CreateValueObj(filterData)
    setFilterData(EleKeys)
  }

  const ClearAll = () => {
    setMonth('')
    let EleKeys = CreateValueObj(Data)
    setFilterData(EleKeys)
  }

  const handelOpenModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.showModal();
  };

  const handelCloseModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.close();
  };

  
  return (
    <>
      <div className="main">
        <div className="head d-flex justify-content-around m-3">
          <div>
            {" "}
            <h3>Task Analytics</h3>
          </div>
          <div className="d-flex gap-2 ">
              <div><input
              type="month"
              className="form-control shadow-sm shadow-sm rounded-0"
              onChange={(e) => handleMonth(e.target.value)}
              value={Month}
            >
              
            </input></div>
             <div><button className="btn btn-danger rounded-0" onClick={() => ClearAll()}>Clear</button></div>
          </div>
          <div className="d-flex gap-2">
            <div>
              <button
                className="btn btn-warning rounded-0"
                onClick={() => Navigate("/services")}
              >
                Services
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary rounded-0"
                onClick={() => Navigate("/analytics/manage")}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
        
        <div className="body d-flex justify-content-center flex-wrap">
        
          <div className="report d-flex justify-content-center flex-wrap p-3 shadow-sm gap-3 m-2">
            {FilterData &&
              FilterData.map((ele) => {
                return (
                  <>
                    <div className="card task p-3 rounded-0 shadow-sm">
                      <h4 className="h4">
                        {" "}
                        Total Working Taks : {ele.TotalWorkingTasks}
                      </h4>
                      <h5 className="h5">
                      {" "}
                      Total Taks :{" "}
                        {" "}
                        {ele.totalTasks}
                      
                    </h5>
                    <h5 className="h5">
                    Total Bug :{" "}
                        {" "}
                        {ele.totalBug}
                    </h5>
                    <h5 className="h5">
                    Total Epic :{" "}
                        {" "}
                        {ele.totalEpic}
                    </h5>
                    </div>
                    <div className="card task p-3 rounded-0 shadow-sm">
                    <h4>Priorties</h4>
                    <h6 className="h6">
                      {" "}
                      High :{" "}
                        {" "}
                        {ele.HighPriority}
                      
                    </h6>
                    <h6 className="h6">
                      {" "}
                      Medium :{" "}
                        {" "}
                        {ele.MediumPriority}
                    </h6>
                    <h6 className="h6">
                      {" "}
                      Low :{" "}
                        {" "}
                        {ele.LowPriority}
                    </h6>
                    </div>
                    <div className="card task p-3 rounded-0 shadow-sm">
                    <h4>Satatus</h4>

                    <h6 className="h6">
                      {" "}
                      In Progress :{" "}
                        {" "}
                        {ele.InProgressTask}
                    </h6>
                    <h6 className="h6">
                      {" "}
                      Completed :{" "}
                        {" "}
                        {ele.CompletedTask}
                    </h6>
                    <h6 className="h6">
                      {" "}
                      Block :{" "}
                        {" "}
                        {ele.BlockedTask}
                    </h6>
                    </div>
                  </>
                );
              })}
          </div>
        </div>

        <div className={`${CardDisplay} justify-content-center`}>
          <LoadingSpinner />
        </div>
        <dialog
          className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
          id="dialog"
        >
          <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
        </dialog>
      </div>
    </>
  );
};

export default TrackTask;
