import React from 'react';
import  Menu  from './Menu'

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <h1 className="name-logo">High Ping</h1>
        <div className="menu-icons">
          <i className="fas fa-bars"></i>
        </div>
        <ul>
          { Menu.map((item, index) => {
            return (
              <li key={ item.id }>
                <a className={ item.cName } href={ item.url }>
                  { item.title }
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    );
  }
}
