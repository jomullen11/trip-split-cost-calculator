import React, { useState, useEffect } from 'react';
import { useInput } from './hooks-input'
import API_URL from './nav/config'

function App() {
  const { value:person, bind:bindPersonInput, reset:resetPersonInput } = useInput('');
  const { value:days, bind:bindDaysInput, reset: resetDaysInput } = useInput('');
  const { value:costInput, bind:bindCostInput } = useInput('');
  const { value:costUpdate, bind:bindCostUpdate } = useInput(costInput);
  const [cost, setCost] = useState(1500)
  const [people, setPeople] = useState([''])
  const [daysPerPerson, setDaysPerPerson] = useState([0])
  const [totalDays, setTotalDays] = useState(0)
  const [pricePerDayPerPerson, setPricePerDayPerPerson] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [math, setMath] = useState([])
  const daysForMath = []

  const formData = { person, days }
  const handleSubmit = async (event) => {
    event.preventDefault()
    await fetch(`http://localhost:3000/data/create`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'content-type': 'application/json'}
    }).then(console.log(formData))
    .catch(err => console.log(err))
  }

  const pullDays = async () => {
    await fetch(`${API_URL}/data/read`)
    .then(res => res.json())
    .then(data => data.map(element => element.days))
    .then(days => setMath(days))
    .catch(err => console.log(err))
  }

  const totalCostSubmit = (event) => {
    event.preventDefault()
    setCost(costInput)
  }

  console.log(math)

  const costUpdateSubmit = (event) => {
    event.preventDefault()
    setCost(costUpdate)
  }

  const calculateTotals = () => {
      alert("Display how much each person owes here")
  }

// need to update the display
  const normalOutput = () => {
    return(
      <div>
        <p>{ people.length > 1 ? people[((people.length) - 1)] + ' has successfully been added' : null } <br/>
        { people.length > 1 ? 'A total of ' + (people.length - 1)  + ' people' : null }</p>
        {/* <p>{personAndDaysDisplayArray} </p> */}
        <p>Your current cost is {cost}</p>
      </div>
  )}

  function updatePage () {
    return(
      setIsUpdating(isUpdating === false ? true : false)
    )
  }

  useEffect(() => {
    pullDays()
  })

  return (
    <>
    <div className='container'>
            {/* <!-- Button trigger modal --> */}
            <form className='homeForm d-flex justify-content-center flex-column homeForm'>
                <input type="number" name='Total Cost' value={cost} placeholder='Total Cost of Trip' {...bindCostInput} min='500' max='1000000' required /> <br/>
                <button type="submit" className="btn btn-primary home-button" data-toggle="modal" data-target="#homeModal" onClick={totalCostSubmit}>
                Set Cost and Start Calculating!
                </button>
                <button type="button" className="btn btn-light mt-2 mx-5 d-flex justify-content-center" data-toggle='modal' data-target="#homeModal" style={{color: 'black', backgroundColor: 'rgba(192, 192, 192, 0.5)'}}>Open Calculator</button>
            </form>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="homeModal" style={{backgroundColor: 'rgba(275, 160, 148, 0.1)'}} tabIndex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalCenterTitle">Add in your friends, and how many days they stayed</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                  <div className="modal-inputs d-flex justify-content-between">
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="active nameInput" name="Name" value={person} placeholder='Name' style={{width: '15vw'}} {...bindPersonInput} required /> <br />
                        <input type="number" className="daysInput" name="Days Stayed" value={days} placeholder='# of days stayed' style={{width: '15vw'}} {...bindDaysInput} min='1' max='7' required /> <br />
                        <input type="submit" value="Submit" />
                    </form>
                    <div>
                    <div className="dropdown" id='costUpdateDropdown'>
                      <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Update Cost
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <form className='cost-input d-flex justify-content-center flex-column m-0'>
                          <input type="number" className='mx-1' name='Total Cost' value={costUpdate} {...bindCostUpdate} min='500' max='1000000' required /> <br/>
                          <button type="submit" className="btn btn-info mx-1 p-1" onClick={costUpdateSubmit} data-toggle='dropdown' data-target="#costUpdateDropdown" >
                          Update Cost
                          </button>
                        </form>
                      </div>
                    </div>
                    <button type="button" className="btn btn-info" onClick={() => updatePage()}>Update</button>
                    </div>
                  </div>
                  <div className='d-flex flex-column'>
                    { isUpdating ? 
                      null : normalOutput()
                    }
                  </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={calculateTotals}>Calculate</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  );
}

export default App;
