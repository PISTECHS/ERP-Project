import React from 'react'
import ServicesCards from "./Component/ServicesCards";

function ServicesPage() {
    const ServicesList = [
        { Title: "Task Management", subTitle: "Team & Tasks Management", url: '/services/task' },
        { Title: "CRM", subTitle: "Customer Relationship" },
        { Title: "Communication", subTitle: "Social Collaboration" },
        { Title: "Email", subTitle: "Integration  & Conversation", url: '/services/email' },
        { Title: "HR", subTitle: "Employee Management" },
        { Title: "Workflows", subTitle: "Business process" },
        { Title: "Sales", subTitle: "Products Inventory Payments", url: '/services/expenses' },
        { Title: "Analytics", subTitle: "Report Performance tracking" },
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