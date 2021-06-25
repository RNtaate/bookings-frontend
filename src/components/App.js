import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';
import Appointments from '../containers/Appointments';

function App() {
  return (
    <BrowserRouter>
      <h1>Norp Massage Parlor</h1>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/appointments" component={Appointments} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
