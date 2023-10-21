import React from "react";
import "./DriverCard.css";

function DriverCard(props) {
  const { title, count } = props;
  return (
    <div className="card">
      <div className="cardHeader">{title}</div>
      <div className="cardContent">
        <div>
          <i className="fa fa-address-book-o"></i>
        </div>
        <div className="count">{count}</div>
      </div>
    </div>
  );
}

export default DriverCard;
