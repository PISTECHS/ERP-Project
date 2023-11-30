import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ManageTeam() {
  const [selectedButton, setSelectedButton] = useState(null);
  const Navigate = useNavigate();
  const handleSelectedButton = (e) => {
    let nm = e.target.name;
    setSelectedButton(nm);
    Navigate(`/services/task/team/${nm}`);
  };
  const layout = (
    <>
      <div className="d-flex flex-wrap justify-content-center col-12 p-1">
        <button
          className={`btn rounded-0 shadow-sm m-2 border-0 ${
            selectedButton === "list" ? "disabled" : ""
          }`}
          name="list"
          style={{ backgroundColor: "#8EE4AF" }}
          onClick={handleSelectedButton}
        >
          User List
        </button>
        <button
          className={`btn rounded-0 shadow-sm m-2 border-0  ${
            selectedButton === "create" ? "disabled" : ""
          }`}
          name="create"
          style={{ backgroundColor: "#8EE4AF" }}
          onClick={handleSelectedButton}
        >
          Register User
        </button>
      </div>
      <Outlet />
    </>
  );
  return layout;
}

export default ManageTeam;
