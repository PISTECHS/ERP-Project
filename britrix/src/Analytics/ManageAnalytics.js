import React from "react";
import { useNavigate } from "react-router-dom";


const ManageAnalytics = () => {
  
  const Navigate = useNavigate()

  return (
    <>
      <div className="main m-4">
        <div className="head d-flex justify-content-between">
          <div>
            {" "}
            <h3> Analytics</h3>
          </div>
          <div>
            <button className="btn btn-warning rounded-0"  onClick={() => Navigate("/services")}>Services</button>
          </div>
        </div>
        <div className="body d-flex justify-content-center gap-3 m-2 flex-wrap">
          <div
            className="card rounded-0 text-center shadow-sm p-2"
            style={{ width: "18rem" }}
          >
            <h5 className="card-title h5">Track Employee</h5>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-person-badge"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
              </svg>
            </div>
            <div className="card-body">
              <p className="card-text">
                Track Employee All Date & Generate Monthly Employee Report regrading
                thier Task Excellence
              </p>
            </div>
            <div><button className="btn btn-outline-dark rounded-0 shadow-sm" onClick={() => Navigate('/analytics/user')}>OPEN</button></div>
          </div>
          <div
            className="card text-center shadow-sm p-2 rounded-0"
            style={{ width: "18rem" }}
          >
            <h5 className="card-title h5">Track Finance</h5>
            <div>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-cash"
                viewBox="0 0 16 16"
              >
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <div className="card-body">
              <p className="card-text">
                Track Finance Data & Generate Monthly Finance Report regrading
                thier Sales and Expenses
              </p>
            </div>
            <div><button className="btn btn-outline-dark rounded-0 shadow-sm" onClick={() => Navigate('/analytics/finance')}>OPEN</button></div>
          </div>
          <div
            className="card text-center shadow-sm p-2 rounded-0"
            style={{ width: "18rem" }}
          >
            <h5 className="card-title h5">Track Tasks</h5>
            <div>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-list-task"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
                />
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                <path
                  fill-rule="evenodd"
                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
                />
              </svg>
            </div>
            <div className="card-body">
              <p className="card-text">
                Track Tasks & Generate Monthly Task Report regrading thier
                Priorties, Progress, Types
              </p>
            </div>
            <div><button className="btn btn-outline-dark rounded-0 shadow-sm" onClick={() => Navigate('/analytics/task')}>OPEN</button></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAnalytics;
