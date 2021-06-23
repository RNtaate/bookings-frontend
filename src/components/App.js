import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <h1>Norp Massage Parlor</h1>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
