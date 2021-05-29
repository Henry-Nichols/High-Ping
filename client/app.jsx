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
        let genreGamesMap = new Map()
        genreGames.forEach(game => {
          genreGamesMap.set(game.id, game);
        });
  //      console.log(genreGamesMap)
        let promises = [];
        genreGames.forEach((game, index, self) => {
          promises.push(axios.get(`http://localhost:3001/getGames/${game.id}`));
        });


        Promise.all(promises).then((gamesWithImage) => {
    //      console.log(gamesWithImage)
          gamesWithImage.forEach(gameWithImage => {
  //          console.log(genreGamesMap.get(gameWithImage.data.id));
            let gameGenre = genreGamesMap.get(gameWithImage.data.id);
            //gameGenre.["background_image"] = gameWithImage.data.background_image;

            let temp = {
              id: gameGenre.id,
              name: gameGenre.name,
              background_image: gameWithImage.data.background_image
            };
            mergedData.push(temp);

          })

          console.log(mergedData);

          this.setState({ games: mergedData });
  //        this.forceUpdate();
        });


      })


  }

  render() {
    return (
      <div>
        <Navbar handleGenreSelection={ this.handleGenreSelection } />
        <Home games={this.state.games}/>
      </div>
    );
  }
}
