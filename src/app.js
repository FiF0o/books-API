import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes'


const App = () => {
  return (
    <Switch>
      <div className="mdc-layout-grid">
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </div>
    </Switch>
  );
};

export default App;