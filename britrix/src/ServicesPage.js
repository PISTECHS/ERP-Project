import React from 'react'
import ServicesCards from "./Component/ServicesCards";

function ServicesPage() {
    const ServicesList = [
        { Title: "Task Management", subTitle: "Team & Tasks Management", url: '/services/task' },
        { Title: "Communication", subTitle: "Send Email Messages", url: '/services/email' },
        { Title: "Payment", subTitle: " Manage Payment", url: '/services/payment/manage' },
        { Title: "CRM ", subTitle: "Manage Customers Record" , url: '/services/companies/view' },
        { Title: "Expense", subTitle: "Expense Record Management", url: '/services/expenses' },
        { Title: "Analytics", subTitle: "Report Performance tracking", url:'/analytics/manage' },
        { Title: "Customer", subTitle: " Support Self-Service Support" },
      ];
      return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-wrap m-5">
              {ServicesList.map((ele, index) => {
                return (
                  <ServicesCards
                    key={index}
                    Title={ele.Title}
                    subTitle={ele.subTitle}
                    url={ele.url}
                  />
                ); 
              })}
            </div>
        </>
      );
}

export default ServicesPage