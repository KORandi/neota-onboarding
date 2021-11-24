import React, { useState } from 'react';
import { Button } from 'reactstrap';
import DataEntryModal from './DataEntryModal';

const DataEntry: React.FunctionComponent = function () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Button
        color="danger"
        onClick={toggle}
      >
        Add Data
      </Button>
      <DataEntryModal isOpen={isModalOpen} toggle={toggle} />
    </>
  );
};

export default DataEntry;
