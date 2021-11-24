import React, { useState } from 'react';
import { Button } from 'reactstrap';
import DataFilterModal from './DataFilterModal';

const DataFilter: React.FunctionComponent = function () {
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
        Set search
      </Button>
      <DataFilterModal isOpen={isModalOpen} toggle={toggle} />
    </>
  );
};

export default DataFilter;
