/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import ActivityCreator from '../ActivityCreator/ActivityCreator';

const ButtonAct = props => (
  <ActivityCreator
    {...props}
    done={(obj, fn) => (
      <button className={props.classDone} onClick={fn}>
        {props.done(obj)}
      </button>
    )}
    notDone={(obj, fn) => (
      <button className={props.classNotDone} onClick={fn}>
        {props.notDone(obj)}
      </button>
    )}
    loading={() => (
      <button className={props.classLoading} disabled>{ props.loading ? props.loading() : '...' }</button>
    )}
    error={props.error}
    onSave={props.onSave}
    onDestroy={props.onDestroy}
  />
);

ButtonAct.defaultProps = Object.assign({}, ActivityCreator.defaultProps, {
  classLoading: 'btn btn-default',
  classNotDone: 'btn btn-success',
  classDone: 'btn btn-default',
});

ButtonAct.propTypes = {
  actor: PropTypes.string.isRequired,
  verb: PropTypes.string.isRequired,
  object: PropTypes.string,
  done: PropTypes.func.isRequired,
  notDone: PropTypes.func.isRequired,
  error: PropTypes.func,
  loading: PropTypes.func,
  onSave: PropTypes.func,
  onDestroy: PropTypes.func,
  classLoading: PropTypes.string,
  classNotDone: PropTypes.string,
  classDone: PropTypes.string,
};

export default ButtonAct;
