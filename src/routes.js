import React from 'react'
import BooksContainer from './pages/Books'


const routes = [
  // {
  //   path: "/someroute",
  //   exact: true,
  //   component: () => <div>Route</div>
  // },
  {
    path: "/",
    exact: true,
    component: BooksContainer
  }
];

export default routes;
