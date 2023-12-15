import React, { useState } from 'react';

const AddTask = ({ onAddItem }) => {
    const [newItem, setNewItem] = useState({
        "id": 0,
        "taskName": '',
        "isCompleted": false,
        "deadline": ''
    });

    const [isValidTask, setisValidTask] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if required fields are not empty before adding the item
        if (newItem.taskName.trim() === '' || newItem.deadline.trim() === '') {
            alert('Please fill in all required fields.', 'Field Validation.');
            return;
        }

        if (newItem.taskName.trim() < 10) {
            alert('Please enter a task with greater than 10 chars.');
            return;
        }

        // Pass the new item to the parent component (or handle it as needed)
        onAddItem(newItem);

        // Clear the form
        setNewItem({
            "id": 0,
            "taskName": '',
            "isCompleted": false,
            "deadline": ''
        });
    };

    const validateDate = () => {
        const isValid = newItem.taskName.trim().length > 10
            && newItem.deadline.trim() !== '';
        setisValidTask(isValid);
        alert(isValidTask);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Task Name:
                <input className="marginRight"
                    type="text"
                    name="taskName"
                    value={newItem.taskName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Deadline:
                <input className="marginLeft marginRight"
                    type="date"
                    name="deadline"
                    value={newItem.deadline}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                />
            </label>
            {/* Add other form fields as needed */}
            <button type="submit" disabled={!isValidTask}>Add Task</button>
            {/*{!isValid && <p style={{ color: 'red' }}>Invalid date format:{isValid}</p>}*/}
        </form>
    );
};

export default AddTask;

