import React, { Component } from 'react';
import './App.css';
import Wordlist from './components/wordlist/wordlist';

class App extends Component {
  render() {
    return (
      <div className="App" ref={el => (this.div = el)}>
        <div className="body">
          <h1 className="app-title">Welcome To The Crossword Game!</h1>
          <div className="main-body">
            <div className="input-game-setting">
              <form id="input-form">
                Select size of the game board:
                <input
                  className="radiobtn"
                  type="radio"
                  name="size-input"
                  value="11"
                />
                11 by 11
                <input
                  className="radiobtn"
                  type="radio"
                  name="size-input"
                  value="15"
                />
                15 by 15
                <input
                  className="input form"
                  id="submit-form"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
            <br />
            <div className="main-content">
              <div className="gameboard"></div>
              <div className="hintboard"></div>
            </div>
            <div className="status-board">
              <p className="status-board-text"></p>
            </div>
            <Wordlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
