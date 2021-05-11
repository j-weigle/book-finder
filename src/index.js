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
      totalBooks: 0,
      currentPage: 1,
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
    fetchBooksFromAPI(query, 0, this.booksPerPage)
    .then(res => {
      this.setState({
        currentSearchQuery: query,
        currentPage: 1,
        books: res.books,
        totalBooks: res.totalItems
      });
    });
  }

  handlePageChange (newPage) {
    console.log('fired handlePageChange with new page: ' + newPage);
    window.scrollTo({top: 0, behavior: 'smooth'});
    const { currentSearchQuery, currentPage } = this.state;
    if (!currentSearchQuery) return;
    if (newPage === currentPage) return;
    if ((newPage-1) * this.booksPerPage > this.state.totalBooks) return;
    fetchBooksFromAPI(currentSearchQuery, (newPage-1) * this.booksPerPage, this.booksPerPage)
    .then(res => {
      this.setState({
        currentPage: newPage,
        books: res.books
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
          <h1>Book Finder</h1>
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
          <Books bookList={this.state.books} />
        </div>
        <div className="pages-wrapper">
          <Pagination
            onPageChange={(n) => this.handlePageChange(n)}
            totalRecords={this.state.totalBooks}
            currentPage={this.state.currentPage}
            pageSize={this.booksPerPage}
          />
        </div>
      </div>
    );
  }
}

// ========================================================
ReactDOM.render(<Base />, document.getElementById('root'));