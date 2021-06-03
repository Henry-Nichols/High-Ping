import axios from 'axios';
import React from 'react';

export default class Navbar extends React.Component {
  constructor(){
    super();
    this.state = {
      displaySort: false,
      displayGenre: false,
      displayHamburger: false,
      genres: []
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

  handleGenreSelection = (id) => {
    this.setState({ displayHamburger: false });
    this.props.handleGenreSelection(id);
  }

  handleSortSelection = (sortby) => {
    this.setState({ displayHamburger: false });
    this.props.handleSortSelection(sortby)
  }

  componentDidMount() {
    axios.get('/api/getGenres')
      .then(res => {
        let genres = [];
        res.data.results.map((value, index, self) => {
          let genre = {id: value.id, name: value.name};
          genres.push(genre);
        })
        this.setState({ genres: genres })
      })
    }

  render() {
    return (
      <nav className="navbar">
        <h1 onClick={ this.props.handleHomeScreen } className="name-logo">High Ping</h1>
        <div className="menu-icons" onClick={ this.handleClick }>
          <i className={ this.state.displayHamburger ? 'fas fa-times x-icon' : 'fas fa-bars hamburger-icon' }></i>
        </div>
        <ul className={ this.state.displayHamburger ? 'nav-menu clicked' : 'nav-menu' }>

          <li className='nav-links' key='01'>
            <a onClick={ this.handleDropDown }>
              Sort
              <i className={ this.state.displaySort ? 'fas fa-chevron-up up-arrow' : 'fas fa-chevron-down down-arrow' }></i>
            </a>
            <ul className={ this.state.displaySort ? 'sort-menu clicked' : 'sort-menu' }>
              <li onClick={ () => { this.handleSortSelection('Highest Rated') }} className="sort-list">
                Highest Rated
              </li>
              <li onClick={ () => { this.handleSortSelection('Top Sellers') }} className="sort-list">
                Top Sellers
              </li>
              <li onClick={ () => { this.handleSortSelection('Most Played') }} className="sort-list">
                Most Played
              </li>
            </ul>
          </li>

          <li className='nav-links' key='02'>
            <a onClick={ this.handleGenre }>
              Genre
              <i className={ this.state.displayGenre ? 'fas fa-chevron-up up-arrow' : 'fas fa-chevron-down down-arrow' }></i>
            </a>
            <ul className={ this.state.displayGenre ? 'genre-menu clicked' : 'genre-menu' }>
              {
                this.state.genres.map(genre => {
                  return (
                    <li onClick={ () => { this.handleGenreSelection(genre.id) } } className='genre-list' key={ genre.id }>
                      { genre.name }
                    </li>
                  )
                })
              }
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
