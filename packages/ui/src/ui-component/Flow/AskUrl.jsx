import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import {
    MdAdd,
    MdClose
  } from 'react-icons/md';

const AskUrl = ({ closeform, onSubmit }) => {
  const [url, setURL] = useState('');

  const handleChange = (e) => {
    setURL(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(url);
    closeform();
  };

  return (
<div>
      <div className='grid grid-cols-2 px-4 justify-between items-center'>
        <div className='frm_hdr_ttle'>
          <h2>Ask For A URL</h2>
        </div>
        <div className='closebutton'>
          <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500">
            <MdClose />
          </Button>
        </div>
      </div>      
    <FormControl>
        <FormLabel>Add URL here:</FormLabel>
        <Input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Enter URL"
        />
      </FormControl>
      <Button mt={4} onClick={handleSubmit} colorScheme="blue">
        Add URL
      </Button>
    </div>
  );
};

export default AskUrl;
