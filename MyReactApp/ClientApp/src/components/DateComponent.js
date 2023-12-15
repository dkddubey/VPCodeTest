
import React, { useState } from 'react';

const DateInputComponent = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        setSelectedDate(dateValue);
    };

    return (
        <div>
            <label>
                Select a Date:
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </label>
            {selectedDate && <p>Selected Date: {selectedDate}</p>}
        </div>
    );
};

export default DateInputComponent;