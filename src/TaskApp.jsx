/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useReducer } from "react";
import "./App.css";

const initialState = {
  tasks: [],
};

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const TOGGLE_TASK = "TOGGLE_TASK";

function reducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        tasks: [...state.tasks, action.payload],
      };
    case REMOVE_TASK:
      return {
        tasks: state.tasks.filter((task) => task !== action.payload),
      };
    case TOGGLE_TASK:
      return {
        tasks: state.tasks.map((task) =>
          task === action.payload
            ? { ...task, concluida: !task.concluida }
            : task
        ),
      };
    default:
      return state;
  }
}

function TaskApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTask = (descricao, dataConclusao) => {
    dispatch({
      type: ADD_TASK,
      payload: {
        descricao,
        dataConclusao,
        concluida: false,
      },
    });
  };

  const handleRemoveTask = (task) => {
    dispatch({
      type: REMOVE_TASK,
      payload: task,
    });
  };

  const handleToggleTask = (task) => {
    dispatch({
      type: TOGGLE_TASK,
      payload: task,
    });
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={state.tasks}
        onRemoveTask={handleRemoveTask}
        onToggleTask={handleToggleTask}
      />
    </div>
  );
}

function TaskForm({ onAddTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const descricao = e.target.descricao.value;
    const dataConclusao = e.target.dataConclusao.value;
    onAddTask(descricao, dataConclusao);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="descricao"
        placeholder="Descrição da Tarefa"
        required
      />
      <input type="date" name="dataConclusao" required />
      <button type="submit">+</button>
    </form>
  );
}

function TaskList({ tasks, onRemoveTask, onToggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.descricao}>
          <input
            type="checkbox"
            checked={task.concluida}
            onChange={() => onToggleTask(task)}
          />
          <span
            style={{
              textDecoration: task.concluida ? "line-through" : "none",
            }}>
            {task.descricao} - Data de Conclusão: {task.dataConclusao}
          </span>
          <button onClick={() => onRemoveTask(task)}>x</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskApp;
