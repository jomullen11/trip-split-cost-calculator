import React from 'react'
import { useInput } from "./hooks-input";
import API_URL from '../nav/config'

const Update = (props) => {
    const read = props.read
    const [name, setName] = useInput(read.name)
    const [days, setDays] = useInput(read.days)

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch(`${API_URL}/data/update/${read._id}`, {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify()
        })
    }

return(
    <>

    </>
)

}

export default Update