import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'


class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/" >
            home
          </Link>
          <Link to="/someroute">
            someroute
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
