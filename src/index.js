import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

function parseRawBooksJson (rawJson) {
  const { items } = rawJson;
  if (!items) return [];

  return items.map(bookItem => {
    const volumeInfo = bookItem.volumeInfo;
    const saleInfo = bookItem.saleInfo;

    const {
      authors,
      averageRating,
      categories,
      description,
      infoLink,
      pageCount,
      previewLink,
      publishedDate,
      publisher,
      subtitle,
      title
    } = volumeInfo;
    const bookCover = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://www.lse.ac.uk/International-History/Images/Books/NoBookCover.png';

    return {
      authors,
      description,
      bookCover,
      infoLink,
      pageCount,
      previewLink,
      publishedDate,
      publisher,
      subtitle,
      title
    };
  });
}

async function fetchBooksFromAPI (query) {
  const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=' + query;
  try {
    const res = await fetch(apiURL);
    const rawJson = await res.json();
    const bookList = await parseRawBooksJson(rawJson);
    return bookList;
  } catch (e) {
    console.error(e);
  }
}

class Result extends React.Component {
  render () {
    const { title } = this.props;
    return (
      <div className="result">
        <div className="result_title">
          <h3>{title}</h3>
        </div>
      </div>
    );
  }
}

class Results extends React.Component {
  render () {
    if (this.props.bookList.length > 0) {
      return this.props.bookList.map((book, idx) => (
          <Result 
            key={idx}
            title={book.title}
          />
      ));
    } else {
      return (
        <div className="empty-results-area">No results to show...</div>
      );
    }
  }
}

class Search extends React.Component {
  render () {
    return(
      <div className="search-area">
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
      query: '',
      results: []
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
      .then(results => {
        this.setState({results});
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
        <div className="results-wrapper">
          <Results bookList={this.state.results} />
        </div>
      </div>
    );
  }
}

// ========================================================
ReactDOM.render(<Base />, document.getElementById('root'));