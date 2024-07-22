import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import {
  MdAdd,
  MdClose
} from 'react-icons/md';
const AskAddress = ({ closeform, onSubmit }) => {
  const [address, setAddress] = useState('');

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(address);
    closeform();
  };

  return (
    <div>
      <div className='grid grid-cols-2 px-4 justify-between items-center'>
        <div className='frm_hdr_ttle'>
          <h2>Ask For An Address </h2>
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
          value={address}
          onChange={handleChange}
          placeholder="Enter address"
        />
      </FormControl>
      <Button mt={4} onClick={handleSubmit} colorScheme="blue">
        Add Address
      </Button>
    </div>
  );
};

export default AskAddress;
