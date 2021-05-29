import React from 'react';


export default class Home extends React.Component {


  render() {
    return (
      <ul className="container">
        {
          this.props.games.map(game => {
   //         console.log(game)
            console.log(game.id)
            console.log(game.name)
            console.log(game.background_image);
            return (
              <li className="list-game" key={ game.id }>
                <img className="game-image" src={ game.background_image }></img>
                <h2 className="game-name" >{ game.name }</h2>
              </li>
            )
          })
        }
      </ul>
    );
  }
}
