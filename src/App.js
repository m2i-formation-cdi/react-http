import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './pages/home/home';
import Todo from './pages/todo/todo';

function App() {
  return (
    <Router>
      <div className="col-8">
        <div>
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todo">Liste des tâches</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/todo" component={Todo} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
