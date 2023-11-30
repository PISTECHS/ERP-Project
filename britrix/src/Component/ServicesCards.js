import React from "react";
import { Link } from "react-router-dom";

const ServicesCards = (props) => {
  return (
    <div
      className="card rounded-0 shadow-sm m-2 text-center"
      style={{ width: "18rem", color: "#379683",   }}
    >
      <div className="card-body">
        <h5 className="card-title">{props.Title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{props.subTitle}</h6>
        <Link
          className="btn btn-danger border-0 rounded-0 shadow-sm"
          style={{ backgroundColor: "#5cdb9f" }}
          to={props.url}
        >
          Open
        </Link>
      </div>
    </div>
  );
};

export default ServicesCards;
