import React, { useEffect, useState } from "react";
import Fetchdata from "../../Component/FetchData";
import { useNavigate } from "react-router-dom";
import LoadingCard from "../../Component/ComponentElement/LoadingCard";
import BoxModel from "../../Component/ComponentElement/BoxModel";

function TaskList() {
  useEffect(() => {
    GetTaskList();
  }, []);

  const [Data, setData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [Mes, setMes] = useState("");
  const [CardDisplay, setCardDispay] = useState("d-flex");
  const [Month, setMonth] = useState("");
  const [Type, setType] = useState("");
  const [Priority, setPriority] = useState("");
  const Navigate = useNavigate();

  const GetTaskList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/GetTaskList"
      );
      //   console.log(response);
      if (response.length < 1) {
        setMes("No Record Found");
        setCardDispay("d-none");
        handelOpenModelBox();
      } else {
        setData(response);
        setFilterData(response);
        setCardDispay("d-none");
        // console.log(response);
      }
    } catch (err) {
      setCardDispay("d-none");
      setMes(err.message);
      handelOpenModelBox();
    }
  };

  const handleDeleteTask = async (TaskID) => {
    setMes("");
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/DeleteTask",
        { TaskID }
      );
      setMes(response.mes);
      handelOpenModelBox();
      GetTaskList();
    } catch (error) {
      setMes(error.message);
      handelOpenModelBox();
    }
  };

  const handlePriorityData = (v) => {
    setPriority(v);
    const filter = FilterData.filter((e) => {
      return e.Priority === v;
    });
    setFilterData(filter);
  };

  const handleMonthData = (m) => {
    setMonth(m);
    const filter = FilterData.filter((e) => {
      return e.Month === m;
    });
    setFilterData(filter);
  };
  const handleTaskTypeData = (t) => {
    setType(t);
    const filter = FilterData.filter((e) => {
      return e.Type === t;
    });
    setFilterData(filter);
  };

  const clearAll = () => {
    setPriority("");
    setMonth("");
    setType("");
    setFilterData(Data);
  };

  const handleUpdateUser = (obj) => {
    Navigate("/services/task/update", { state: obj });
    // console.log(obj);
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
      <div className="main m-2 d-flex justify-content-between">
        <h2 className="h2" style={{ color: "rgb(92, 219, 159)" }}>
          Task List
        </h2>
        <button
          className="btn btn-info border-0 rounded-0"
          style={{ backgroundColor: "rgb(92, 219, 159)", color: "white" }}
          onClick={() => Navigate("/services/task/manage")}
        >
          Manage Task
        </button>
      </div>
      {/* Task List */}
      <div
        className={` ${
          CardDisplay === "d-none" ? "d-flex" : "d-none"
        } justify-content-center gap-2`}
      >
        <dialog
          className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
          id="dialog"
        >
          <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
        </dialog>
        <div>
          <select
            className="form-control shadow-sm"
            onChange={(e) => handlePriorityData(e.target.value)}
            value={Priority}
          >
            <option className="dropdown-item" value="">
              -- Priority --
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
        <div>
          <input
            className="form-control shadow-sm"
            onChange={(e) => handleMonthData(e.target.value)}
            type="month"
            value={Month}
          />
        </div>
        <div>
          <select
            className="form-control shadow-sm"
            onChange={(e) => handleTaskTypeData(e.target.value)}
            value={Type}
          >
            <option className="dropdown-item" value="">
              -- Task Type --
            </option>
            <option className="dropdown-item" value="Epic">
              Epic
            </option>
            <option className="dropdown-item" value="Task">
              Task
            </option>
            <option className="dropdown-item" value="Bug">
              Bug
            </option>
          </select>
        </div>
        <div>
          <button className="btn btn-danger  p-1" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        <div className={CardDisplay}>
          <LoadingCard />
        </div>

        {FilterData &&
          FilterData.map((ele, index) => {
            return (
              <>
                <div
                  class="card shadow-sm border-2 m-3"
                  style={{ width: "18rem" }}
                >
                  <div class="card-body">
                    <div className="col-12 d-flex gap-2">
                      <div>
                        {ele.Type === "Epic" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-amd"
                            viewBox="0 0 16 16"
                          >
                            <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0H.334ZM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2V9.72Z" />
                          </svg>
                        ) : ele.Type === "Bug" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-bug"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-card-text"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 class="card-title h4">{ele.TaskName}</h4>
                      </div>
                    </div>
                    <h6 class="card-title h6">{ele.ProjectName}</h6>
                    <p class="card-text">{ele.TaskAllocation}</p>
                    <h5 class="card-title h5">
                      {ele.Priority} Priority {ele.Type}
                    </h5>
                    <div className="">
                      <button
                        className="btn btn-danger m-1 p-1 rounded-0"
                        onClick={() => handleDeleteTask(ele.TaskID)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary p-1 m-1 rounded-0"
                        onClick={() => handleUpdateUser(ele)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  {ele.Type === "Bug" ? (
                    <div
                      class="progress m-2"
                      role="progress bar"
                      aria-label={`danger example`}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="progress-bar bg-danger text-dark"
                        style={{ width: `${ele.Progress}%` }}
                      >
                        Progress : {ele.Progress}%
                      </div>
                    </div>
                  ) : ele.Type === "Task" ? (
                    <div
                      class="progress m-2"
                      role="progressbar"
                      aria-label={`primary example`}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="progress-bar bg-primary text-dark"
                        style={{ width: `${ele.Progress}%` }}
                      >
                        Progress : {ele.Progress}%
                      </div>
                    </div>
                  ) : (
                    <div
                      class="progress m-2"
                      role="progressbar"
                      aria-label={`primary example`}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="progress-bar bg-primary text-dark"
                        style={{ width: `${ele.Progress}%` }}
                      >
                        Progress : {ele.Progress}%
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default TaskList;
