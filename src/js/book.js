import React from 'react';

export class Book extends React.Component {
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
          <div className="left-column">
            <div className="book_coverart">
              <a href={previewLink} rel="noreferrer noopener" target="_blank">
                <img src={bookCover} alt="book cover" />
              </a>
            </div>
          </div>
          <div className="right-column">
            <div className="book_info">
              <p><strong>Author(s):</strong> {authorList}</p>
              <p><strong>Page Count:</strong> {pageCount}</p>
              <p><strong>Publisher:</strong> {publisher}</p>
              <p><strong>Published:</strong> {publishedDate}</p>
              <a href={previewLink} rel="noreferrer noopener" target="_blank">Open Google Books [<span>&#8599;</span></a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="book_desc">
            <p>{desc}</p>
          </div>
        </div>
      </div>
    );
  }
}