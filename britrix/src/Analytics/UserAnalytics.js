import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Component/ComponentElement/LoadingSpinner";
import BoxModel from "../Component/ComponentElement/BoxModel";
import Fetchdata from "../Component/FetchData";
import { useNavigate } from "react-router-dom";

const UserAnalytics = () => {
  useEffect(() => {
    GetTaskList();
  }, []);

  const [Data, setData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [SelectedEmp, setSelectedEmp] = useState();
  const [EmpData, setEmpData] = useState([]);
  const [SelectMonth, setSelectedMonth] = useState();
  const [Mes, setMes] = useState("");
  const [CardDisplay, setCardDisplay] = useState("d-flex");
  const Navigate = useNavigate();

  const GetTaskList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/GetTaskList"
      );
      // console.log(response);
      if (response.length < 1) {
        setMes("No Record Found");
        setCardDisplay("d-none");
        handelOpenModelBox();
      } else {
        setCardDisplay("d-none");
        setData(response);
        setFilterData(response);
        const uniqueTaskAllocations = [
          ...new Set(response.map((task) => task.TaskAllocation)),
        ];
        setEmployeeList(uniqueTaskAllocations);
      }
    } catch (err) {
      setCardDisplay("d-none");
      setMes(err.message);
      handelOpenModelBox();
      console.error(err);
    }
  };

  const hanldeEmployeeList = (selected_user) => {
    setFilterData(Data);
    setSelectedEmp(selected_user);
    var userTasks = [];
    if (SelectMonth) {
      userTasks = [...FilterData].filter(
        (task) =>
          task.TaskAllocation === selected_user && task.Month === SelectMonth
      );
    } else {
      userTasks = [...FilterData].filter(
        (task) => task.TaskAllocation === selected_user
      );
    }

    // console.log(userTasks);
    const taskCounts = [
      {
        highPriority: userTasks.filter((task) => task.Priority === "High")
          .length,
        mediumPriority: userTasks.filter((task) => task.Priority === "Medium")
          .length,
        lowPriority: userTasks.filter((task) => task.Priority === "Low").length,
        bugCount: userTasks.filter((task) => task.Type === "Bug").length,
        taskCount: userTasks.filter((task) => task.Type === "Task").length,
        epicCount: userTasks.filter((task) => task.Type === "Epic").length,
        CompletedTaskCount: userTasks.filter((task) => task.Progress === 100)
          .length,
        PendingTaskCount: userTasks.filter((task) => task.Progress < 90).length,
        TotalTasks:
          userTasks.filter((task) => task.Priority === "High").length +
          userTasks.filter((task) => task.Priority === "Medium").length +
          userTasks.filter((task) => task.Priority === "Low").length,
      },
    ];
    // console.log(taskCounts);
    setEmpData(taskCounts);
  };

  

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
      <div className="main m-4">
        <div className="head d-flex justify-content-between">
          <div>
            {" "}
            <h3>Employee Analytics</h3>
          </div>
          <div className="d-flex gap-2">
            <div>
              <button className="btn btn-warning rounded-0"
              onClick={() => Navigate("/services")}
              >Services</button>
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
        <div className="filters d-flex gap-3">
          <div>
            <select
              className="form-control shadow-sm rounded-0 "
              onChange={(e) => hanldeEmployeeList(e.target.value)}
              // value={Priority}
            >
              <option className="dropdown-item" value="">
                -- Select Employee --
              </option>
              {EmployeeList.map((ele) => {
                return (
                  <option className="dropdown-item" value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              className="form-control h-100 shadow-sm rounded-0"
              type="month"
              name="Month"
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                hanldeEmployeeList();
              }}
            />
          </div>
        </div>

        <dialog
          className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
          id="dialog"
        >
          <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
        </dialog>

        <div className="body d-flex m-2 justify-content-center">
        <div className={CardDisplay}>
              <LoadingSpinner />
            </div>
          <div class="card shadow-sm border-2 m-5">
            
            <div className="card-body">
              {EmpData.map((key) => {
                return (
                  <>
                    <h3 className="h3">{SelectedEmp}</h3>
                    <h4>{SelectMonth}</h4>
                    <div className="m-2 p-1 shadow-sm">
                      <h6 className="h6">
                        <b>Total Tasks : </b>
                        {key.TotalTasks}
                      </h6>
                      <h6 className="h6">
                        <b>High Priority : </b>
                        {key.highPriority}
                      </h6>
                      <h6 className="h6">
                        <b>Medium Priority : </b>
                        {key.mediumPriority}
                      </h6>
                      <h6 className="h6">
                        <b>Low Priority : </b>
                        {key.lowPriority}
                      </h6>
                    </div>
                    <div className="m-2 p-1 shadow-sm">
                      <h6 className="h6">
                        <b>Task Count : </b>
                        {key.taskCount}
                      </h6>
                      <h6 className="h6">
                        <b>Bug Count : </b>
                        {key.bugCount}
                      </h6>
                      <h6 className="h6">
                        <b>Epic Count : </b>
                        {key.epicCount}
                      </h6>
                    </div>
                    <div className="m-2 p-1 shadow-sm">
                      <h6 className="h6">
                        <b>Completed Task : </b>
                        {key.CompletedTaskCount}
                      </h6>
                      <h6 className="h6">
                        <b>Pending Task : </b>
                        {key.PendingTaskCount}
                      </h6>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAnalytics;
