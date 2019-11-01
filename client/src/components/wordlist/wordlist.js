import React, { Component } from 'react';
import './wordlist.css';

class Wordlist extends Component {
  constructor() {
    super();
    this.state = {
      wordlist: []
    };
  }

  componentDidMount() {
    fetch('/api/wordlist')
      .then(res => res.json())
      .then(wordlist =>
        this.setState({ wordlist }, () =>
          console.log('Wordlist fetched:', wordlist)
        )
      );
  }
  render() {
    return (
      <div className="word-list">
        <h2>Word List</h2>
        <ul class="ul-wordlist">
          <li>Rank Word Length</li>
          {this.state.wordlist.map(word => (
            <li key={word.rank}>
              {word.rank}__ {word.word}__
              {word.length}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Wordlist;
