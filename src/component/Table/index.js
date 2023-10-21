import React, { useState, useEffect } from "react";
import Status from "./Status";
import "./index.css";

function Table(props) {
  const { columnName, data } = props;

  const [displayData, setDisplayData] = useState(data);
  const [pageLength, setPageLength] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageLengthChange = (pageSize) => {
    setPageLength(pageSize);
    setCurrentPage(1);
    const totalPage = Math.ceil(data?.length / pageSize) || 1;
    setTotalPages(totalPage);
    if (data.length > 0) {
      let lastIndex;
      if (data.length > pageSize) {
        lastIndex = pageSize - 1;
      } else {
        lastIndex = data.length - 1;
      }
      const showdata = data?.slice(0, lastIndex + 1);
      setDisplayData(showdata);
    } else {
      setDisplayData([]);
    }
  };

  useEffect(() => {
    if (data?.length > 0) {
      onPageLengthChange(5);
    }
  }, []);

  useEffect(() => {
    setDisplayData(data);
    onPageLengthChange(pageLength);
  }, [data]);

  const onLeftButtonClick = () => {
    setCurrentPage(1);
    let lastIndex;
    if (data.length > pageLength) {
      lastIndex = pageLength - 1;
    } else {
      lastIndex = data.length - 1;
    }
    const showdata = data?.slice(0, lastIndex + 1);
    setDisplayData(showdata);
  };

  const onRightButtonClick = () => {
    setCurrentPage(totalPages);
    let index;
    if (data.length > pageLength) {
      index = pageLength * (totalPages - 1);
    }
    const showdata = data?.slice(index, data?.length);
    setDisplayData(showdata);
  };

  const onPageButtonClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      let indexFirst = pageLength * (pageNumber - 1);
      let indexLast;
      if (data?.length < pageLength * pageNumber) {
        indexLast = data?.length - 1;
      } else {
        indexLast = pageLength * pageNumber - 1;
      }
      const showData = data?.slice(indexFirst, indexLast + 1);
      setDisplayData(showData);
    }
  };

  return (
    <table className="tableContent">
      <thead className="tableHeader">
        <tr className="headerRow">
          {columnName.map((column) => (
            <th className="headerColumn" key={column.name}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayData.map((item, index) => {
          return (
            <tr className="bodyRow" key={`${item.mobile}${index}`}>
              {columnName.map((column, index) => {
                if (column.type === "statusType") {
                  return (
                    <td
                      key={`${item.cardNumber}${index}`}
                      className="statusColumn"
                    >
                      <Status />
                    </td>
                  );
                } else if (column.type === "icon") {
                  return (
                    <td
                      key={`${item.cardNumber}${index}`}
                      className="iconColumn"
                    >
                      <i className="fa fa-eye"></i>
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={`${item.cardNumber}${index}`}
                      className="textColumn"
                    >
                      {item[column.key]}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot className="tableFooter">
        <tr>
          <td colSpan={columnName?.length}>
            <span>Show by</span>
            <select
              className="footerSelect"
              onChange={(e) => onPageLengthChange(parseInt(e.target.value))}
            >
              <option value={"5"}>5</option>
              <option value={"10"}>10</option>
              <option value={"20"}>20</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan={columnName?.length}>
            <div className="footerPagination">
              <button className="footerButton" onClick={onLeftButtonClick}>
                <i className="fa fa-angle-double-left"></i>
              </button>
              <button
                className="footerButton"
                onClick={() => onPageButtonClick(currentPage - 1)}
              >
                <i className="fa fa-angle-left"></i>
              </button>
              <p>
                {currentPage} of {totalPages}
              </p>
              <button
                className="footerButton"
                onClick={() => onPageButtonClick(currentPage + 1)}
              >
                <i className="fa fa-angle-right"></i>
              </button>
              <button className="footerButton" onClick={onRightButtonClick}>
                <i className="fa fa-angle-double-right"></i>
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
