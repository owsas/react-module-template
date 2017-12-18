import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const LoginModal = props => (
  <Modal show={props.show} onHide={props.onHide} {...props.modalProps} id="modalLogin">
    <Modal.Body>
      <p style={{ textAlign: 'center' }}>
      Para interactuar con este elemento primero debes iniciar sesión
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button id="modalButtonCancel" onClick={props.onHide}>Cancelar</Button>
      <Button id="modalButtonCancel" bsClass="btn btn-success" onClick={props.onLogin}>Iniciar sesión</Button>
    </Modal.Footer>
  </Modal>
);

LoginModal.defaultProps = {
  show: false,
  modalProps: {},
  onLogin: undefined,
  onHide: undefined,
};

LoginModal.propTypes = {
  show: PropTypes.bool,
  onLogin: PropTypes.func,
  onHide: PropTypes.func,
  // eslint-disable-next-line
  modalProps: PropTypes.object,
};

export default LoginModal;

