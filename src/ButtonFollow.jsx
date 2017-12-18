import React from 'react';
import PropTypes from 'prop-types';
import IconPlus from 'react-icons/lib/go/plus';

import ButtonInteract from './ButtonInteract';

const ButtonFollow = props => (
  <ButtonInteract
    type="likes"
    text="Seguir"
    objectId={props.objectId}
    interactionKey={props.interactionKey}
    className={props.className}
    textDone="Siguiendo"
    icon={<IconPlus />}
    onLogin={props.onLogin}
  />
);

ButtonFollow.propTypes = {
  onLogin: PropTypes.func.isRequired,
  objectId: PropTypes.string.isRequired,
  interactionKey: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ButtonFollow;

