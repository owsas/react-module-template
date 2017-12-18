import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { DataBrowser as Data } from '@owsas/geopromos-private-api/out/DataBrowser';
import { Events } from '@owsas/geopromos-private-api/out/Events';

import LoginModal from './LoginModal';

export default class ButtonInteract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      globalCount: 0,
      showModalLogin: false,
      user: undefined,
    };

    this.interact = this.interact.bind(this);
    this.deleteInteraction = this.deleteInteraction.bind(this);
    this.showModalLogin = this.showModalLogin.bind(this);
    this.hideModalLogin = this.hideModalLogin.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser()
      .then(() => {
        this.checkInteractionStatus();
      });

    Events.subscribe(Events.EVENTS.userChanged, (n, { user }) => {
      this.setState({ user });
    });
  }

  componentWillReceiveProps() {
    this.checkInteractionStatus();
  }

  async getCurrentUser() {
    const user = await Data.getCurrentUser();
    await this.setState({ user });
  }

  async interact() {
    if (!this.state.user) {
      this.showModalLogin();
      return;
    }

    this.setState({ loading: true });

    const { type } = this.props;
    const interacted = {
    };

    interacted[this.props.interactionKey] = this.props.objectId;

    try {
      await Data.cloud('createInteraction', { type, interacted });
      this.setState({
        loading: false,
        globalCount: this.state.globalCount + 1,
        count: this.state.count + 1,
      });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async deleteInteraction() {
    if (!this.state.user) {
      this.showModalLogin();
      return;
    }

    this.setState({ loading: true });

    const { type } = this.props;
    const interacted = {
    };

    interacted[this.props.interactionKey] = this.props.objectId;

    try {
      await Data.cloud('deleteInteraction', { type, obj: interacted });
      this.setState({
        loading: false,
        globalCount: this.state.globalCount - 1,
        count: this.state.count - 1,
      });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  checkInteractionStatus() {
    this.setState({ loading: true });
    let userCount;

    return Data.getUserInteractionCount(
      this.props.className,
      this.props.objectId,
      this.props.type,
    )
      .then((count = 0) => {
        userCount = count;
        return Data.getInteractionCount(
          this.props.className,
          this.props.objectId,
          this.props.type,
        );
      })
      .then((globalCount = 0) => {
        this.setState({ loading: false, count: userCount, globalCount });
      })
      .catch((e) => {
        this.setState({ loading: false });
      });
  }

  showModalLogin() {
    this.setState({ showModalLogin: true });
  }

  hideModalLogin() {
    this.setState({ showModalLogin: false });
  }

  /**
   * @param {boolean} byPassShow
   */
  renderModalLogin(byPassShow) {
    const show = byPassShow || this.state.showModalLogin;

    return (
      <div>
        {/* The modal */}
        <LoginModal show={show} onLogin={this.props.onLogin} onHide={this.hideModalLogin} />
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return <Button bsStyle="default" style={{ margin: 5 }}>...</Button>;
    }

    const { count } = this.state;

    // set textDone with count
    let { textDone } = this.props;
    if (this.state.globalCount) {
      textDone = `${textDone} (${this.state.globalCount})`;
    }

    if (count > 0) {
      return (
        <div>
          {this.renderModalLogin()}
          <Button onClick={this.deleteInteraction} bsStyle="success" style={{ margin: 5 }}>
            {/* The icon */}
            <i className="fa fa-check" />

            {/* The text */}
            <span style={{ margin: 5 }}>
              {textDone}
            </span>
          </Button>
        </div>
      );
    }

    // set text with count
    let { text } = this.props;
    if (this.state.globalCount) {
      text = `${text} (${this.state.globalCount})`;
    }

    return (
      <div>
        {this.renderModalLogin()}
        <Button onClick={this.interact} bsStyle="success" style={{ margin: 5 }}>
          {/* The icon */}
          {this.props.icon}

          {/* The text */}
          <span style={{ margin: 5 }}>
            {text}
          </span>
        </Button>
      </div>
    );
  }
}

ButtonInteract.defaultProps = {
  icon: null,
  onLogin: undefined,
};

ButtonInteract.propTypes = {
  objectId: PropTypes.string.isRequired,
  // eslint-disable-next-line
  interactionKey: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textDone: PropTypes.string.isRequired,
  icon: PropTypes.node,

  // For LoginModal
  onLogin: PropTypes.func,
};
