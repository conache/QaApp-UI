import React, { memo, Fragment } from 'react';
import { Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const GeneralModal = memo((props) => {
  const { name, showModal, closeModalFct, children } = props;

  return (
    <Modal
      aria-labelledby={name}
      open={showModal}
      onClose={closeModalFct}
      className="modal"
    >
      <Fragment>
        <div className="modal-header">
          <CloseIcon />
        </div>
        <div className="modal-body">
          {children}
        </div>
      </Fragment>
    </Modal>
  )
});

export default GeneralModal;
