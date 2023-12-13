import React from "react";
import ServicesCards from "../Component/ServicesCards";

const MainEmployeePage = () => {
  const EmployeeFunc = [
    { title: "Task", subTitle: "Tasks Management", url:'/manage' },
    { title: "Account", subTitle: "Update Account", url:'/updateuser' },
  ];

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap">
        {EmployeeFunc &&
          EmployeeFunc.map((key) => {
            return (
              <>
                <ServicesCards title={key.title} subTitle={key.subTitle} url={key.url}  />
              </>
            );
          })}
      </div>
    </>
  );
};

export default MainEmployeePage;
