import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useAppContext } from '../../../context/AppContext';
import DataEntryModal from './DataEntryModal';

const DataEntry: React.FunctionComponent = function () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mavg: { isLoaded, data } } = useAppContext();

  const toggle = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Button
        color="danger"
        onClick={toggle}
        disabled={!isLoaded || !data.length}
      >
        Add Data
      </Button>
      <DataEntryModal isOpen={isModalOpen} toggle={toggle} />
    </>
  );
};

export default DataEntry;
