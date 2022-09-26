import React, { useState } from 'react';
import axios from 'axios';

const LibraryComponent = (props) => {

    //LIst Libraries
    const [Librarieslist, setLibraryList] = useState([]);

    // Search 
    const [searchByPrmName,setSearchByPrmName] = useState('');

    const handleInputChange = (event) =>{
        setSearchByPrmName(event.target.value.toString());
    }

    const searchItems = () =>{
        let url = searchByPrmName != "" ? ("https://localhost:7214/api/Library/Search?name=" + searchByPrmName) : "https://localhost:7214/api/Library/Get";
        axios.get(url).then(response =>{
            setLibraryList(response.data);
        })
    }

    return (
        <div>
            <h2>Library</h2>
            <br></br>
            <div className='row'>
                {/* Search Area */}
                <div className='col-md-4'>
                    <div className='card border border-secondary shadow-0'>
                        <div className='card-header bg-secondary text-white'>
                            <b>Search</b> Library <span className='glyphcon glyphicon-search'></span>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <label className='form-label'>Name</label>
                                    <input className='form-control' placeholder='Enter Name' name='name' type='text' onChange={handleInputChange.bind(this)} value={searchByPrmName}></input>
                                </div>
                                <div className='col-md-5'>
                                    <label className='form-label'>&nbsp;</label>
                                    <div className='btn-toolbar'>
                                        <button type='button' onClick={searchItems.bind(this)} className='btn btn-primary form-control'>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* New Library */}
                <div className='col-md-8'>
                    <div className='card border border-secondary shadow-0'>
                        <div className='card-header bg-secondary text-white'>
                            <b>New</b> Library
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <label className='form-label'>Name</label>
                                    <input className='form-control' placeholder='Enter Name' name='name' type='text'></input>
                                </div>
                                <div className='col-md-3'>
                                    <label className='form-label'>Address</label>
                                    <input className='form-control' placeholder='Enter Address' name='address' type='text'></input>
                                </div>
                                <div className='col-md-3'>
                                    <label className='form-label'>TelePhone</label>
                                    <input className='form-control' placeholder='Enter Telephone' name='telephone' type='text'></input>
                                </div>
                                <div className='col-md-2'>
                                    <label className='form-label'>&nbsp;</label>
                                    <div className='btn-toolbar'>
                                        <button type='button' className='btn btn-success form-control'> Save </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            {/* Display Libraries */}
            <div className='card border border-secondary shadow-0'>
                <div className='card-header bg-secondary text-white'>
                    <b>Display</b> Libraries
                </div>
                <div className='card-body'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Telephone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td><input className='form-control' type='text' value='Name'></input></td>
                                <td><input className='form-control' type='text' value='Address'></input></td>
                                <td><input className='form-control' type='text' value='Telephone'></input></td>
                                <td>
                                    <div className='btn-toolbar'>
                                        <button className='btn btn-info mx-2'>Edit</button>
                                        <button className='btn btn-success mx-2'>Save</button>
                                        <button className='btn btn-danger mx-2'>Delete</button>
                                    </div>
                                </td>
                            </tr> */}
                            {Librarieslist.map(item => 
                                <tr key={item.name}>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.telephone}</td>
                                    
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LibraryComponent;