import React from 'react';
import Parse from 'parse';
import PropTypes from 'prop-types';

export default class ShowIfActivity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      activity: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    this.getPreviousActivity();
  }

  getActivity() {
    return this.state.activity;
  }

  setError(error) {
    this.setState({ error });
  }

  getError() {
    return this.state.error;
  }

  async getPreviousActivity() {
    const q = this.getPreviousActivityQuery();
    try {
      const activity = await q.first();
      this.setState({ activity, loading: false });
    } catch (e) {
      this.setState({ loading: false, error: e });
    }
  }

  getPreviousActivityQuery() {
    const q = new Parse.Query('Activity')
      .equalTo('verb', this.props.verb)
      .equalTo('actor', this.props.actor);

    if (this.props.object) {
      q.equalTo('object', this.props.object);
    }

    return q;
  }

  render() {
    const { activity, loading, error } = this.state;
    const { done, notDone } = this.props;

    if (loading) {
      return this.props.loading ? this.props.loading(this.state) : null;
    }

    if (error) {
      return this.props.error ? this.props.error(error) : null;
    }

    if (activity) {
      return done ? done(activity) : null;
    }

    return notDone ? notDone(activity) : null;
  }
}

ShowIfActivity.defaultProps = {
  done: undefined,
  notDone: undefined,
  loading: undefined,
  error: undefined,
  object: undefined,
};

ShowIfActivity.propTypes = {
  actor: PropTypes.string.isRequired,
  verb: PropTypes.string.isRequired,
  object: PropTypes.string,
  done: PropTypes.func,
  notDone: PropTypes.func,
  loading: PropTypes.func,
  error: PropTypes.func,
};

