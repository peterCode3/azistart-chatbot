import React, { useState } from 'react';
import { Button, FormControl, FormLabel } from '@chakra-ui/react'; // Import Chakra UI components or replace with your UI library
import {
    MdAdd,
    MdClose
  } from 'react-icons/md';
const AskNumber = ({ closeform, onSubmit }) => {
  const [number, setNumber] = useState('');

  const handleSubmit = () => {
    if (number.trim() !== '') {
      onSubmit(number);
      closeform();
    }
  };

  return (
    <div>
      <div className='grid grid-cols-2 px-4 justify-between items-center'>
        <div className='frm_hdr_ttle'>
          <h2>Lead Generation Number</h2>
        </div>
        <div className='closebutton'>
          <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500">
            <MdClose />
          </Button>
        </div>
      </div>
      <FormControl>
      <FormLabel>Add Name here:</FormLabel>
      <textarea
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Type your lead generation number here..."
      />
      <Button onClick={handleSubmit}>Add Number</Button>
      </FormControl>
    </div>
  );
};

export default AskNumber;
