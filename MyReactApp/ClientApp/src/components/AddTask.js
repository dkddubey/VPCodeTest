import React, { useState } from 'react';

const AddTask = ({ onAddItem }) => {
    const [newItem, setNewItem] = useState({
        "id": 0,
        "taskName": '',
        "isCompleted": false,
        "deadline": ''
    });

    const [validationMessages, setValidationMessages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newItem.taskName.trim() === '' || newItem.deadline.trim() === '') {
            setValidationMessages(['Please enter a task with greater than 10 chars.', 'Please enter valid date']);
            return;
        }
        onAddItem(newItem);

        setNewItem({
            "id": 0,
            "taskName": '',
            "isCompleted": false,
            "deadline": ''
        });

        setValidationMessages([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Task Name:
                <input className="margin-right"
                    type="text"
                    name="taskName"
                    value={newItem.taskName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Deadline:
                <input className="margin-left margin-right"
                    type="date"
                    name="deadline"
                    value={newItem.deadline}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                />
            </label>
            <button type="submit">Add Task</button>
            {validationMessages.length > 0 && (
                <div className="validation-messages">
                    {validationMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </div>
            )}
        </form>
    );
};

export default AddTask;

