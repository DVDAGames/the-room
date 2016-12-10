import React, { Component } from 'react';

class CMDMessage extends Component {
  constructor(props, context) {
    super(props, context);

    this.props = props;
  }

  render() {
    return (
      <div className="cmd-prompt-message">
        {this.props.text}
      </div>
    );
  }
}

CMDMessage.propTypes = {
  text: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
    React.PropTypes.element,
  ]),
};

CMDMessage.defaultProps = {
  text: '',
};

export default CMDMessage;
