import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Recipe from './components/Recipe'



function App() {
  return (
    <div >
      <Nav />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/recipe' component={Recipe} />
        

      </Switch>
    </div>
  );
}

export default App;
