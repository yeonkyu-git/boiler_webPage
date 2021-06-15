import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';

// pages for this product 
import Navbar from './views/Navbar/Navbar';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import LandingPage from './views/LandingPage/LandingPage';


// null : Anyone can go inside 
// true : only logged in user can go inside
// false : logged in user can't go inside 
const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Suspense>
  )
}

export default App
