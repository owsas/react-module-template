import React from 'react';
import Parse from 'parse';
import PropTypes from 'prop-types';
import { DataBrowser } from '@owsas/geopromos-private-api/out/DataBrowser';

import ShowIfActivity from '../ShowIfActivity/ShowIfActivity';

export default class ActivityCreator extends React.Component {
  constructor(props) {
    super(props);

    this.create = this.create.bind(this);
    this.del = this.del.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  getContentFunction(fn, activity, fn2) {
    return () => fn && fn(activity, fn2);
  }

  async create() {
    const {
      actor, object, verb, extra,
    } = this.props;

    const obj = new Parse.Object('Activity');
    obj.set('actor', actor);
    obj.set('object', object);
    obj.set('verb', verb);

    // set object, actor, ... other
    Object.keys(extra).forEach(k => obj.set(k, extra[k]));

    try {
      await DataBrowser.save(obj);
      if (this.props.onSave) {
        this.props.onSave(obj);
      }
    } catch (e) {
      this.wrapper.setError(e);
    }

    this.wrapper.getPreviousActivity();
  }

  async del() {
    const obj = this.wrapper.getActivity();
    try {
      await DataBrowser.destroy(obj);
      if (this.props.onDestroy) {
        this.props.onDestroy(obj);
      }
    } catch (e) {
      this.wrapper.setError(e);
    }

    this.wrapper.getPreviousActivity();
  }

  render() {
    const {
      actor, object, verb, done, notDone, loading, error,
    } = this.props;
    const activity = this.wrapper && this.wrapper.getActivity();

    return (
      <ShowIfActivity
        ref={(r) => { this.wrapper = r; }}
        actor={actor}
        object={object}
        verb={verb}
        loading={this.getContentFunction(loading, activity)}
        done={this.getContentFunction(done, activity, this.del)}
        notDone={this.getContentFunction(notDone, activity, this.create)}
        error={this.getContentFunction(error, activity)}
      />
    );
  }
}

ActivityCreator.defaultProps = {
  onSave: undefined,
  onDestroy: undefined,
  extra: {},
  object: undefined,
  error: undefined,
  loading: undefined,
};

ActivityCreator.propTypes = {
  actor: PropTypes.string.isRequired,
  verb: PropTypes.string.isRequired,
  object: PropTypes.string,
  extra: PropTypes.object,
  done: PropTypes.func.isRequired,
  notDone: PropTypes.func.isRequired,
  error: PropTypes.func,
  loading: PropTypes.func,
  onSave: PropTypes.func,
  onDestroy: PropTypes.func,
};

