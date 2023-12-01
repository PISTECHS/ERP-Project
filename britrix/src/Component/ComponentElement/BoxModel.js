import React from "react";

const BoxModel = (props) => {
  return (
    <>
      <div className="modal-content ">
        <div className="text-center">
          <div>
            <h5 className="h5">{props.mes}</h5>
          </div>
          <div>
            <button className="btn btn-danger rounded-0 shadow-sm border-0" onClick={props.closeFunc}>
              close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoxModel;
