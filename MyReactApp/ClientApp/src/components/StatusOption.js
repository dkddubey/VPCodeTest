
import React, { useState } from 'react';

const StatusOption = ({ onOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        // Update the state when a radio button is selected
        setSelectedOption(e.target.value);
        onOptionChange(e.target.value);
    };

    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="all"
                    checked={selectedOption === 'all'}
                    onChange={handleOptionChange}
                />
                All
            </label>
            <label>
                <input
                    type="radio"
                    value="active"
                    checked={selectedOption === 'active'}
                    onChange={handleOptionChange}
                />
                Active
            </label>
            <label>
                <input
                    type="radio"
                    value="completed"
                    checked={selectedOption === 'completed'}
                    onChange={handleOptionChange}
                />
                Completed
            </label>
        </div>
    );
};

export default StatusOption;
