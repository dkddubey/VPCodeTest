﻿import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import StatusOption from "./StatusOption";

const ToDos = () => {

    //1 create useState
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData =() => {
        fetch('api/todo')
            .then(response => response.json())
            .then(data => { setTasks(data); setFilteredTasks(data) })
            .catch(error => console.error('Error fetching data', error));
    };

    const handleAddItem = async (item) => {
        try {
            const data = JSON.stringify({
                "id": 0,
                "taskName": item.taskName,
                "isCompleted": false,
                "deadline": item.deadline
            });
            const response = await fetch(`api/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: data
            });

            if (response.ok) {
                // If the deletion was successful, update the local state
                //const updateItems = tasks.filter((item) => item.id !== itemId);
                //setTasks(updateItems);
                fetchData()
                alert(item.taskName + ": set done");
            } else {

                // Handle error, maybe show a message to the user
                console.error('Error updating item:', response.status);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDone = async (item) => {
        try {
            const data = JSON.stringify({
                "id": item.id,
                "taskName": item.taskName,
                "isCompleted": true,
                "deadline": item.deadline
            });
            const response = await fetch(`api/todo/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: data,
            });

            if (response.ok) {
                fetchData()
                alert(item.taskName + ": set done");
            } else {

                // Handle error, maybe show a message to the user
                console.error('Error updating item:', response.status);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`api/todo/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
            });

            if (response.ok) {
                // If the deletion was successful, update the local state
                const updateItems = tasks.filter((item) => item.id !== itemId);
                setTasks(updateItems);
            } else {
                // Handle error, maybe show a message to the user
                console.error('Error deleting item:', response.status);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleOptionChanged = (selectedOption) => {
        if (selectedOption === 'active') {
            const filtered = tasks.filter((item) => item.isCompleted !== true);
            setFilteredTasks(filtered);
        }
        else if (selectedOption === 'completed') {
            const filtered = tasks.filter((item) => item.isCompleted === true);
            setFilteredTasks(filtered);
        }
        else {
            setFilteredTasks(tasks);
        }
        
    };
    const formattedDate = (deadline) => {
        const date = new Date(deadline);
       return  date.toLocaleDateString('en-US', {
            year: 'numeric',
           month: 'short',
            day: 'numeric',
        });
    }
    return (
        <div className="container">
            <h1>Tasks</h1>
            <AddTask onAddItem={handleAddItem} />
            <table className="table">
                <thead>
                    <tr className="header">
                        <th>Task details</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map(item => (
                        <tr key={item.id} className={item.isCompleted ? "tododone" : ""} >
                            <td>
                                {item.taskName}
                            </td>
                            <td>{formattedDate(item.deadline)}</td>
                            <td>{item.isCompleted ? "Done" : "Open"}</td>
                            <td><button onClick={() => handleDelete(item.id)}>
                                Delete
                            </button>
                                <button onClick={() => handleDone(item)} hidden={item.isCompleted}>
                                Done
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <StatusOption onOptionChange={handleOptionChanged} />
        </div>
    )
}

export default ToDos;