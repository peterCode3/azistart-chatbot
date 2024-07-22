import React, { useState } from 'react';
import { Button } from '@chakra-ui/react'; // Import Chakra UI components or replace with your UI library
import {
    MdAdd,
    MdClose
  } from 'react-icons/md';
const LeadScoringForm = ({ closeform, onSubmit }) => {
  const [score, setScore] = useState(0);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setScore(value);
  };

  const handleSubmit = () => {
    onSubmit(score);
    closeform();
  };

  return (
    <div>
      <div className='grid grid-cols-2 px-4 justify-between items-center'>
        <div className='frm_hdr_ttle'>
          <h2>Lead Scoring Form</h2>
        </div>
        <div className='closebutton'>
          <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500">
            <MdClose />
          </Button>
        </div>
      </div>
      <div>
        <label htmlFor="scoreInput">Add Score here:</label>
        <input
          type="number"
          id="scoreInput"
          value={score}
          onChange={handleChange}
          min="0"
          step="1"
        />
      </div>
      <Button onClick={handleSubmit}>Add Score</Button>
    </div>
  );
};

export default LeadScoringForm;
