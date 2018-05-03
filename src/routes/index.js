import BooksContainer from '../pages/Books'
import Login from '../components/Login'


const routes = [
  {
    path: "/login",
    exact: true,
    name: "",
    component: Login
  },
  {
    path: "/",
    exact: true,
    name: "books",
    component: BooksContainer
  }
];


export default routes;