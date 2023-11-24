import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link, redirect } from "react-router-dom";

export default class TasksList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTasks = this.retrieveTasks.bind(this);
        this.refreshList = this.refreshList.bind(this);        
        this.setActivateTask = this.setActivateTask.bind(this);
        this.removeAllTasks = this.removeAllTasks.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        

        this.state = {
            task: [],
            currentTask: null,
            currentIndex: -1,
            searchTitle: ""
        };        
    }

    componentDidMount() {
        this.retrieveTasks();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    retrieveTasks() {
        TaskDataService.getAll()
            .then(response => {
                this.setState({
                    tasks: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTasks();
        this.setState({
            currentTask: null,
            currentIndex: -1
        });
    }

    setActivateTask(task, index) {
        this.setState({
            currentTask: task,
            currentIndex: index
        });
    }

    removeAllTasks() {
        TaskDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        TaskDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    tasks: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { searchTitle, tasks, currentTask, currentIndex } = this.state;
        
        return (
            <div className="row nes-container with-title is-centered">
                <p className="title">
                    To Do List</p>
                <div className="col-lg-12">
                    <div >
                        <input
                            type="text"
                            className="nes-input"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />                        
                        <button
                            className="nes-btn"
                            type="button"
                            onClick={this.searchTitle}
                        >
                            Search
                        </button>
                        <button
                            className="nes-btn"
                            type="button"
                            onClick={this.refreshList}
                        >
                            Refresh
                        </button>
                        <button
                            className="nes-btn is-success"
                            type="button"                            
                        >
                         Add   
                        </button>
                    </div>
                </div>
                <div className="col-lg-6">                    

                    <ul className="list-group">
                        {tasks &&
                            tasks.map((task, index) => (
                                <li
                                    className={
                                        "nes-pointer nes-btn is-primary " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActivateTask(task, index)}
                                    key={index}
                                >
                                    {task.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        type="button"
                        className="nes-pointer nes-btn is-error"
                        onClick={this.removeAllTasks}
                        >
                        Remove All
                    </button>


                </div>
                <div className="col-lg-6">
                    {currentTask ? (                      
                            <div className="nes-table-responsive">
                                <table className="nes-table is-bordered">
                                    <thead>
                                    <tr>
                                        <th colSpan={2}><strong>Title:</strong>
                                        <label>{" "}</label>                                    
                                        {currentTask.title}                                    
                                        </th>                                    
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><label>
                                            <strong>Description:</strong>
                                        </label>{" "}
                                        {currentTask.description}</td>                                    
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                <strong>Status:</strong>
                                            </label>{" "}
                                            {currentTask.completed ? (
                                                <i className="nes-icon is-large like" />
                                                ) :
                                                (  <i className="nes-icon is-large like is-empty" />
                                                )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link to={"/tasks/" + currentTask.id} href="#" className="nes-btn is-warning">
                                                <span className="is-warning">Edit</span>
                                            </Link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                    ) : (
                            <section className="nes-container">
                                <section className="message-list">
                                    <section className="message -left">
                                    <div className="nes-balloon from-left">
                                        <p>Please click on a Task...</p>
                                    </div>
                                    </section>
                                </section>
                            </section>
                    )}
                </div>
            </div>
        );
    }
}
