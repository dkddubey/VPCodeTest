
import React, { useState } from 'react';

const StatusOption = ({ onOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState('all');

    const handleOptionChange = (e) => {
        // Update the state when a radio button is selected
        setSelectedOption(e.target.value);
        onOptionChange(e.target.value);
    };

    return (
        <div>
            <label>
                <input className="margin-left"
                    type="radio"
                    value="all"
                    checked={selectedOption === 'all'}
                    onChange={handleOptionChange}
                />
                All
            </label>
            <label>
                <input className="margin-left"
                    type="radio"
                    value="active"
                    checked={selectedOption === 'active'}
                    onChange={handleOptionChange}
                />
                Active
            </label>
            <label>
                <input className="margin-left"
                    type="radio"
                    value="completed"
                    checked={selectedOption === 'completed'}
                    onChange={handleOptionChange}
                />
                Completed
            </label>
            <label>
                <input className="margin-left"
                    type="radio"
                    value="overdue"
                    checked={selectedOption === 'overdue'}
                    onChange={handleOptionChange}
                />
                Overdue
            </label>
        </div>
    );
};

export default StatusOption;
