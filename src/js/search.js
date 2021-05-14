import React from 'react';

export class Search extends React.Component {
  render () {
    return(
      <div className="search">
        <button 
          id="clear-btn"
          aria-label="clear and focus search input"
          style={{
            'display': (this.props.query.length > 0 ? 'inline-block' : 'none')
          }}
          onClick={this.props.onClear}
        > X
        </button>
        <input
          id="search-input"
          type="text"
          autoComplete="off"
          value={this.props.query}
          placeholder="Search by author, name, etc..."
          onChange={this.props.onChange}
          onKeyPress={pressed => {
            if (pressed.key === 'Enter') {
              this.props.onClick();
            }
          }}
        ></input>
        <button
          id="search-btn"
          aria-label="search button"
          onClick={this.props.onClick}
        > SEARCH
        </button>
      </div>
    );
  }
}