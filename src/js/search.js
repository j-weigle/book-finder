import React from 'react';

export class Search extends React.Component {
  render () {
    return(
      <div className="search">
        <input
          type="text"
          value={this.props.query}
          placeholder="Search by author, name, etc..."
          onChange={this.props.onChange}
          onKeyPress={pressed => {
            if (pressed.key === 'Enter') {
              this.props.onClick();
            }
          }}
        />
        <button id="search-btn" onClick={this.props.onClick}>SEARCH</button>
      </div>
    );
  }
}