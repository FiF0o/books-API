import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import routes from './routes'


const App = () => {
  return (
    <section>
      <Header />
      <section>
        <Switch>
          {
            routes.map((route, key) =>
              <Route key={key} {...route}/>
            )
          }
        </Switch>
      </section>
    </section>
  );
};

export default App;
