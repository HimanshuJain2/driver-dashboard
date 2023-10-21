import React, { useEffect, useState } from "react";
import { Form, Modal, Select, Radio, Input, DatePicker } from "antd";
import "./index.css";

const AddDriverModal = (props) => {
  const { isModalOpen, handleModal, saveDriverDetails, countryList } = props;
  const [personalCityList, setPersonalCityList] = useState([]);
  const [presentCityList, setPresentCityList] = useState([]);
  const [driverDetails, setDriverDetails] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isModalOpen && driverDetails.personalCountry) {
      const cityApiUrl = `https://api.countrystatecity.in/v1/countries/${driverDetails.personalCountry}/cities`;
      const headers = {
        "X-CSCAPI-KEY":
          "RGhzemVIZFQ2VWZWRGdUb2UwMUlBeW9MUEZyejd0dUwzaUhsYWExbQ==",
      };

      fetch(cityApiUrl, { method: "GET", headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network Connection not established");
          }
          return response.json();
         })
        .then((data) => {
          const newPersonalCityData = data.map((personalCities) => {
            return {
              ...personalCities,
              label: personalCities.name,
              value: personalCities.id,
            };
          });
          setPersonalCityList(newPersonalCityData);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, [driverDetails.personalCountry]);

  useEffect(() => {
    if (isModalOpen && driverDetails?.presentCountry) {
      const cityApiUrl = `https://api.countrystatecity.in/v1/countries/${driverDetails.presentCountry}/cities`;
      const headers = {
        "X-CSCAPI-KEY":
          "RGhzemVIZFQ2VWZWRGdUb2UwMUlBeW9MUEZyejd0dUwzaUhsYWExbQ==",
      };

      fetch(cityApiUrl, { method: "GET", headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network Connection not established");
          }
          return response.json();
        })
        .then((data) => {
          const newPresentCityData = data.map((presentCities) => {
            return {
              ...presentCities,
              label: presentCities.name,
              value: presentCities.id,
            };
          });
          setPresentCityList(newPresentCityData);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, [driverDetails.presentCountry]);

  const validateMandatoryFields = () => {
    const errors = {};

    if (!driverDetails.firstName) {
      errors.firstName = "error";
    }
    if (!driverDetails.lastName) {
      errors.lastName = "error";
    }
    if (!driverDetails.gender) {
      errors.gender = "error";
    }
    if (!driverDetails.country) {
      errors.country = "error";
    }
    if (!driverDetails.birthDate) {
      errors.birthDate = "Age is less than 18 year";
    }
    if (!driverDetails.mobileNumber) {
      errors.mobileNumber = "error";
    }
    if (!driverDetails.nationality) {
      errors.nationality = "error";
    }
    if (!driverDetails.personalCountry) {
      errors.personalCountry = "error";
    }
    if (!driverDetails.personalCity) {
      errors.personalCity = "error";
    }
    if (!driverDetails.cardName) {
      errors.cardName = "error";
    }
    if (!driverDetails.streetName) {
      errors.streetName = "error";
    }
    if (!driverDetails.presentCountry) {
      errors.presentCountry = "error";
    }
    if (!driverDetails.presentCity) {
      errors.presentCity = "error";
    }
    if (!driverDetails.zipcode) {
      errors.zipcode = "error";
    }
    if (!driverDetails.dateAdded) {
      errors.dateAdded = "error";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onModalOk = (e) => {
    e.preventDefault();
    const isValid = validateMandatoryFields();
    if (isValid) {
      setValidationErrors({});
      saveDriverDetails(driverDetails);
      handleModal(false);
    }
  };

  const onInputChange = (key, value) => {
    setValidationErrors({});
    setDriverDetails({ ...driverDetails, [key]: value });
  };

  const onDateChange = (e, dateString) => {
    setValidationErrors({});
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    if (age >= 18) {
      setDriverDetails({ ...driverDetails, birthDate: dateString });
    } else {
      setValidationErrors({ birthDate: "Age is less then 18" });
    }
  };

  return (
    <div style={{ padding: "0px" }}>
      <Modal
        wrapClassName={{ padding: "0px" }}
        okText={"Send"}
        okButtonProps={{ style: { background: "#109887" } }}
        closeIcon={false}
        width={1000}
        open={isModalOpen}
        onOk={(e) => onModalOk(e)}
        onCancel={() => handleModal(false)}
      >
        <div className="modalHeader">
          <p style={{ fontFamily: "Montserrat, sans-serif" }}>ADD NEW DRIVER</p>
          <button
            className="closeButton"
            onClick={(e) => {
              handleModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="frame18">
          <Form>
            <div className="headerForm">
              <div className="countryInput">
                <label htmlFor="country">
                  COUNTRY <span className="required">*</span>
                </label>
                <Select
                  id="country"
                  className={validationErrors.country && "selectDanger"}
                  defaultValue="Select Country"
                  options={countryList}
                  onChange={(country) => onInputChange("country", country)}
                />
              </div>
              <div className="userType">
                <label>USER TYPE</label>
                <Radio.Group
                  className="radioButtons"
                  onChange={(userType) =>
                    onInputChange("userType", userType.target.value)
                  }
                >
                  <Radio value={"Driver"}>Driver</Radio>
                  <Radio value={"Broker & Driver"}>Broker & Driver</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="personalDetails">
              <div className="personalDetailsText">PERSONAL DETAILS</div>
              <div className="polygon"></div>
              <div className="line57"></div>
            </div>

            <div className="group322">
              <div className="personal-details">
                <div className="bodyRows">
                  <div className="flex-item">
                    <label>
                      FIRST NAME <span className="required">*</span>
                    </label>
                    <Input
                      type="text"
                      className={validationErrors.firstName && "inputDanger"}
                      onChange={(e) =>
                        onInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="middleName">MIDDLE NAME </label>
                    <Input
                      id="middleName"
                      type="text"
                      onChange={(e) =>
                        onInputChange("middleName", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="lastName">
                      LAST NAME <span className="required">*</span>
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      className={validationErrors.lastName && "inputDanger"}
                      onChange={(e) =>
                        onInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="gender">
                      GENDER <span className="required">*</span>
                    </label>
                    <Select
                      id="gender"
                      className={validationErrors.gender && "selectDanger"}
                      defaultValue="Select"
                      onChange={(e) => onInputChange("gender", e)}
                      options={[{ value: "Male" }, { value: "Female" }]}
                    />
                  </div>
                </div>
                <div className="bodyRows">
                  <div className="flex-item">
                    <label htmlFor="afirstName">FIRST NAME IN ARABIC</label>
                    <Input
                      id="afirstName"
                      type="text"
                      onChange={(e) =>
                        onInputChange("firstNameArabic", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="amiddleName">MIDDLE NAME IN ARABIC</label>
                    <Input
                      id="amiddleName"
                      type="text"
                      onChange={(e) =>
                        onInputChange("middleNameArabic", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="alastName">LAST NAME IN ARABIC</label>
                    <Input
                      id="alastName"
                      type="text"
                      onChange={(e) =>
                        onInputChange("lastNameArabic", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="dob">
                      DATE OF BIRTH <span className="required">*</span>
                    </label>
                    <DatePicker
                      id="dob"
                      className={validationErrors.birthDate && "selectDanger"}
                      placeholder="DD/MM/YYYY"
                      onChange={(e, dateString) => onDateChange(e, dateString)}
                    />
                    {validationErrors.birthDate && (
                      <div className="errorText">
                        {validationErrors.birthDate}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bodyRows">
                  <div className="flex-item">
                    <label htmlFor="mobile">
                      MOBILE NUMBER <span className="required">*</span>
                    </label>
                    <Input
                      id="mobile"
                      placeholder="+971"
                      type="number"
                      className={validationErrors.mobileNumber && "inputDanger"}
                      onChange={(e) =>
                        onInputChange("mobileNumber", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="nationality">
                      NATIONALITY <span className="required">*</span>
                    </label>
                    <Select
                      id="nationality"
                      defaultValue="Select"
                      options={countryList}
                      className={validationErrors.nationality && "selectDanger"}
                      onChange={(e) => onInputChange("nationality", e)}
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="country">
                      COUNTRY <span className="required">*</span>
                    </label>
                    <Select
                      id="country"
                      defaultValue="Select"
                      className={
                        validationErrors.personalCountry && "selectDanger"
                      }
                      options={countryList}
                      onChange={(e) => onInputChange("personalCountry", e)}
                    />
                  </div>
                  <div className="flex-item">
                    <label htmlFor="cityOfBirth">
                      CITY OF BIRTH <span className="required">*</span>
                    </label>
                    <Select
                      id="cityOfBirth"
                      className={
                        validationErrors.personalCity && "selectDanger"
                      }
                      defaultValue="Select"
                      options={personalCityList}
                      onChange={(e) => onInputChange("personalCity", e)}
                    />
                  </div>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <label htmlFor="nameOnTheCard">
                    NAME ON THE CARD <span className="required">*</span>
                  </label>
                  <Input
                    id="nameOnTheCard"
                    type="text"
                    className={validationErrors.cardName && "inputDanger"}
                    onChange={(e) => onInputChange("cardName", e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "15px" }}>
                  <label htmlFor="dob">
                    Date Added <span className="required">*</span>
                  </label>
                  <DatePicker
                    id="dob"
                    placeholder="DD/MM/YYYY"
                    className={validationErrors.dateAdded && "selectDanger"}
                    onChange={(e, dateString) =>
                      onInputChange("dateAdded", dateString)
                    }
                  />
                </div>
              </div>
              <div
                className="personalDetails"
                style={{ marginTop: "15px", marginBottom: "15px" }}
              >
                <div className="personalDetailsText">PRESENT ADDRESS</div>
                <div className="polygon"></div>
                <div className="line57"></div>
              </div>
            </div>

            <div className="bodyRows">
              <div className="flex-item" style={{ width: "40%" }}>
                <label>
                  STREET NAME <span className="required">*</span>
                </label>
                <Input
                  id="streetName"
                  type="text"
                  className={validationErrors.streetName && "inputDanger"}
                  onChange={(e) => onInputChange("streetName", e.target.value)}
                />
              </div>
              <div className="flex-item">
                <label htmlFor="country">
                  COUNTRY <span className="required">*</span>
                </label>
                <Select
                  id="country"
                  defaultValue="Select"
                  className={validationErrors.presentCountry && "selectDanger"}
                  options={countryList}
                  onChange={(e) => onInputChange("presentCountry", e)}
                />
              </div>
              <div className="flex-item">
                <label htmlFor="cityOfBirth">
                  CITY OF BIRTH <span className="required">*</span>
                </label>
                <Select
                  id="cityOfBirth"
                  defaultValue="Select"
                  options={presentCityList}
                  className={validationErrors.presentCity && "selectDanger"}
                  onChange={(e) => onInputChange("presentCity", e)}
                />
              </div>
              <div className="flex-item">
                <label htmlFor="zipcode">
                  ZIPCODE <span className="required">*</span>
                </label>
                <Input
                  id="zipcode"
                  type="text"
                  className={validationErrors.zipcode && "inputDanger"}
                  onChange={(e) => onInputChange("zipcode", e.target.value)}
                />
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddDriverModal;
