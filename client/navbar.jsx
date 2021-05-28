import React from 'react';
import Menu from './Menu';

export default class Navbar extends React.Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <nav className="navbar">
        <h1 className="name-logo">High Ping</h1>
        <div className="menu-icons" onClick={ this.handleClick }>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={ this.state.clicked ? 'nav-menu clicked' : 'nav-menu'}>
          { Menu.map(item => {
            return (
              <li key={ item.id }>
                <a className={ item.cName } href={ item.url }>
                  { item.title }
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
