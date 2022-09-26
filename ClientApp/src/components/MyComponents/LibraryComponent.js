import React, { useState } from 'react';
import axios from 'axios';

const LibraryComponent = (props) => {

    //LIst Libraries
    const [Librarieslist, setLibraryList] = useState([]);

    // Search Libraries
    const [searchByPrmName,setSearchByPrmName] = useState('');

    const handleInputChange = (event) =>{
        setSearchByPrmName(event.target.value.toString());
    }

    const searchItems = () =>{
        let url = searchByPrmName != "" ? ("https://localhost:7214/api/Library/Search?name=" + searchByPrmName) : "https://localhost:7214/api/Library/Get";
        axios.get(url).then(response =>{
            response.data.map(item => {item.isEditing = false;})
            setLibraryList(response.data);
        })
    }

    //Update Libraries
    const handleLibraryInputChange = (pLibrary, pInput) =>{
        let LibrariesNewRef = [...Librarieslist] //create a copy of the object with new reference(new space in memory) //spread operator
        const index = LibrariesNewRef.findIndex((item) => item.name == pLibrary.name);
        const {name, value} = pInput.target; //get the name of the value of the property changed
        LibrariesNewRef[index] ={...pLibrary, [name]: value}; //update the specific property, keeping the others
        setLibraryList(LibrariesNewRef);
    }

    const updateEditingStatus = (pLibrary, editFlag) =>{
        let LibrariesNewRef = [...Librarieslist] 
        const index = LibrariesNewRef.findIndex((item) => item.name == pLibrary.name);
        LibrariesNewRef[index].isEditing = editFlag;
        setLibraryList(LibrariesNewRef);
    }

    const confirmUpdate=(pLibrary) => {
        axios.put("https://localhost:7214/api/Library/Update",pLibrary).then(response =>{
            let LibrariesNewRef = [...Librarieslist] 
            const index = LibrariesNewRef.findIndex((item) => item.name == pLibrary.name);
            LibrariesNewRef[index] = pLibrary;
            LibrariesNewRef[index].isEditing = false;
            setLibraryList(LibrariesNewRef);
        })
    }

    // Insert Libraries
    const [libraryToAdd, setlibraryToAdd] = useState({name: '', address: '', telephone: ''});
    
    const handleLibraryToAddInputChange =(pInput) =>{
        const {name, value} = pInput.target;
        let libraryToAddNewRef = {...libraryToAdd, [name]: value};
        setlibraryToAdd(libraryToAddNewRef);
    }

    const confirmNewLibrary = () =>{
        axios.post("https://localhost:7214/api/Library/Save", libraryToAdd).then(response =>{
            let LibrariesNewRef = [...Librarieslist] 
            LibrariesNewRef.push(response.data);
            setLibraryList(LibrariesNewRef);
            setlibraryToAdd({name: '', address: '', telephone: ''}); // clear the state
        })
    }

    //Delete Libraries

    const deleteLibrary = (pLibrary) =>{
        axios.delete("https://localhost:7214/api/Library/Delete", {data: pLibrary})
            .then(response =>{
                let LibrariesNewRef = [...Librarieslist] 
                const index = LibrariesNewRef.findIndex((item) => item.name == pLibrary.name);
                LibrariesNewRef.splice(index,1); // removing item from list
                setLibraryList(LibrariesNewRef);
            })
    }

    return (
        <div className='mb-4'>
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
                                    <input className='form-control' placeholder='Enter Name' name='name' value={libraryToAdd.name} onChange={handleLibraryToAddInputChange.bind(this)} type='text'></input>
                                </div>
                                <div className='col-md-3'>
                                    <label className='form-label'>Address</label>
                                    <input className='form-control' placeholder='Enter Address' name='address' value={libraryToAdd.address} onChange={handleLibraryToAddInputChange.bind(this)} type='text'></input>
                                </div>
                                <div className='col-md-3'>
                                    <label className='form-label'>TelePhone</label>
                                    <input className='form-control' placeholder='Enter Telephone' name='telephone' value={libraryToAdd.telephone} onChange={handleLibraryToAddInputChange.bind(this)} type='text'></input>
                                </div>
                                <div className='col-md-2'>
                                    <label className='form-label'>&nbsp;</label>
                                    <div className='btn-toolbar'>
                                        <button type='button' onClick={confirmNewLibrary.bind(this)} className='btn btn-success form-control'> Save </button>
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
                                    <td><input className='form-control' value={item.name} onChange={handleLibraryInputChange.bind(this,item)} name='name' disabled={!item.isEditing}></input></td>
                                    <td><input className='form-control' value={item.address} onChange={handleLibraryInputChange.bind(this,item)} name='address' disabled={!item.isEditing}></input></td>
                                    <td><input className='form-control' value={item.telephone} onChange={handleLibraryInputChange.bind(this,item)} name='telephone' disabled={!item.isEditing}></input></td>
                                    <td>
                                        <div className='btn-toolbar'>
                                            <button type='button' onClick={updateEditingStatus.bind(this, item, true)} className='btn btn-info mx-2' style={{ display: item.isEditing ? 'none' : 'block'}}>Edit</button>
                                            <button type='button' onClick={updateEditingStatus.bind(this, item, false)} className='btn btn-warning mx-2' style={{ display: item.isEditing ? 'block' : 'none'}}>Cancel</button>
                                            <button type='button' onClick={confirmUpdate.bind(this, item)} className='btn btn-success mx-2' style={{ display: item.isEditing ? 'block' : 'none'}}>Save</button>
                                            <button type='button' onClick={deleteLibrary.bind(this, item)} className='btn btn-danger mx-2'>Delete</button>
                                        </div>
                                    </td>
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