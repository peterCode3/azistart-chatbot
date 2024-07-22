import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Flex, Box, Text } from '@chakra-ui/react'; 
import { MdClose } from 'react-icons/md';

const OpinionScale = ({ closeform, onSubmit }) => {
  const [rating, setRating] = useState(0); 

  const handleSubmit = () => {
    if (rating > 0) { 
      onSubmit(rating);
      closeform(); 
    } else {
      alert('Please select a rating before submitting.');
    }
  };

  const handleRatingClick = (value) => {
    setRating(value); 
  };

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center" px={4}>
        <Box>
          <Text fontSize="xl">Opinion Scale</Text>
        </Box>
        <div className='closebutton'>
          <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500">
            <MdClose />
          </Button>
        </div>
      </Flex>
      <FormControl>
        <FormLabel>Please rate:</FormLabel>
        <Flex justify="space-between" mt={6} mb={6} className="flex-with-gap">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              variant={rating === value ? 'solid' : 'outline'} 
              colorScheme="blue"
              onClick={() => handleRatingClick(value)}
            >
              {value}
            </Button>
          ))}
        </Flex>
        <Button mt={4} onClick={handleSubmit} colorScheme="blue">
          Submit Rating
        </Button>
      </FormControl>
    </div>
  );
};

export default OpinionScale;
