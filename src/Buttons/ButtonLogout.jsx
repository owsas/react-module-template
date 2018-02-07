import React from 'react';
import PropTypes from 'prop-types';
import PowerOff from 'react-icons/lib/fa/power-off';

const ButtonLogout = props => (
  <button className="btn btn-danger" onClick={props.onClick}>
    <span style={{ marginRight: 5 }}>
      <PowerOff />
    </span>
    Cerrar sesión
  </button>
);

ButtonLogout.defaultProps = {
  onClick: undefined,
};

ButtonLogout.propTypes = {
  onClick: PropTypes.func,
};

export default ButtonLogout;
