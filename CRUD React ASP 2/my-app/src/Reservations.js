import React,{Component} from "react";
import {variables} from './Variables.js';
export class Reservations extends Component{
    constructor(props){
        super(props);
        this.state = {
            reservationsList:[],
            modalTitle:"",
            licensePlate:"",
            idSlotAssigned:"",
            time:""

        }
    }
    refreshList(){
        fetch(variables.API_URL+'reservations')
        .then(response=>response.json())
        .then(data=>{
            this.setState({reservationsList:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    changeLicensePlate=(e)=>{
        this.setState({licensePlate:e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Reserve your space",
            licensePlate:"",
            idSlotAssigned: "",
            time:""
        })
    }
    createClick(){
        fetch(variables.API_URL+'reservations',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                licensePlate: this.state.licensePlate,
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
    deleteClick(idSlotAssigned){
        if(window.confirm('Are you sure? No going back')){
        
        fetch(variables.API_URL+'reservations/'+idSlotAssigned,
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
            reservationsList,
            modalTitle,
            licensePlate,
            idSlotAssigned,
            time
        }=this.state;
        return(

            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalPOST"
                onClick={()=>this.addClick()}>
                    Reserve your slot 
                </button>
                <table className ="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                License Plate
                            </th>
                            <th>
                                ID Slot Assigned
                            </th>
                            <th>
                                Time
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservationsList.map(rsv=>
                            <tr key={rsv.idSlotAssigned}>
                                <td>{rsv.licensePlate}</td>
                                <td>{rsv.idSlotAssigned}</td>
                                <td>{rsv.time}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                    onClick={()=>this.deleteClick(rsv.idSlotAssigned)}>
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
                            License Plate
                            </span>
                            <input type="text" className="form-control" value={licensePlate} onChange={this.changeLicensePlate}/>
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