import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'reactstrap';

const MyFunctionalComponent = (props) => {

    function componentMount() {
        alert("Component Rendered");
    }

    function componentUnMount() {
        alert("Leaving The Component");
    }

    // useEffect(() => {
    //     componentMount();
    //     return () => {
    //         componentUnMount();
    //     }
    // }, [])

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

    /* Conditional Rendering */
    let nazimAge = () => {
        if (age > 25) {
            return (<p>Nazim has more than 25 years</p>)
        }
        else {
            return (<p>Nazim has  25 years old or less</p>)
        }
    }

    /*Iteration*/
    let users = [
       
            {name: 'Nazim', age: 20},
            {name: 'Emon', age: 25},
            {name: 'Akash', age: 26},
            {name: 'Shourav', age: 30}
    ]

    // Form

    const [userName, setUserName] = useState("Nazim");
    const handleUserNameChange = (event) =>{
        setUserName(event.target.value);
    }
    const handleSubmit = (event) =>{
        alert("Form Submitted. Value: " + userName);
    }

    // Iteration Example 1
    let usersList = users.map((user)=>
        <li key={user.name}>Name: {user.name} - Age: {user.age}</li>
    );

    // Refs
    const inputRefName = useRef(null);
    const inputRefTelephone = useRef(null);
    const clearRefFields = () =>{
        inputRefName.current.value="";
        inputRefTelephone.current.value="";
        inputRefName.current.focus();
    }

    return (
        <div className='mb-5'>
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
            <h4>Conditional Rendering</h4>

            {/*Example 1 - If/else*/}
            {nazimAge()}

            {/*Example 2 - Ternary Operator*/}
            <p>{age > 25 ? "Nazim is more then 25 years old" : "Nazim is  25 years old or less"}</p>

            {/*Example 3 - short-circuit operator*/}
            {age > 25 && <p>Nazim is more then 25 years old</p> }
            {age <= 25 && <p>Nazim is  25 years old or less</p>}

            {/* Example 4 - Imediately invoked function*/}
            {
                (() => {
                    switch (age) {
                        case 25: return <p>Nazim 25 years old</p>
                        default: return <p>Nazim has not 25 years old</p>
                    }
                })()
            }

            {/* Iteration */}
            <hr />
            <hr />
            <h4>Iteration</h4>
            <ul>
                {/* Example 1 */}
                {usersList}

                {/* Example 2 */}
                <br></br>
                {
                    users.map((user)=>
                    <li key={user.name}>Name: {user.name} - Age: {user.age}</li>)
                }
            </ul>

            {/* Form */}
            <hr></hr>
            <h4>Form</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={userName} onChange={handleUserNameChange}></input>
                </label>
                <input type="Submit" value="Submit"></input>
            </form>

            {/* REFS */}
            <hr></hr>
            <h4>Refs</h4>
            <label>
                Name:
                <input type="text" ref={inputRefName}></input>
            </label>
            <label>
                TelePhone:
                <input type="text" ref={inputRefTelephone}></input>
            </label>
            <button onClick={clearRefFields}>Clear Fields</button>

        </div>
        )
}

export default MyFunctionalComponent;