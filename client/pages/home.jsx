import React from 'react';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/getGames')
      .then(res => {
        this.setState({ games: res.data.results });
    });
  }

  render() {
    return (
      <ul className="container">
        {
          this.state.games.map(game => {
            return (
              <li className="list-game" key={ game.id} >
                <img className="game-image" src={ game.background_image }></img>
                <h2 className="game-name">{ game.name }</h2>
              </li>
            )
          })
        }
      </ul>
    );
  }
}
