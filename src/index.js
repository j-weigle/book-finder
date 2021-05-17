import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

import { fetchBooksFromAPI } from './js/api-fetch';
import { Search } from './js/search';
import { Books } from './js/books';
import { Pagination } from './js/pagination';

class Base extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      currentSearchQuery: '',
      books: [],
      currentPage: 0,
      loading: false,
    };
    this.booksPerPage = 10;
  }

  handleChange (userIn) {
    this.setState({
      query: userIn.target.value
    });
  }

  handleSearch () {
    const { query } = this.state;
    if (!query) return;
    this.setState({loading: true});
    fetchBooksFromAPI(query, 0, this.booksPerPage)
    .then(res => {
      this.setState({
        currentSearchQuery: query,
        currentPage: 1,
        books: res.books,
        loading: false,
      });
    });
  }

  handlePageChange (newPage) {
    const { currentSearchQuery, currentPage } = this.state;
    if (!currentSearchQuery) return;
    if (newPage === currentPage) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    const newStartIdx = (newPage - 1) * this.booksPerPage;

    this.setState({loading: true});
    fetchBooksFromAPI(currentSearchQuery, newStartIdx, this.booksPerPage)
    .then(res => {
      this.setState({
        currentPage: newPage,
        books: res.books,
        loading: false,
      });
    });
  }

  handleClear () {
    this.setState({
      query: ''
    });
    const searchInput = document.querySelector('#search-input');
    searchInput.focus();
  }

  render () {
    return (
      <div className="wrapper">
        <header>
          <h1>Find A Book</h1>
        </header>
        <div className="search-wrapper">
          <Search 
            onChange={(userIn) => this.handleChange(userIn)}
            onClick={() => this.handleSearch()}
            query={this.state.query}
            onClear={() => this.handleClear()}
          />
        </div>
        <div className="books-wrapper">
          <Books 
            bookList={this.state.books}
            loading={this.state.loading}
          />
        </div>
        <div className="pages-wrapper">
          <Pagination
            onPageChange={(n) => this.handlePageChange(n)}
            currentPage={this.state.currentPage}
            pageSize={this.booksPerPage}
            prevPages={2}
            show={this.state.currentPage > 0}
          />
        </div>
        <footer>
          By <a href="https://j-weigle.github.io" rel="noreferrer noopener" target="_blank">Justin Weigle</a>
        </footer>
      </div>
    );
  }
}

// ========================================================
ReactDOM.render(<Base />, document.getElementById('root'));