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
            time:"",
            actualPage : 0,
            totalPages: 0

        }
        
    }
    refreshList(page){
        fetch(variables.API_URL+'reservations/page/' + page)
        .then(response=>response.json())
        .then(data=>{
            this.setState({reservationsList:data});
        });
    }
    componentDidMount(){
        fetch(variables.API_URL+'reservations/pages/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({totalPages:data});
            console.log(this.state.totalPages);
        });
        
        this.refreshList(0);

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
    paginaSiguienteClick(t,a){
        console.log(a);

        if(t-1>a){
            this.refreshList(a + 1);
         this.setState((state) => {
        
    return {actualPage: a + 1}

  });

        
    }
    }
    paginaAnteriorClick(a){
        console.log('Anterior');
         console.log(a);
        if(a>0){
            this.refreshList(a-1);
         this.setState((state) => {
    return {actualPage: state.actualPage - 1}
  });
        
    }
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
            time,
            actualPage,
            totalPages
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
                  <table className ="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <button type="button" className="btn btn-primary m-2 float-end"  disabled={actualPage == 0 } onClick={()=>this.paginaAnteriorClick(actualPage)}>Anterior</button>

                            </th>
                            <th>
                             <button className="btn m-2 float-end">{actualPage+1} </button>
                            </th>

                            <th>
                                <button type="button" className="btn btn-primary m-2 float-end"  disabled={actualPage == totalPages-1 } onClick={()=>this.paginaSiguienteClick(totalPages,actualPage)}>Siguiente</button>
                            </th>

                        </tr>
                    </thead>
                 
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