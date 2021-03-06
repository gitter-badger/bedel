// Page body
import React, { Component, PropTypes } from 'react';
import { Navigater } from './navbar';
// Css
import '../../sass/dashboard.scss';

export class PageBody extends Component {
  render() {
    return (
      <div className="page-body">
        <Navigater user={this.props.user} />
        {this.props.children}
      </div>
    );
  }
}

PageBody.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};
