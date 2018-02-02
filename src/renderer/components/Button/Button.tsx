import React from "react";

/* eslint-disable no-undef */
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}
/* eslint-enable no-undef */

export default class Button extends React.Component<ButtonProps> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    return (
      <span className="Button" onClick={this.handleClick}>
        {this.props.children}
      </span>
    );
  }
}
