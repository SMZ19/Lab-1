import logo from './logo.svg';
import './App.css';
import {Home} from './Home'; 
import {ParkingLot} from './ParkingLot'; 
import {Reservations} from './Reservations';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className= "d-flex justify-content-center m-3">
        Parking Lot 1998
      </h3>
      <nav className = "navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className = "nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to ="/home">
              Home
            </NavLink>
          </li>
          <li className = "nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to ="/parkinglot">
              Parking Lot
            </NavLink>
          </li>
          <li className = "nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to ="/reservations">
              Reservations
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path = '/home' component={Home}/>
        <Route path = '/parkinglot' component={ParkingLot}/>
        <Route path = '/reservations' component={Reservations}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
