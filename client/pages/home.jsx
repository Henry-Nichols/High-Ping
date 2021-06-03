import React from 'react';


export default class Home extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <ul className="container">
        {
          this.props.games.map(game => {
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
