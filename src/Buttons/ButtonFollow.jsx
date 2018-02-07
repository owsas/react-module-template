import React from 'react';
import PropTypes from 'prop-types';
import IconDone from 'react-icons/lib/md/check';
import IconNotDone from 'react-icons/lib/md/add';

import ButtonAct from './ButtonAct';

const ButtonFollow = props => (
  <ButtonAct
    verb="followed"
    done={() => <span><IconDone /> Lo sigues</span>}
    notDone={() => <span><IconNotDone /> Seguir</span>}
    {...props}
  />
);

ButtonFollow.defaultProps = ButtonAct.defaultProps;
ButtonFollow.propTypes = {
  actor: PropTypes.string.isRequired,
  object: PropTypes.string,
  onSave: PropTypes.func,
  onDestroy: PropTypes.func,
};

export default ButtonFollow;
