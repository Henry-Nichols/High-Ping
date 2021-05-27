import React from 'react';
import Home from './pages/home';
import Navbar from './navbar'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}
