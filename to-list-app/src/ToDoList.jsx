//useState is a React Hook that lets you add state to functional components
import { useState } from "react";

import './App.css'


//ToDoList is our main component function
function ToDoList() {
    //tasks is the state variable that holds the list of tasks
    //setTask is the function to update the tasks state
    //useState([]) initializes tasks as an empty array
    const [tasks, setTask] = useState([]);
    //newTask is the state variable that holds the current input value for a new task
    //setNewTask is the function to update the newTask state
    //useState("") initializes newTask as an empty string
    const [newTask, setNewTask] = useState("");

    //When user types in the input field, this updates newTask state
    function handleInputChange(e) {
        //e.target.value gets the current text from the input field
        setNewTask(e.target.value);
    }

    function addTask() {
        //Checks if the task isn't just empty spaces
        if (newTask.trim() !== ""){  // Prevent adding empty tasks
        //Adds the new task to the tasks array using the spread operator    
        setTask(t=> [...t, newTask]);
        setNewTask("");
        }
    }

    function deleteTask(index) {
        //Filters out the task at the given index
        //_ means we're ignoring the actual task value, we only care about the index
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTask(updatedTasks);


    }

    // Function to move a task up in the list
    function moveTaskUp(index) {
        // Check if the task is not already at the top
        if (index > 0){
            // Create a copy of the tasks array
            const updatedTasks = [...tasks];
            // Swap the task with the one above it
            // Destructuring assignment to swap elements
            // updatedTasks[index - 1] is the task above
            // updatedTasks[index] is the current task
            // This effectively moves the current task up one position
            // in the list and the task above it down one position
            // Example: If index is 2, it swaps tasks at positions 1 and 2
            // Resulting in the task at index 2 moving to index 1
            // and the task at index 1 moving to index 2
            // This is a common technique to reorder items in an array
            // without needing a temporary variable
            // It makes the code cleaner and easier to understand
            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            setTask(updatedTasks);
        }

    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
            setTask(updatedTasks);
        }

    }
  // The component's UI structure
  return(
    <div className="to-do-list">
        <h1>To-Do List</h1>
        <div className="input-section">
            <fieldset>
                <legend>Tasks</legend>
            
            <input 
                type="text" 
                value={newTask}
                onChange={handleInputChange}
                placeholder="Enter a new task"
            />
            <button className="add-button" onClick={addTask}>Add Task</button>
            </fieldset>
        </div>

        <fieldset style={{marginTop: '20px',cursor: 'pointer'}}>
         <ol>
            {tasks.map((task,index)=>
                <li key={index}>
                    <span className="text">{task}</span>
                    
                    <button className="up-button" onClick={() => moveTaskUp(index)}>↑</button>
                    <button className="down-button" onClick={() => moveTaskDown(index)}>↓</button>
                    <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                </li>
            )}
        </ol>
        </fieldset>
       
    </div>
  );
}

export default ToDoList