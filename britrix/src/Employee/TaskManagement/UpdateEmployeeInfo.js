import React, { useEffect, useState } from "react";
import Fetchdata from "../../Component/FetchData";
import BoxModel from "../../Component/ComponentElement/BoxModel";
import LoadingSpinner from "../../Component/ComponentElement/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const UpdateEmployeeInfo = () => {
  useEffect(() => {
    GETUserAccount();
  }, []);

  const [Data, setData] = useState("");
  const [EmployeeData, setEmployeeData] = useState("");
  const [Display, setDisplay] = useState("flex");
  const [Mes, setMes] = useState('')
  const Navigate = useNavigate()


  const GETUserAccount = async () => {
    let user = localStorage.getItem("brtrixUsername");
    // console.log(user);
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/filteremployeeinfo",
        { user }
      );
      if (response.length < 1) {
        setDisplay('none')
        setMes("No Record Found");
        handelOpenModelBox();
      } else {
        // console.log(response);
        setDisplay('none')
        setData(response);
        setEmployeeData({
          EmpName: response[0].Name,
          EmpEmail: response[0].Email,
          EmpContact: response[0].ContactNo,
          EmpPassword: "",
        });
        // setDisplay("flex");
      }
    } catch (err) {
     setDisplay('none')
      setMes(err);
        handelOpenModelBox();
    }
  };

  const hanldeChangeInfo = (e) => {
    setEmployeeData({
      ...EmployeeData,
      [e.target.name]: e.target.value,
    });
  };


  const handleUpdateData = async() => {
    if (
      (!EmployeeData.EmpName,
      !EmployeeData.EmpContact,
      !EmployeeData.EmpEmail,
      !EmployeeData.EmpPassword)
    ) {
      alert("Kindly Fill All the fields ...");
    } else {
      let obj = {
        EmpUsername: Data[0].Username,
        EmpName: EmployeeData.EmpName,
        EmpPassword: EmployeeData.EmpPassword,
        EmpEmail: EmployeeData.EmpEmail,
        EmpContactNo: EmployeeData.EmpContact,
      };
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/updateuser",
        obj
      );
      setMes(response.mes);
      handelOpenModelBox();
    } catch (error) {
      setMes(error.message);
      handelOpenModelBox();
    }
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

  return (
    <>
     <dialog
          className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
          id="dialog"
        >
          <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
        </dialog>
      <div className=" d-flex flex-wrap col-12 p-2 justify-content-between">
        <div>
          {" "}
          <h4 className="h4">Update Your Account</h4>
        </div>
        <div>
          <button
            className="btn btn-danger rounded-0"
              onClick={() => Navigate("/")}
          >
            Services Page
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        {Data &&
          Data.map((key) => {
            return (
              <div
                className="card shadow-sm p-2 m-2"
                style={{ width: "20rem" }}
              >
                <div className="d-flex gap-1 flex-wrap">
                  <h5> Username </h5>
                  <input
                    type="text"
                    className="form-control"
                    value={key.Username}
                    readOnly
                  />
                </div>
                <div className="d-flex gap-1 flex-wrap">
                  <h5> Name </h5>
                  <input
                    type="text"
                    className="form-control"
                    name="EmpName"
                    value={EmployeeData.EmpName}
                    onChange={(e) => hanldeChangeInfo(e)}
                  />
                </div>
                <div className="d-flex gap-1 flex-wrap">
                  <h5> Email </h5>
                  <input
                    type="email"
                    className="form-control"
                    name="EmpEmail"
                    value={EmployeeData.EmpEmail}
                    onChange={(e) => hanldeChangeInfo(e)}
                  />
                </div>
                <div className="d-flex gap-1 flex-wrap">
                  <h5> Contact No </h5>
                  <input
                    type="number"
                    className="form-control"
                    name="EmpContact"
                    value={EmployeeData.EmpContact}
                    onChange={(e) => hanldeChangeInfo(e)}
                  />
                </div>
                <div className="d-flex gap-1 flex-wrap">
                  <h5> Password </h5>
                  <input
                    type="text"
                    className="form-control"
                    name="EmpPassword"
                    placeholder="***"
                    value={EmployeeData.EmpPassword}
                    onChange={(e) => hanldeChangeInfo(e)}
                  />
                </div>
                <div className="d-flex gap-1 flex-wrap text-center justify-content-center ">
                  <button
                    className="btn btn-danger m-2 rounded-0"
                    onClick={() => handleUpdateData()}
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
          <div
        className={`d-${
          Display } justify-content-center`}
      >
        <LoadingSpinner />
      </div>
      </div>
    </>
  );
};

export default UpdateEmployeeInfo;
