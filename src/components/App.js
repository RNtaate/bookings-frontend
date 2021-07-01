import './stylesheets/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';
import Appointments from '../containers/Appointments';
import MassageDetails from '../containers/MassageDetails';

function App() {
  return (
    <BrowserRouter>
      <h1>Norp Massage Parlor</h1>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/appointments" component={Appointments} />
        <Route path="/massage" component={MassageDetails} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
