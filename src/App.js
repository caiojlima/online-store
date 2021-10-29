import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Details from './Pages/Details';
import Checkout from './components/Checkout';

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/checkout" component={ Checkout } />
        <Route path="/cart" component={ Cart } />
        <Route path="/details/:id" component={ Details } />
        <Route exact path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
