import React from 'react'
import Books from './pages/Books'

const routes = [
  // {
  //   path: "/someroute",
  //   exact: true,
  //   component: () => <div>Route</div>
  // },
  {
    path: "/",
    exact: true,
    component: Books
  }
];

export default routes;
