import React, { useState } from 'react';
import { Button } from '@chakra-ui/react'; 
import {
    MdAdd,
    MdClose
  } from 'react-icons/md';
const AskFile = ({ closeform, onSubmit }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (file !== null) {
      onSubmit(file);
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
      <input
        type='file'
        onChange={(e) => setFile(e.target.files[0])}
        />
      <Button onClick={handleSubmit}>Add File</Button>
    </div>
  );
};

export default AskFile;
