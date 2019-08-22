import React, { useState, Fragment } from 'react'
import API_URL from '../nav/config'

// class Presenter extends Component {
//     state = {
//         isUpdating: false
//     }
//     render() {
//     console.log('Hello')
//     const read = this.props.read
//     return(
//         <>
//         <fieldset>
//                 <ul>
//                     <h2>{read.name} stayed {read.days}}</h2>
//                 </ul>
//                 { this.state.isUpdating ? <this.updateForm /> : <this.buttons />}
//             </fieldset>
//         </>
//     )
// }
// }

const Presenter = (props) => {
    const [isUpdating, setIsUpdating] = useState(true)
    const read = props.read

    const handleDelete = async () => {
        await fetch(`${API_URL}/data/delete/${read.id}`)
    }

    const toggleUpdate = () => {
        setIsUpdating(!isUpdating)
    }

    // const updateForm = () => (

    // )

    const buttons = () => (
        <Fragment>
            <input type='button' className="btn btn-danger" value="Delete" onClick={handleDelete} />
            <input type='button' className="btn btn-info" value="Update" onClick={toggleUpdate} />
        </Fragment>
    )


    return(
        <>
        <fieldset>
        <h2>{read.name} stayed {read.days} days</h2> <br />
        { isUpdating ?  <updateForm /> : <buttons />}
        </fieldset>
        </>
    )
}

export default Presenter