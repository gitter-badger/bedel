// Navbar item
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
// Css (sass)
import '../../sass/navbar.scss';

// Component
export class ItemIcon extends Component {
  render() {
    if (this.props.normal) {
      return (
        <li role="presentation" className="nav-text">
          <a role="button" href={this.props.href}>
            <FontAwesome name={this.props.icon} />
          </a>
        </li>
      );
    } else {
      return (
        <li role="presentation" className="nav-text">
          <Link role="button" to={this.props.href}>
            <FontAwesome name={this.props.icon} />
          </Link>
        </li>
      );
    }
  }
}

ItemIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  normal: PropTypes.bool,
  href: PropTypes.string.isRequired
};
