import { Button, DatePicker, Select } from "antd";
import "./App.css";
import { useEffect, useState } from "react";
import DriverCard from "./component/DriverCard/DriverCard";
import AddDriverModal from "./component/AddDriverModal/index";
import Table from "./component/Table";
import BarChart from "./component/Chart";
import TotalDriversCard from "./component/DriverCard/TotalDriversCard";

const { RangePicker } = DatePicker;

function App() {
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [displayDriverList, setDisplayDriverList] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [countryFilter, setCountryFilter] = useState();

  const onAddButtonClick = () => {
    setIsDriverModalOpen(true);
  };

  const handleModalState = (modalState) => {
    setIsDriverModalOpen(modalState);
  };

  const saveDriverDetails = (driverDetails) => {
    setDriverList([...driverList, driverDetails]);
  };

  useEffect(() => {
    const apiUrl = "https://api.countrystatecity.in/v1/countries";
    const headers = {
      "X-CSCAPI-KEY":
        "RGhzemVIZFQ2VWZWRGdUb2UwMUlBeW9MUEZyejd0dUwzaUhsYWExbQ==",
    };

    fetch(apiUrl, { method: "GET", headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network connection not established");
        }
        return response.json();
      })
      .then((data) => {
        const newCountryData = data.map((country) => {
          return {
            ...country,
            label: country.name,
            value: country.id,
            iso2: country.iso2,
          };
        });
        setCountryList(newCountryData);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  useEffect(() => {
    let filteredData = driverList;
    if (countryFilter || dateFilter?.length > 0) {
      filteredData = driverList?.filter((item) => {
        const itemDate = new Date(item.dateAdded);
        return (
          (!dateFilter[0] || itemDate >= new Date(dateFilter[0])) &&
          (!dateFilter[1] || itemDate <= new Date(dateFilter[1])) &&
          (!countryFilter || item.country === countryFilter)
        );
      });
    }
    const customData = filteredData?.map((driver) => {
      return {
        name: `${driver.firstName} ${driver.lastName}`,
        arabicName: driver.firstNameArabic,
        mobile: driver.mobileNumber,
        gender: driver.gender,
        cardNumber: driver.cardName,
        userType: driver.userType,
      };
    });
    setDisplayDriverList(customData);
  }, [driverList, dateFilter, countryFilter]);

  const columnList = [
    {
      name: "STATUS",
      key: "status",
      type: "statusType",
    },
    {
      name: "NAME",
      key: "name",
    },
    {
      name: "ARABIC NAME",
      key: "arabicName",
    },

    {
      name: "MOBILE NO.",
      key: "mobile",
    },
    {
      name: "GENDER",
      key: "gender",
    },
    {
      name: "CARD NUMBER",
      key: "cardNumber",
    },
    {
      name: "USER TYPE",
      key: "userType",
    },
    {
      name: "Action",
      type: "icon",
    },
  ];

  const chartOptions = ["Mar", "April", "May", "Jun", "Jul", "Aug"];

  useEffect(() => {
    if (driverList?.length > 0) {
      let augM = 0,
        julyM = 0,
        juneM = 0,
        mayM = 0,
        aprilM = 0,
        marchM = 0;
      const filteredData = driverList.map((driver) => {
        const date = new Date(driver["dateAdded"]);
        const monthValue = date.getMonth();
        if (monthValue === 7) {
          augM = augM + 1;
        } else if (monthValue === 6) {
          julyM = julyM + 1;
        } else if (monthValue === 5) {
          juneM = juneM + 1;
        } else if (monthValue === 4) {
          mayM = mayM + 1;
        } else if (monthValue === 3) {
          aprilM = aprilM + 1;
        } else if (monthValue === 2) {
          marchM = marchM + 1;
        }
        setChartData([marchM, aprilM, mayM, juneM, julyM, augM]);
      });
    }
  }, [driverList]);

  const onDateFilter = (e, dateString) => {
    setDateFilter(dateString);
  };

  const onCountryChange = (countryValue) => {
    setCountryFilter(countryValue);
  };

  return (
    <div className="dashboard">
      <div className="navbar" />
      <div className="dashboardContainer">
        <div className="infoBar">
          <div className="infoText">Drivers</div>
          <div>
            <div className="dateRangeBar">
              <Select
                defaultValue="Select Country"
                options={countryList}
                className="selectCountry"
                onChange={onCountryChange}
              />
              <RangePicker
                className="selectDate"
                onChange={(e, dateString) => onDateFilter(e, dateString)}
                format={"YYYY-MM-DD"}
              />
            </div>
          </div>
        </div>
        <div className="cardBlocks">
          <BarChart categories={chartOptions} data={chartData} />
          <div className="driverTiles">
            <DriverCard title={"Active Driver"} count={0} />
            <DriverCard title={"Inactive Driver"} count={0} />
            <DriverCard
              title={"In-Process Driver"}
              count={driverList?.length}
            />
            <DriverCard title={"Reject Driver"} count={0} />
          </div>
          <div className="btnTile">
            <Button className="btn-modal" onClick={onAddButtonClick}>
              Add New Driver
            </Button>
            <AddDriverModal
              isModalOpen={isDriverModalOpen}
              handleModal={handleModalState}
              saveDriverDetails={saveDriverDetails}
              countryList={countryList}
            />
            <TotalDriversCard
              title={"Total Drivers"}
              count={driverList?.length}
            />
          </div>
        </div>
        <Table columnName={columnList} data={displayDriverList} />
      </div>
    </div>
  );
}

export default App;
