import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

function parseRawBooksJson (rawJson) {
  const { items } = rawJson;
  if (!items) return [];

  return items.map(bookItem => {
    const volumeInfo = bookItem.volumeInfo;

    const {
      authors,
      description,
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
      pageCount,
      previewLink,
      publishedDate,
      publisher,
      subtitle,
      title,
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
    const {
      authors,
      description,
      bookCover,
      pageCount,
      previewLink,
      publishedDate,
      publisher,
      subtitle,
      title
    } = this.props;
    let desc = '';
    if (description) {
      desc = description.substr(0, 250);
    }
    if (desc.length === 250) {
      desc += '...';
    }
    return (
      <div className="result">
        <div className="result_title">
          <h3>{title}</h3>
        </div>
        <div className="result_authors">
          <h4>Author(s): {authors}</h4>
        </div>
        <div className="result_description">
          <p>Description: {desc}</p>
        </div>
        <div className="result_bookcover">
          <img src={bookCover} alt="book cover"/>
        </div>
        <div className="result_pagecount">
          <p>Page Count: {pageCount}</p>
        </div>
        <div className="result_link">
          <a href={previewLink} rel="noreferrer noopener" target="_blank">Google Books Link</a>
        </div>
        <div className="result_published">
          <p>Published: {publishedDate}</p>
        </div>
        <div className="result_publisher">
          <p>Publisher: {publisher}</p>
        </div>
        <div className="result_subtitle">
          <p>Subtitle: {subtitle}</p>
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
            authors={book.authors}
            description={book.description}
            bookCover={book.bookCover}
            pageCount={book.pageCount}
            previewLink={book.previewLink}
            publishedDate={book.publishedDate}
            publisher={book.publisher}
            subtitle={book.subtitle}
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
          onKeyPress={pressed => {
            if (pressed.key === 'Enter') {
              this.props.onClick();
            }
          }}
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