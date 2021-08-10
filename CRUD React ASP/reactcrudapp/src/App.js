import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function App() {
  const baseURL = "http://localhost:5000/parkingslot/spaces";
  const[data,setData]= useState([]);
  const[modalInsert, setModalInsert]=useState(false);
  const[selectedSpace, setSelectedSpace] = useState({
    id: '',
    state: '',
    type: ''
  })
  const handleChange=e=>{
    const {name, value} = e.target;
    setSelectedSpace({
      ...selectedSpace,
      [name]: value 
    });
    console.log(selectedSpace);
  }
  const manageStateModalInsert=()=>{
    setModalInsert(!modalInsert);
  }

  /*
  --------------------------------------------------HttpRequests--------------------------------------------------------
  */
  const GetRequest=async()=>{
    await axios.get(baseURL).then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const PostRequest=async()=>{
    delete selectedSpace.id;
    await axios.post( baseURL, selectedSpace )
    .then(response=>{
      setData(data.concat(response.data));
      manageStateModalInsert();
    }).catch(error=>{
      console.log(error);
    })
  }
  /*
  ----------------------------------------------------------------------------------------------------------------------
  */
  useEffect(()=>{
    GetRequest();
  },[])
  return (
    <div className="App">
      <br/><br/>
      <button onClick={()=>manageStateModalInsert()} className = "btn btn-success">Insert New Space</button>
      <br/><br/>
      <table className = "table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>State</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
        {data.map(parkingLot=>(
          <tr key= {parkingLot.id}>
            <td>{parkingLot.id}</td>
            <td>{parkingLot.state}</td>
            <td>{parkingLot.type}</td>
            <td>
              <button className = "btn btn-primary">Edit</button>{" "}
              <button className = "btn btn-danger">Delete</button>

            </td>
          </tr>
        ))}
        </tbody>

      </table>

      <Modal isOpen ={modalInsert}>
        <ModalHeader>Insert a space in the parking lot</ModalHeader>
        <ModalBody>
          <div className = "form-group">
            <label>Type: </label>
            <br />
            <input type ="text" className = "form-control" name="type" onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>PostRequest()}>Insert</button>{" "}
          <button className="btn btn-danger" onClick = {()=>manageStateModalInsert()}>Cancel</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
