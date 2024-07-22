import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import {
  MdAdd,
  MdClose
} from 'react-icons/md';

const BusinessHoursNode = ({ closeform, onSubmit }) => {
  const [interactionTime, setInteractionTime] = useState('');

  const handleSubmit = () => {
    if (interactionTime !== null) {
      onSubmit(interactionTime);
      closeform();
    }
  };

  const handleInteractionTimeChange = (e) => {
    setInteractionTime(e.target.value);
  };

  return (
    <div>
      <div className='grid grid-cols-2 px-4 justify-between items-center'>
        <div className='frm_hdr_ttle'>
          <h2>Create Business Hours Node</h2>
        </div>
        <div className='closebutton'>
          <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500">
            <MdClose />
          </Button>
        </div>
      </div>
      <FormControl>

        <FormLabel>
          Interaction Time:
        </FormLabel>
        <Input
          type="text"
          value={interactionTime}
          onChange={handleInteractionTimeChange}
        />
        <Button onClick={handleSubmit}>Add Business Hours</Button>
      </FormControl>
    </div>
  );
};

export default BusinessHoursNode;
