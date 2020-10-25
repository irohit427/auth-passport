import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'
import { Provider } from './context';
import {ProtectedRoute} from './ProtectedRoutes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <ProtectedRoute path={["/", "/home"]} exact component={Home}></ProtectedRoute>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </BrowserRouter>
      </Provider>
  );
}

export default App;
