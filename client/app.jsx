import React from 'react';
import Home from './pages/home';
import Navbar from './navbar'
import Description from './pages/description'
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      page: 'Home',
      movieTrailer: "",
      description: ""
    };
  }

  componentDidMount() {
    axios.get('/api/getGames')
      .then(res => {
        this.setState({ games: res.data.results });
    });
  }

  handleHomeScreen = () => {
    this.setState({ page: 'Home' })
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
    axios.get('/api/getGenres')
      .then(res => {
        res.data.results.map((value, index, self) => {
          if (value.id === id) {
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
          promises.push(axios.get(`/api/getGames/${game.id}`));
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
            this.setState({ page: 'Home' })
          });
        })
      }

      handleGamesDescription = (id) => {
        let promises = [];
        promises.push(axios.get(`/api/getGames/${id}`))
        promises.push(axios.get(`/api/getTrailers/${id}`))

        Promise.all(promises)
          .then(data => {
            let trailerResult = 'No Data Found'
            const description = data[0].data
            const movieTrailer = data[1].data.results
            if (movieTrailer && movieTrailer.length > 0) {
              trailerResult = movieTrailer[0]
            }
            this.setState({ movieTrailer: trailerResult })
            this.setState({ description: description })
            this.setState({ page: 'Description' })
          })
    }

  render() {
    let page;
    if (this.state.page === 'Home') {
      page = <Home games={this.state.games} handleGamesDescription={this.handleGamesDescription} />
    } else if (this.state.page === 'Description') {
      page = <Description movieTrailer={ this.state.movieTrailer } description={ this.state.description } />
    }
    return (
      <div>
        <Navbar handleHomeScreen={ this.handleHomeScreen } handleSortSelection={ this.handleSortSelection } handleGenreSelection={ this.handleGenreSelection } />
        {page}
      </div>
    );
  }
}
