import React, { useState, useEffect } from "react";
import { useInput } from "./hooks-input";
import Presenter from "./Presenter";
import API_URL from "../nav/config";
import "../index.css";

const Output = () => {
  const {
    value: name,
    bind: bindNameInput,
    reset: resetNameInput
  } = useInput("");
  const { value: days, bind: bindDaysInput, reset: resetDaysInput } = useInput(
    ""
  );
  const { value: costInput, bind: bindCostInput } = useInput("");
  const { value: costUpdate, bind: bindCostUpdate } = useInput(costInput);
  const [cost, setCost] = useState(1500);
  const [people, setPeople] = useState([""]);
//   const [daysPerPerson, setDaysPerPerson] = useState([0]);
  // const [totalDays, setTotalDays] = useState(0)
  const [read, setRead] = useState([]);
//   const [pricePerDayPerPerson, setPricePerDayPerPerson] = useState(0);
  const [math, setMath] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const formData = { name, days };

  const handleSubmit = async event => {
    event.preventDefault();
    await fetch(`http://localhost:3000/data/create`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "content-type": "application/json" }
    })
      .then(resetNameInput())
      .then(resetDaysInput())
      .catch(err => console.log(err));
  };

  const totalCostSubmit = event => {
    event.preventDefault();
    setCost(costInput);
  };

  const costUpdateSubmit = event => {
    event.preventDefault();
    setCost(costUpdate);
  };

  const calculateTotals = () => {
    alert("Display how much each person owes here");
  };

  // need to update the display
  const normalOutput = () => {
    return (
      <div>
        <p>
          {people.length > 1
            ? people[people.length - 1] + " has successfully been added"
            : null}{" "}
          <br />
          {people.length > 1
            ? "A total of " + (people.length - 1) + " people"
            : null}
        </p>
        {/* <p>{nameAndDaysDisplayArray} </p> */}
        <p>Your current cost is {cost}</p>
      </div>
    );
  };

  const readData = async event => {
    await fetch(`${API_URL}/data/read`)
      .then(res => res.json())
      .then(data =>
        data.map(element => <Presenter read={element} refresh={readData} />)
      )
      .then(components => setRead(components))
      .then(console.log(read))
      .catch(err => console.log(err));
  };

  const pullDays = async () => {
    await fetch(`${API_URL}/data/read`)
      .then(res => res.json())
      .then(data => data.map(element => element.days))
      .then(num => num.map(x => parseInt(x, 10)))
      .then(days => setMath(days))
      .catch(err => console.log(err));
  };

  const calculateTotalDays = () => {
    console.log(math.reduce(reducer));
  };

  function updatePage() {
    return setIsUpdating(isUpdating === false ? true : false);
  }

  useEffect(() => {
    pullDays();
    readData();
  });

  return (
    <div className="container">
      {/* <!-- Button trigger modal --> */}
      <form className="homeForm d-flex justify-content-center flex-column homeForm">
        <input
          type="number"
          name="Total Cost"
          value={cost}
          placeholder="Total Cost of Trip"
          {...bindCostInput}
          min="500"
          max="1000000"
          required
        />{" "}
        <br />
        <button
          type="submit"
          className="btn btn-primary home-button"
          data-toggle="modal"
          data-target="#homeModal"
          onClick={totalCostSubmit}
        >
          Set Cost and Start Calculating!
        </button>
        {read}
        <button
          type="button"
          className="btn btn-light mt-2 mx-5 d-flex justify-content-center"
          data-toggle="modal"
          data-target="#homeModal"
          style={{
            color: "black",
            backgroundColor: "rgba(192, 192, 192, 0.5)"
          }}
        >
          Open Calculator
        </button>
        <button onClick={calculateTotalDays}>Calculate Totals</button>
      </form>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="homeModal"
        style={{ backgroundColor: "rgba(275, 160, 148, 0.1)" }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Add in your friends, and how many days they stayed
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-inputs d-flex justify-content-between">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="active nameInput"
                    name="Name"
                    value={name}
                    placeholder="Name"
                    style={{ width: "15vw" }}
                    {...bindNameInput}
                    required
                  />{" "}
                  <br />
                  <input
                    type="number"
                    className="daysInput"
                    name="Days Stayed"
                    value={days}
                    placeholder="# of days stayed"
                    style={{ width: "15vw" }}
                    {...bindDaysInput}
                    min="1"
                    max="7"
                    required
                  />{" "}
                  <br />
                  <input type="submit" value="Submit" />
                </form>
                <div>
                  <div className="dropdown" id="costUpdateDropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle btn-sm"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Update Cost
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <form className="cost-input d-flex justify-content-center flex-column m-0">
                        <input
                          type="number"
                          className="mx-1"
                          name="Total Cost"
                          value={costUpdate}
                          {...bindCostUpdate}
                          min="500"
                          max="1000000"
                          required
                        />{" "}
                        <br />
                        <button
                          type="submit"
                          className="btn btn-info mx-1 p-1"
                          onClick={costUpdateSubmit}
                          data-toggle="dropdown"
                          data-target="#costUpdateDropdown"
                        >
                          Update Cost
                        </button>
                      </form>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => updatePage()}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="d-flex flex-column">
                {isUpdating ? null : normalOutput()}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={calculateTotals}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
