import React, { useState } from 'react';

function Todo() {
  const [tasks, setTasks] = useState(["get up", "take a shower", "eat breakfast"]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState("");

  const handleInput = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const moveUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] =
        [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  };

  const moveDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] =
        [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  };

  const startEditing = (index, task) => {
    setEditingIndex(index);
    setEditedTask(task);
  };

  const updateTask = () => {
    if (editedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = editedTask;
      setTasks(updatedTasks);
      setEditingIndex(-1);
      setEditedTask("");
    }
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="container22">
      <h1 className='h1'>Todo List</h1>
      <input className='input' type='text' placeholder='enter task' value={newTask} onChange={handleInput} /><br />
      <button className='addtaskbtn' onClick={addTask}>Add Task</button>
      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                <button onClick={updateTask}>Save</button>
              </>
            ) : (
              <>
                <span className='task'>{task}</span>
                <button className='deletebtnn' onClick={() => deleteTask(index)}>Delete Task</button><br />
                <button className='moveupbtn' onClick={() => moveUp(index)}>Move Up</button>
                <button className='movebtn' onClick={() => moveDown(index)}>Move Down</button>
                <button className='editbtn' onClick={() => startEditing(index, task)}>Edit Task</button>
              </>
            )}
          </li>
        )}
      </ol>
      <div className="task-count">Total Tasks: {tasks.length}</div>
      <button className='cleartasksbtn' onClick={clearTasks}>Clear Tasks</button>
    </div>
  );
}

export default Todo;