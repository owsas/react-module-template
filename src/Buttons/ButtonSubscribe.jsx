import React from 'react';
import PropTypes from 'prop-types';
import IconDone from 'react-icons/lib/fa/bell';
import IconNotDone from 'react-icons/lib/fa/bell-o';

import ButtonAct from './ButtonAct';

const ButtonSubscribe = props => (
  <ButtonAct
    verb="subscribed"
    done={() => <span><IconDone /> Suscrito</span>}
    notDone={() => <span><IconNotDone /> Suscribirme</span>}
    {...props}
  />
);

ButtonSubscribe.defaultProps = ButtonAct.defaultProps;
ButtonSubscribe.propTypes = {
  actor: PropTypes.string.isRequired,
  object: PropTypes.string,
  onSave: PropTypes.func,
  onDestroy: PropTypes.func,
};

export default ButtonSubscribe;
