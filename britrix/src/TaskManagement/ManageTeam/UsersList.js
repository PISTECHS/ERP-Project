import React, { useEffect, useState } from "react";
import Fetchdata from "../../Component/FetchData";
import { useNavigate } from "react-router-dom";
import LoadingSticks from "../../Component/ComponentElement/LoadingSticks";

const UsersList = () => {

  const [Data, setData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [Mes, setMes] = useState('')
  const [CardDisplay, setCardDisplay] = useState('flex')
  const Navigate = useNavigate()

  useEffect(() => {
    GetUserList();
  }, []);
  const GetUserList = async () => {
    try {
      const response = await Fetchdata("GET", "http://localhost:8080/userlist");
    //   console.log(response);
      if(response.length<1){
        setCardDisplay('none')
        setMes('No Record Found')
      }else{
        setCardDisplay('none')
        setData(response)
      }
    } catch (err) {
      setCardDisplay('none')
      setMes(err.message)
    }
  };

  const DeleteUser = async(Username) => {
    setMes('')
    try {
        const response = await Fetchdata("POST", "http://localhost:8080/deleteuser", {Username})
        if(response){
          setMes(response.mes)
          GetUserList()
        }
      //   console.log(response);
        
      } catch (err) {
        setMes(err.message)
      }
      
  }

  const handleUpdateUser = (obj) => {
    // console.log(obj);
    Navigate('/services/task/team/update', {state: obj})
  }

  let layout = (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="container">
          <h3 className="text-center m-3" style={{ color: "#8EE4AF" }}>
            Users List
          </h3>
          {/* Table */}

          <table className="table shadow-sm  table-bordered">
            <thead className="table-light text-center " key={"thead"}>
              <tr className="mb-2">
                <th scope="col">
                  <h6 className="h6">Name</h6>
                </th>
             
                <th scope="col">
                  <h6 className="h6">Type</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Field</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">ContactNo</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Email</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Role</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Status</h6>
                </th>
                <th scope="col">
                  <h6 className="h6">Option</h6>
                </th>
              </tr>
              <div className={`d-${CardDisplay} placeholder-glow justify-content-center`}><LoadingSticks /></div>
            </thead>
         
            <tbody className="border-dark text-center " key={"tbody"}>
              {Data &&
                Data.map((ele, index) => {
                  return (
                    <>
                    <tr key={index}>
                      <th>{ele.Name}</th>
                      <td>{ele.Type}</td>
                      <td>{ele.Field}</td>
                      <td>{ele.ContactNo}</td>
                      <td>{ele.Email}</td>
                      <td>{ele.Role}</td>
                      <td>{ele.Status}</td>
                      <td><div className="m-1 p-0"><button className="btn btn-outline-danger m-1 p-1 rounded-0"
                      onClick={() => DeleteUser(ele.Username)}
                      >Delete</button><button className="btn btn-outline-primary p-1 m-1 rounded-0"
                      onClick={() => handleUpdateUser(ele)}
                      >Update</button></div>
                      </td> 
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          {Mes && <div className="text-center border-2 p-2 rounded-0">{Mes}</div>}
        </div>
      </div>
    </>
  );

  return layout;
};

export default UsersList;
