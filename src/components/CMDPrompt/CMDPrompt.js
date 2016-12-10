import React, { Component } from 'react';

class CMDPrompt extends Component {
  constructor(props, context) {
    super(props, context);

    this.props = props;
  }

  componentDidMount() {
    this.cmdInput.focus();
  }

  render() {
    return (
      <div className="cmd-prompt">
        <form className="cmd-prompt-form" onSubmit={this.props.onSubmit} noValidate>
          <span className="cmd-prompt-ps1">&gt;</span>
          <input ref={(input) => { this.cmdInput = input; }} className="cmd-prompt-input" type="text" name="cmd-prompt-input" id="cmd-prompt-input" onKeyUp={this.props.onKeyUp} />
        </form>
      </div>
    );
  }
}

CMDPrompt.propTypes = {
  onKeyUp: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
};

CMDPrompt.defaultProps = {
  text: '',
};

export default CMDPrompt;
