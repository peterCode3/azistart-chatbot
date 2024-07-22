import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

const RatingBlock = ({ closeform, onSubmit }) => {
  const [rating, setRating] = useState('');
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  const handleChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(rating);
    closeform();
  };

  return (
    <div>
      <div className='grid grid-cols-2 px-4 justify-between items-center'>
        <div className='frm_hdr_ttle'>
          <h2>Rating - Lead</h2>
        </div>
        <div className='closebutton'>
          <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500">
            <MdClose />
          </Button>
        </div>
      </div>

      <FormControl as="fieldset">
        <FormLabel as="legend">Rate this:</FormLabel>
        <RadioGroup value={rating} onChange={handleChange}>
          <Stack spacing={2}>
            <Radio value="1" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ background: isFocused ? '#0CB7FC' : '#322d2d' }}>1 - Poor</Radio>
            <Radio value="2" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ background: isFocused ? '#0CB7FC' : '#322d2d' }}>2 - Fair</Radio>
            <Radio value="3" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ background: isFocused ? '#0CB7FC' : '#322d2d' }}>3 - Good</Radio>
            <Radio value="4" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ background: isFocused ? '#0CB7FC' : '#322d2d' }}>4 - Very Good</Radio>
            <Radio value="5" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={{ background: isFocused ? '#0CB7FC' : '#322d2d' }}>5 - Excellent</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Button mt={4} onClick={handleSubmit} colorScheme="blue">
        Add Rating
      </Button>
    </div>
  );
};

export default RatingBlock;
