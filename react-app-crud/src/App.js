import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AddTask from "./components/add-task.component";
import Task from "./components/task.component";
import TasksList from "./components/tasks-list.component";



class App extends Component {
  render(){
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bk-dark">
          <Link to={"/tasks"} className="navbar-brand">
            Task - App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tasks"} className="nav-link">
                Tasks
              </Link>              
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={ <TasksList/>} />
            <Route path="/add" element={ <AddTask/>} />
            <Route path="/tasks/:id" element={<Task/>} />
          </Routes>
        </div>
      </Router>
    );    
  }
}



export default App;
