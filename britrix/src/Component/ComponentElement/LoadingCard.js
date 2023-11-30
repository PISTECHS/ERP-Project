import React from "react";

const LoadingCard = () => {
  return (
    <>
      <div class="card" aria-hidden={'false'} style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
          <a
            class="btn btn-primary disabled placeholder col-6"
            aria-disabled={'false'}
          ></a>
        </div>
      </div>
    </>
  );
};

export default LoadingCard;