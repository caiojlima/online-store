import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Details from './Pages/Details';
import Checkout from './Pages/Checkout';
import CreateProfile from './Pages/CreateProfile';
import EditProfile from './Pages/EditProfile';

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/checkout" component={ Checkout } />
        <Route path="/cart" component={ Cart } />
        <Route path="/details/:id" component={ Details } />
        <Route path="/profile/new" component= { CreateProfile } />
        <Route path="/profile/edit" component= { EditProfile } />
        <Route exact path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
