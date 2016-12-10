import React, { Component } from 'react';

import CMDPrompt from '../CMDPrompt/CMDPrompt';
import CMDMessage from '../CMDMessage/CMDMessage';

class CMD extends Component {
  constructor(props, context) {
    super(props, context);

    this.props = props;

    this.state = {
      cmd: this.props.text || '',
      history: [],
      maxHistory: 3,
      description: (
        <div className="cmd-description">
          <h1>the room</h1>
          <p>Dim light filters in through the dust-covered window. The clock in the corner ticks loudly.</p>
          <p><i>Where the hell am I?</i></p>
        </div>
      ),
    };

    this.responses = {
      look: (<i>I don&apos;t recognize this at all.</i>),
      help: (<i>I don&apos;t think I can do that.</i>),
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getResponse = this.getResponse.bind(this);
  }

  onClick() {
    this.cmdPrompt.cmdInput.focus();
  }

  onKeyUp(e) {
    const { value } = e.target;

    let { cmd } = this.state;

    cmd = value;

    this.setState({
      cmd,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.cmdPrompt.cmdInput.value = '';

    let { cmd, history } = this.state;

    while (history.length >= this.state.maxHistory) {
      history.shift();
    }

    history.push([(<div className="cmd-prompt-message-submitted"><span className="cmd-prompt-ps1">&gt;</span><b>{cmd}</b></div>), this.getResponse(cmd)]);

    cmd = '';

    this.setState({
      history,
      cmd,
    });
  }

  getResponse(cmd) {
    if (this.responses[cmd]) {
      return this.responses[cmd];
    }

    return this.responses.help;
  }

  render() {
    const history = this.state.history.map((item, historyIndex) => {
      return item.map((msg, historySubIndex) => {
        const key = `msg-${historyIndex}-${historySubIndex}`;
        return (
          <li key={key}>
            <CMDMessage text={msg} />
          </li>
        );
      });
    });

    return (
      <div className="cmd" onClick={this.onClick}>
        <div className="cmd-description-container">
          <CMDMessage text={this.state.description} />
        </div>
        <ol className="cmd-prompt-history">
          { history }
        </ol>
        <CMDPrompt ref={(input) => { this.cmdPrompt = input; }} text={this.state.cmd} onKeyUp={this.onKeyUp} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

CMD.propTypes = {
  text: React.PropTypes.string,
};

CMD.defaultProps = {
  text: '',
};

export default CMD;
