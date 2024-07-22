import React, { useState } from 'react';
import { Button } from '@chakra-ui/react'; // Import Chakra UI components or replace with your UI library
import {
    MdAdd,
    MdClose
  } from 'react-icons/md';
const AskName = ({ closeform, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() !== '') {
      onSubmit(name);
      closeform();
    }
  };

  return (
    <div>
      <div className='grid grid-cols-2 px-4 justify-between items-center'>
        <div className='frm_hdr_ttle'>
          <h2>Lead Generation Name</h2>
        </div>
        <div className='closebutton'>
          <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500">
            <MdClose />
          </Button>
        </div>
      </div>
      <textarea
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your lead generation name here..."
      />
      <Button onClick={handleSubmit}>Add Name</Button>
    </div>
  );
};

export default AskName;
