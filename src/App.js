import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './pages/home/home';
import Todo from './pages/todo/todo';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/todo">Liste des tâches</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/todo" component={Todo} />
      </Switch>

    </Router>
  );
}

export default App;
