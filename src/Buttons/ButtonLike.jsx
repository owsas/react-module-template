import React from 'react';
import PropTypes from 'prop-types';
import IconDone from 'react-icons/lib/ti/heart-full-outline';
import IconNotDone from 'react-icons/lib/ti/heart-outline';

import ButtonAct from './ButtonAct';

const ButtonLike = props => (
  <ButtonAct
    verb="liked"
    done={() => <span><IconDone /> Te gusta</span>}
    notDone={() => <span><IconNotDone /> Me gusta</span>}
    {...props}
  />
);

ButtonLike.defaultProps = ButtonAct.defaultProps;
ButtonLike.propTypes = {
  actor: PropTypes.string.isRequired,
  object: PropTypes.string,
  onSave: PropTypes.func,
  onDestroy: PropTypes.func,
};

export default ButtonLike;
