import React from 'react';
import Home from './pages/home';
import Navbar from './navbar'
import axios from 'axios';

export default class App extends React.Component {

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

  handleSortSelection = (sortby) => {
    const games = this.state.games;
    if (sortby === 'Most Played') {
      games.sort((a, b) => (a.added_by_status.playing < b.added_by_status.playing) ? 1 : -1);
    } else if (sortby === 'Top Sellers') {
      games.sort((a, b) => (a.added_by_status.owned < b.added_by_status.owned) ? 1 : -1)
    } else if (sortby === 'Highest Rated') {
      games.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
    }
    this.setState({ games: games })
  }

  handleGenreSelection = (id) => {
    let genreGames = [];
    let mergedData = [];
    axios.get('http://localhost:3001/getGenres')
      .then(res => {
        res.data.results.map((value, index, self) => {
          if(value.id === id){
            genreGames.push(...value.games);
            return;
          }
        })
        const genreGamesMap = new Map()
        genreGames.forEach(game => {
          genreGamesMap.set(game.id, game);
        });
        let promises = [];
        genreGames.forEach((game, index, self) => {
          promises.push(axios.get(`http://localhost:3001/getGames/${game.id}`));
        });
        Promise.all(promises)
          .then((gamesWithImage) => {
            gamesWithImage.forEach(gameWithImage => {
              const gameGenre = genreGamesMap.get(gameWithImage.data.id);
              const temp = {
                id: gameGenre.id,
                name: gameGenre.name,
                background_image: gameWithImage.data.background_image
              };
              mergedData.push(temp);
            })
            this.setState({ games: mergedData });
          });
        })
      }

  render() {
    return (
      <div>
        <Navbar handleSortSelection={ this.handleSortSelection } handleGenreSelection={ this.handleGenreSelection } />
        <Home games={this.state.games}/>
      </div>
    );
  }
}
