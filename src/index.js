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

class Book extends React.Component {
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

    let d = '';
    if (description) {
      d = description.substr(0, 250);
      if (d.length === 250) {
        d += '...';
      }
    }
    const desc = d;

    let a = '';
    if (authors) {
      a = authors.join(', ');
    }
    const authorList = a;

    return ( // note that book cover images are approximately 200px wide
      <div className="book" >
        <div className="row">
          <div className="book_title_subtitle" >
            <a href={previewLink} rel="noreferrer noopener" target="_blank">
              <h3>{title}</h3>
            </a>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="book_coverart">
              <a href={previewLink} rel="noreferrer noopener" target="_blank">
                <img src={bookCover} alt="book cover" />
              </a>
            </div>
          </div>
          <div className="triple-column">
            <div className="book_info">
              <p><strong>Author(s):</strong> {authorList}</p>
              <p><strong>Page Count:</strong> {pageCount}</p>
              <p><strong>Publisher:</strong> {publisher}</p>
              <p><strong>Published:</strong> {publishedDate}</p>
              <p><strong>Description:</strong> {desc}</p>
              <a href={previewLink} rel="noreferrer noopener" target="_blank">Open Google Books</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Books extends React.Component {
  render () {
    if (this.props.bookList.length > 0) {
      return this.props.bookList.map((book, idx) => (
          <Book
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
        <div className="empty-books-area">No results to show...</div>
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