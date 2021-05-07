import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

import { fetchBooksFromAPI } from './js/api-fetch';
import { Search } from './js/search';
import { Books } from './js/books';

class Base extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      books: []
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
    fetchBooksFromAPI(query)
      .then(books => {
        this.setState({books});
      });
  }

  render () {
    return (
      <div className="wrapper">
        <header>
          <h1>Book Finder</h1>
        </header>
        <div className="search-wrapper">
          <Search 
            onChange={(userIn) => this.handleChange(userIn)}
            onClick={() => this.handleClick()}
          />
        </div>
        <div className="books-wrapper">
          <Books bookList={this.state.books} />
        </div>
      </div>
    );
  }
}

// ========================================================
ReactDOM.render(<Base />, document.getElementById('root'));