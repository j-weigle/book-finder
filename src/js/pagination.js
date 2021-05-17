import React from 'react';
import { Page } from './page';

function range (lower, upper) {
  const range = [];

  for (let i = lower; i < upper; i++){
    range.push(i);
  }

  return range;
}

export class Pagination extends React.Component {
  constructor (props) {
    super(props);
    const { prevPages = 0 } = props;

    this.prevPages = Math.max(0, Math.min(prevPages, 4));

    this.LEFT_PAGE = 'LEFT';
    this.RIGHT_PAGE = 'RIGHT';
  }

  getPageInfo () {
    const { currentPage } = this.props;

    if (currentPage === 1) {
      return [1, this.RIGHT_PAGE];
    } else {
      const startPage = Math.max(currentPage - this.prevPages, 2);
      let pages = range(startPage, currentPage);
      return [1, this.LEFT_PAGE, ...pages, currentPage, this.RIGHT_PAGE];
    }
  }

  render () {
    if (!this.props.show) return null;
    const pages = this.getPageInfo();

    return (
      <Page
        onPageChange={this.props.onPageChange}
        LEFT_PAGE={this.LEFT_PAGE}
        RIGHT_PAGE={this.RIGHT_PAGE}
        currentPage={this.props.currentPage}
        pages={pages}
      />
    );
  }
}