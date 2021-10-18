import './App.css';
import Login from './views/Login'
import Home from './views/Home'
import { Route, Switch } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';

function App() {
  return (
    <div className="wrapper">
      <Switch> 
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <ProtectedRoute 
          exact path="/home" component={Home}
          />
      </Switch>
    </div>
  );
}

export default App;
