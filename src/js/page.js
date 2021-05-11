import React from 'react';

export class Page extends React.Component {
  render () {
    const {
      LEFT_PAGE, RIGHT_PAGE,
      currentPage, pages,
      onPageChange
    } = this.props;

    return (
      <nav aria-label="Pagination">
        <ul className="pagination">
          { pages.map((page, idx) => {

            if (page === LEFT_PAGE) return (
              <li key={idx} className="page-item">
                <button className="page-link" aria-label="Previous" onClick={() => {onPageChange(currentPage - 1)}}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              </li>
            );

            if (page === RIGHT_PAGE) return (
              <li key={idx} className="page-item">
                <button className="page-link" aria-label="Next" onClick={() => {onPageChange(currentPage + 1)}}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            );

            return (
              <li key={idx} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                <button className="page-link" onClick={() => {onPageChange(page)}}>{ page }</button>
              </li>
            );

          }) }

        </ul>
      </nav>
    );
  }
}