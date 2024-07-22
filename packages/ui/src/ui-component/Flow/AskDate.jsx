import React, { useState } from 'react';
import { Button, FormControl, FormLabel } from '@chakra-ui/react'; // Import Chakra UI components or replace with your UI library
import { MdClose } from 'react-icons/md';

const AskDate = ({ closeform, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    age: '',
    location: '',
    dateType: '',
    dateActivities: [],
    aboutYourself: '',
    preferences: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const updatedActivities = formData.dateActivities.includes(value)
      ? formData.dateActivities.filter(activity => activity !== value)
      : [...formData.dateActivities, value];
    setFormData({ ...formData, dateActivities: updatedActivities });
  };

  const handleSubmit = () => {
    if (formData.name.trim() !== '' && formData.email.trim() !== '' && formData.phoneNumber.trim() !== '') {
      onSubmit(formData);
      closeform();
    }
  };

  return (
    <div>
      <div className='grid grid-cols-2 px-4 justify-between items-center'>
        <div className='frm_hdr_ttle'>
          <h2>Ask For A Date - Lead</h2>
        </div>
        <div className='closebutton'>
          <Button className='close_icns' onClick={closeform} fontSize="sm" me="0px" mb="26px" borderRadius="16px" fontWeight="500">
            <MdClose />
          </Button>
        </div>
      </div>
      <FormControl>
        <FormLabel>Name:</FormLabel>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email:</FormLabel>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Phone Number:</FormLabel>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Gender:</FormLabel>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </FormControl>
      <FormControl>
        <FormLabel>Age:</FormLabel>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Location:</FormLabel>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter your location"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Type of Date Interested In:</FormLabel>
        <select
          name="dateType"
          value={formData.dateType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="casual">Casual</option>
          <option value="romantic">Romantic</option>
          <option value="adventure">Adventure</option>
          <option value="other">Other</option>
        </select>
      </FormControl>
      <FormControl>
        <FormLabel>Preferred Date Activities:</FormLabel>
        <div>
          <label>
            <input
              type="checkbox"
              name="dateActivities"
              value="dinner"
              checked={formData.dateActivities.includes('dinner')}
              onChange={handleCheckboxChange}
            /> Dinner
          </label>
          <label>
            <input
              type="checkbox"
              name="dateActivities"
              value="movie"
              checked={formData.dateActivities.includes('movie')}
              onChange={handleCheckboxChange}
            /> Movie
          </label>
          <label>
            <input
              type="checkbox"
              name="dateActivities"
              value="hiking"
              checked={formData.dateActivities.includes('hiking')}
              onChange={handleCheckboxChange}
            /> Hiking
          </label>
          <label>
            <input
              type="checkbox"
              name="dateActivities"
              value="concert"
              checked={formData.dateActivities.includes('concert')}
              onChange={handleCheckboxChange}
            /> Concert
          </label>
        </div>
      </FormControl>
      <FormControl>
        <FormLabel>Describe Yourself in a Few Words:</FormLabel>
        <textarea
          name="aboutYourself"
          value={formData.aboutYourself}
          onChange={handleChange}
          placeholder="Describe yourself briefly"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Any Specific Requests or Preferences:</FormLabel>
        <textarea
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
          placeholder="Any specific requests or preferences"
        />
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AskDate;