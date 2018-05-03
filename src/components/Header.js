import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'


class Header extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/" >
              home
            </Link>
          </li>
          <li>
            <Link to="/login">
              login {/*| signup*/}
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
