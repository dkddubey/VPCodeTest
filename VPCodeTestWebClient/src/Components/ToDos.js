import { useEffect, useState } from "react";
//import { Table, ToastBody } from "../node_modules/reactstrap/types/index";

const ToDos = () => {

//1 create useState
    const [tasks, setTasks] = useState([])

//2 Call API

    //useEffect(() => {
    //    fetch("api/task/gettasks")
    //        .then(response => response.json());
    //        .then(data => setTasks(data))
    //        .catch(error => console.error('Error fetching data:', error));
    //}, [])

    //useEffect(() => {
    //    fetch('api/task/gettasks')
    //        .then(response => response.json())
    //        .then(data => setTasks(data))
    //        .catch(error => console.error('Error fetching data', error));
    //}, [])


    useEffect(() => {
        fetch('https://localhost:7211/api/todo/gettodos')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // const handleDelete = (itemId) => {
    //     const updateItems = tasks.filter((item) => item.id !== itemId);
        
    //     setTasks(updateItems);
    // }

    const handleDelete = async (itemId) => {
        try {
          const response = await fetch(`https://localhost:7211/api/todo/${itemId}`, {
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

//3 create div and table

    return (
        <div className="container">
            {/*<h1>Tasks</h1>*/}
            {/*<div className="row">*/}
            {/*    <div className="col-sm-12">*/}
            {/*        <table className="table table-stripped">*/}
            {/*            */}{/*<thead>*/}
            {/*            */}{/*    <tr>*/}
            {/*            */}{/*        <th>ID</th>*/}
            {/*            */}{/*        <th>Name</th>*/}
            {/*            */}{/*        <th>Deadline</th>*/}
            {/*            */}{/*        <th>Status</th>*/}
            {/*            */}{/*    </tr>*/}
            {/*            */}{/*</thead>*/}
            {/*            <tbody>*/}
            {/*                {tasks.map(item => (*/}
            {/*                    <tr key={item.id}>*/}
            {/*                        */}{/*<td>{item.id}</td>*/}
            {/*                        <td>*/}
            {/*                            <div>{item.name}</div>                                        */}
            {/*                            <div><button onClick={() => handleDelete(item.id)}>X</button></div>*/}
            {/*                        </td>*/}
            {/*                        */}{/*<td>{item.deadline}</td>*/}
            {/*                        */}{/*<td>{item.isCompleted ? "Completed" : "Open"}</td>*/}
            {/*                    </tr>*/}
            {/*            ))}*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <h1>ToDos</h1>
            <ul className="item-list">
                {tasks.map((item) => (
                    <li key={item.id} className="list-item">
                        <span>{item.name}</span>
                        <button onClick={() => handleDelete(item.id)} className="delete-button">
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToDos;
