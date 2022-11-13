import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { BrowserRouter, Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Header from './components/header/Header';
import About from './components/page/About';
import Todos from './components/todo/ViewTodos'
import AddTodo from './components/todo/AddTodo';
import UpdateTodo from './components/todo/UpdateTodo';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Landing from './components/page/Landing';
import NotFound from './components/page/NotFound';

import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('token') !== null){
      setIsAuthenticated(true);
    }
  }, [])

  return (
    // <BrowserRouter>
   
    <Router>
      
    <div className="App">
      
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      <div >
        <Switch>
        
          <Route exact path="/" render={(props) => (<Landing {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
          <Route exact path="/signin" render={(props) => (<Signin {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
          <Route exact path="/signup" render={(props) => (<Signup {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
          <Route exact path="/signout" render={(props) => (<Signout {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
          <Route exact path="/todo" render={(props) => (<Todos {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
          <Route exact path="/add" render={(props) => (<AddTodo {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
          <Route exact path="/update/:id" render={(props) => (<UpdateTodo {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
        
      </div>
      <ToastContainer/>
    </div>
    </Router>
    
  );
}

export default App;
