import React from 'react';
import PropTypes from 'prop-types';
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up';

import ButtonInteract from './ButtonInteract';

const ButtonLike = props => (
  <ButtonInteract
    type="likes"
    text="Me gusta"
    objectId={props.objectId}
    interactionKey={props.interactionKey}
    className={props.className}
    textDone="Te gusta"
    icon={<ThumbsUpIcon />}
    onLogin={props.onLogin}
  />
);

ButtonLike.propTypes = {
  onLogin: PropTypes.func.isRequired,
  objectId: PropTypes.string.isRequired,
  interactionKey: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ButtonLike;

