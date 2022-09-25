import React, { useEffect, useState } from 'react'

const MyFunctionalComponent = (props) => {

    function componentMount() {
        alert("Component Rendered");
    }

    function componentUnMount() {
        alert("Leaving The Component");
    }

    useEffect(() => {
        componentMount();
        return () => {
            componentUnMount();
        }
    }, [])

    /*STATE*/

    const [age, setAge] = useState(20);

    /*Event Handling*/

    const onChangeAgeInput = (event) => {
        alert("Age has Changed");
        setAge(parseInt(event.target.value));
    }

    const showDetails = (telephone) => {
        alert(`Name: ${props.name ? props.name : 'Emon'} | Age: ${age} | TelePhone: ${telephone}`)
    }

    return (
        <div>
            <h2>My Functional Component</h2>
            { /* Props */}
            <h4>PROPS</h4>
            <hr></hr>
            <h4>Name: <b>{props.name ? props.name : "Emon"}</b></h4>

            { /* STATE */}
            <hr></hr>
            <h4>STATE</h4>
            <span>
                <b>Age:</b> <input type="number" value={age} onChange={onChangeAgeInput} /> <br /><br />
                <button className="btn btn-primary" onClick={() => setAge(age + 1)}>Increase Age</button>
                <button className="btn btn-primary" onClick={() => setAge(age - 1)}>Decrease Age</button>
            </span>

            { /* Event Handling */}
            <hr />
            <hr />
            <h4>Event Handling</h4>
            <button onClick={showDetails.bind(this, 1919550482)}>Show Details</button>

            { /* Conditional Rendering */}
            <hr />
            <hr />

        </div>
        )
}

export default MyFunctionalComponent;