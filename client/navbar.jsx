import axios from 'axios';
import React from 'react';

export default class Navbar extends React.Component {
  constructor(){
    super();
    this.state = {
      displaySort: false,
      displayGenre: false,
      displayHamburger: false
    }
  }

  handleClick = () => {
    this.setState({ displayHamburger: !this.state.displayHamburger });
  }

  handleDropDown = (e) => {
    this.setState({ displaySort: !this.state.displaySort })
  }

  handleGenre = () => {
    this.setState({ displayGenre: !this.state.displayGenre })
  }

  componentDidMount() {
    axios.get('http://localhost:3001/getGenres')
      .then(res => {
        this.setState({ genres: res.data.results })
      })
  }

  render() {
    return (
      <nav className="navbar">
        <h1 className="name-logo">High Ping</h1>
        <div className="menu-icons" onClick={ this.handleClick }>
          <i className={ this.state.displayHamburger ? 'fas fa-times' : 'fas fa-bars' }></i>
        </div>
        <ul className={ this.state.displayHamburger ? 'nav-menu clicked' : 'nav-menu' }>

          <li className='nav-links' key='01'>
            <a onClick={ this.handleDropDown }>
              Sort
              <i className={ this.state.displaySort ? 'fas fa-chevron-up' : 'fas fa-chevron-down' }></i>
            </a>
            <ul className={ this.state.displaySort ? 'sort-menu clicked' : 'sort-menu' }>
              <li className="sort-list">New and Trending</li>
              <li className="sort-list">Upcoming</li>
              <li className="sort-list">Most Played</li>
            </ul>
          </li>

          <li className='nav-links' key='02'>
            <a onClick={ this.handleGenre }>
              Genre
              <i className={this.state.displayGenre ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
            </a>
            <ul>
              <li>
                {

                }
              </li>
            </ul>
          </li>

          <li className='nav-links' key='03'>
            My Reviews
          </li>

          <li className='nav-links' key='04'>
            Wishlist
          </li>

        </ul>
      </nav>
    );
  }
}
