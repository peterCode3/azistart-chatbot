import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { MdClose, MdDelete } from 'react-icons/md';

const AskButton = ({ closeform, onSubmit }) => {
    const [items, setItems] = useState([]);
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e, index) => {
        e.preventDefault(); 

        const updatedItems = [...items];
        updatedItems[index] = text;
        updatedItems.push(text); 

        onSubmit(text);
        setItems(updatedItems);
        closeform();
        setText('');
    };

    const addItem = () => {
        const newItem = `Item ${items.length + 1}`;
        setItems([...items, newItem]);
    };

    const handleDelete = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (
        <div className='ask-button-container'>
            <div className='grid grid-cols-2 px-4 justify-between items-center'>
                <div className='frm_hdr_ttle'>
                    <h2>Buttons</h2>
                </div>
                <div className='closebutton'>
                    <Button
                        className='close_icns'
                        onClick={closeform}
                        fontSize="sm"
                        me="0px"
                        mb="26px"
                        borderRadius="16px"
                        fontWeight="500"
                    >
                        <MdClose />
                    </Button>
                </div>
            </div>
            <div className='frm_hdr_ttle'>
                <label htmlFor="text-input">Write a message</label>
            </div>
            <textarea
                id="text-input"
                value={text}
                placeholder='Add Text Message ...'
                onChange={handleChange}
                type="text"
            />
            <button onClick={handleSubmit}>Add Message</button>
            <div className='button_editor'>
                <h2>Buttons Editor</h2>
                <div className='item-list'>
                    {items.map((item, index) => (
                        <div key={index} className='item-buttons'>
                            <input
                                className='item-button'
                                value={text}
                                placeholder='Click to Edit'
                                onChange={(e) => handleChange(e, index)} // Pass index to handleChange
                            />
                            <button
                                className='delete-button'
                                onClick={() => handleDelete(index)}
                            >
                                <MdDelete />
                            </button>
                        </div>
                    ))}
                    <button className='add_newbtn' onClick={addItem}>Add New Buttons</button>
                </div>
            </div>
        </div>
    );
};

export default AskButton;
