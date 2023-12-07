import React from 'react'
import ServicesCards from "./Component/ServicesCards";

function ServicesPage() {
    const ServicesList = [
        { Title: "Task Management", subTitle: "Team & Tasks Management", url: '/services/task' },
        { Title: "CRM", subTitle: "Customer Relationship" },
        { Title: "Communication", subTitle: "Social Collaboration" },
        { Title: "Email", subTitle: "Integration  & Conversation", url: '/services/email' },
        { Title: "Payment", subTitle: " Manage Payment", url: '/services/payment/manage' },
        { Title: "Companies Managemnt", subTitle: "Manage Companies Record" , url: '/services/companies/view' },
        { Title: "Sales", subTitle: "Products Inventory Payments", url: '/services/expenses' },
        { Title: "Analytics", subTitle: "Report Performance tracking", url:'/analytics/manage' },
        { Title: "Customer", subTitle: " Support Self-Service Support" },
        { Title: "Media", subTitle: "  Media Management & analytics." },
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