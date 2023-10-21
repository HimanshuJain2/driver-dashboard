import React from "react";
import "./TotalDriverCard.css";

function TotalDriversCard(props) {
  const { title, count } = props;
  return (
    <div className="tcard">
      <div className="tcardHeader">
        <div>{title}</div>
        <div>
          <i className="fa fa-address-book-o"></i>
        </div>
      </div>
      <div className="tcardContent">
        <div className="driverPercent">
          <div className="percentText">Percentage Increase</div>
          <div className="percent">30%</div>
        </div>
        <div className="tcount">{count}</div>
      </div>
    </div>
  );
}

export default TotalDriversCard;
