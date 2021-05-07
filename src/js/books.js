import React from 'react';
import { Book } from './book';

export class Books extends React.Component {
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