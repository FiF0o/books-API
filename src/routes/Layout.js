import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import React from 'react';
import routes from './index'


const Layout = () =>
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/another">Another page</Link>
        </li>
      </ul>
    </nav>
    <div className="mdc-layout-grid">
      <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
      </Switch>
    </div>
  </div>

export default Layout