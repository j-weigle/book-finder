import React from 'react';
import { Page } from './page';

function range (lower, upper) {
  const range = [];

  for (let i = lower; i <= upper; i++){
    range.push(i);
  }

  return range;
}

export class Pagination extends React.Component {
  constructor (props) {
    super(props);
    const { pageNeighbors = 0 } = props;

    this.pageNeighbors = Math.max(0, Math.min(pageNeighbors, 2));

    this.LEFT_PAGE = 'LEFT';
    this.RIGHT_PAGE = 'RIGHT';
  }

  getPageInfo () {
    const { pageSize, totalRecords, currentPage } = this.props;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const pageNeighbors = this.pageNeighbors;

    // num pages on either side + (current + left + right + first + last)
    const totalButtons = (this.pageNeighbors * 2) + 5;

    if (totalPages > totalButtons) {
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalButtons - (pages.length + 1);

      switch(true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [this.LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, this.RIGHT_PAGE];
          break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [this.LEFT_PAGE, ...pages, this.RIGHT_PAGE];
          break;
        }        
      }

      return {
        pages: [1, ...pages, totalPages],
        currentPage: currentPage,
        totalPages: totalPages
      }
    }

    return {
        pages: range(1, totalPages),
        currentPage: currentPage,
        totalPages: totalPages
    }
  }

  render () {
    if (!this.props.totalRecords) return null;

    const pageInfo = this.getPageInfo();
    const { pages, currentPage, totalPages } = pageInfo;
    if (totalPages === 1) return null;

    return (
      <Page
        onPageChange={this.props.onPageChange}
        LEFT_PAGE={this.LEFT_PAGE}
        RIGHT_PAGE={this.RIGHT_PAGE}
        currentPage={currentPage}
        pages={pages}
      />
    );
  }
}