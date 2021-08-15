import { Type } from "es-abstract";
import React,{Component} from "react";
import {variables} from './Variables.js';
export class ParkingLot extends Component{
    constructor(props){
        super(props);
        this.state = {
            parkingSlots:[],
            modalTitle:"",
            id:"",
            state:"",
            type:""

        }
    }
    refreshList(){
        fetch(variables.API_URL+'parkingslot/spaces')
        .then(response=>response.json())
        .then(data=>{
            this.setState({parkingSlots:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    changeState=(e)=>{
        this.setState({state:e.target.value});
    }
    changeType=(e)=>{
        this.setState({type:e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Add parking slot",
            id:"",
            state : "",
            type:""
        })
    }
    editClick(prk){
        this.setState({
            modalTitle:"Edit parking slot",
            id: prk.id,
            state : prk.state,
            type:prk.type
        })
    }
    createClick(){
        fetch(variables.API_URL+'parkingslot/spaces',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                state: this.state.state,
                type:this.state.type
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'parkingslot/spaces'+'/'+this.state.id,
        {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                state: this.state.state,
                type:this.state.type
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure? No going back')){

        
        fetch(variables.API_URL+'parkingslot/spaces/'+id,
        {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    render(){
        const{
            parkingSlots,
            modalTitle,
            id,
            state,
            type
        }=this.state;
        return(

            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalPOST"
                onClick={()=>this.addClick()}>
                    Add Parking Slot 
                </button>
                <table className ="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                State
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {parkingSlots.map(prk=>
                            <tr key={prk.id}>
                                <td>{prk.id}</td>
                                <td>{prk.state}</td>
                                <td>{prk.type}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalPUT"
                                    onClick={()=>this.editClick(prk)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1"
                                    onClick={()=>this.deleteClick(prk.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    </button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModalPUT" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                        </button>
                    </div>
                    <div className="modal-body">
                        
                        <div className="input-group mb-3">
                            <span className = "input-group-text">
                            State
                            </span>
                            <input type="text" className="form-control" value={state} onChange={this.changeState}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className = "input-group-text">
                            Type
                            </span>
                            <input type="text" className="form-control" value={type} onChange={this.changeType}/>
                        </div>
                        
                        <button type="button" className="btn btn-primary float-start" onClick={()=>this.updateClick()}>
                            Update
                        </button>

                    </div>
                </div>
                </div>
                </div>
                <div className="modal fade" id="exampleModalPOST" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <span className = "input-group-text">
                            Type
                            </span>
                            <input type="text" className="form-control" value={type} onChange={this.changeType}/>
                        </div>
                        
                        <button type="button" 
                        className="btn btn-primary float-start" onClick={()=>this.createClick()}>
                            Create
                        </button>
                        
                        
                    </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}