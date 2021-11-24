import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Modal, ModalBody, ModalFooter, Button,
} from 'reactstrap';
import DashboardForm from './DashboardForm';
import ListForm from './ListForm';

interface IDataEntryModalProps {
  isOpen: boolean,
  toggle: () => void
}

const DataEntryModal: React.FunctionComponent<IDataEntryModalProps> = function ({ isOpen, toggle }) {
  const { pathname } = useLocation();

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        { pathname === '/' && <ListForm id="form" toggle={toggle} />}
        { pathname === '/dashboard' && <DashboardForm id="form" toggle={toggle} />}
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          type="submit"
          form="form"
        >
          Add
        </Button>
        {' '}
        <Button
          onClick={() => {
            toggle();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DataEntryModal;
