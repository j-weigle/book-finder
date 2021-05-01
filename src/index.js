import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

class Result extends React.Component {
}

class Results extends React.Component {
  render () {
    return( // will return an array of Result objects (Books)
      <div class="results-area">
      </div>
    );
  }
}

class Search extends React.Component {
  render () {
    return(
      <div class="search-area">
        <input
          onChange={this.props.onChange}
        />
        <button id="search-btn" onClick={this.props.onClick}>Search</button>
      </div>
    );
  }
}

class Base extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleChange (userIn) {
    this.setState({
      query: userIn.target.value
    });
  }

  handleClick () {
    const { query } = this.state;
    if (!query) return;
    alert('user clicked submit with query: ' + query);
  }

  render () {
    return (
      <div class="wrapper">
        <header>
          <h1>Book Finder</h1>
        </header>
        <div class="search-wrapper">
          <Search 
            onChange={(userIn) => this.handleChange(userIn)}
            onClick={() => this.handleClick()}
          />
        </div>
        <div class="results-wrapper">
          <Results />
        </div>
      </div>
    );
  }
}

// ========================================================
ReactDOM.render(<Base />, document.getElementById('root'));