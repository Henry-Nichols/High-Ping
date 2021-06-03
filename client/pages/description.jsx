import React from 'react';
import ReactPlayer from 'react-player'

export default class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDescriptionSort: false,
      favoriteGame: false
    }
  }

  handleDisplay = () => {
    this.setState({ displayDescriptionSort: !this.state.displayDescriptionSort })
  }

  handleFavorite = () => {
    this.setState({ favoriteGame: !this.state.favoriteGame })
  }

  render() {
    let gameTrailer;
    if (this.props.movieTrailer === 'No Data Found') {
      gameTrailer = <img className="trailer-image" src={ this.props.description.background_image_additional } alt=""></img>
    } else {
      gameTrailer = <ReactPlayer width='100%' height='480px' controls url={this.props.movieTrailer.data.max} />
    }
    return (
      <ul className="container">

        <li>
          {gameTrailer}
        </li>

        <li className="game-container">
          <h2 className="game-title">
            {this.props.description.name}
          </h2>
          <i onClick={ this.handleFavorite } className={this.state.favoriteGame ? 'fas fa-star favorite-clicked' : 'far fa-star favorite-unclicked'}></i>
        </li>

        <ul className="description-container">
          <li className="description-tag" onClick={this.handleDisplay}>
            Description
            <i className={this.state.displayDescriptionSort ? 'fas fa-chevron-up up-arrow' : 'fas fa-chevron-down down-arrow'}></i>
          </li>
          <li className={this.state.displayDescriptionSort ? 'description' : 'description-clicked' }>
            <p className="description">{this.props.description.description_raw}</p>
          </li>
        </ul>

      </ul>
    );
  }
}
