import React, { useState } from 'react';

const AddTask = ({ onAddTask }) => {
    const [newTask, setNewTask] = useState({
        "id": 0,
        "taskName": '',
        "isCompleted": false,
        "deadline": ''
    });

    const [validationMessages, setValidationMessages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationMessages([])
        if (!validatTask()) {
            return;
        } else {
            setValidationMessages([])
        }
        onAddTask(newTask);

        setNewTask({
            "id": 0,
            "taskName": '',
            "isCompleted": false,
            "deadline": ''
        });
    };

    const validatTask = () => {
        let isValid = true;

        //Validate task name
        if (newTask.taskName.trim().length === 0) {
            setValidationMessages((prevErrors) => ([ ...prevErrors, 'Task name is required.' ]));
            isValid = false;
        } else if (newTask.taskName.trim().length < 11) {
            setValidationMessages((prevErrors) => ([...prevErrors, 'Task must be longer than 10 characters.']));
            isValid = false;
        } 

        // Validate deadline
        if (newTask.deadline.trim().length === 0) {
            setValidationMessages((prevErrors) => ([...prevErrors,'Deadline is required.']));
            isValid = false;
        }

        return isValid;
    };


    return (
        <form onSubmit={handleSubmit}>
            <label style={{width:'60%'} }>
                Task Name:
                <input className="input-task-name"
                    type="text"
                    name="taskName"
                    value={newTask.taskName}
                    onChange={handleChange}
                    placeholder="Task name longer than 10 characters"
                />
            </label>
            <label>
                Deadline:
                <input 
                    type="date"
                    name="deadline"
                    value={newTask.deadline}
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

