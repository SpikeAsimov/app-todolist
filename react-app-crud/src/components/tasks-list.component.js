import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveTask, findTaskByTitle, deleteAllTasks } from "../actions/tasks";
import { Link } from "react-router-dom";

class TasksList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActivateTask = this.setActivateTask.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
        this.removeAllTasks = this.removeAllTasks.bind(this);

        this.state = {
            currentTask: null,
            currentIndex: -1,
            searchTitle: "",
        };        
    }

    componentDidMount() {
        this.props.retrieveTask();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    refreshData() {
        this.setState({
            currentTask: null,
            currentIndex: -1,
        });
    }

    setActivateTask(task, index) {
        this.setState({
            currentTask: task,
            currentIndex: index,
        });
    }

    removeAllTasks() {
        this.props
            .deleteAllTasks()
            .then((response) => {
                this.refreshData();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    findByTitle() {
        this.refreshData();

        this.props.findTaskByTitle(this.state.searchTitle);
    }

    render() {
        const { searchTitle, currentTask, currentIndex } = this.state;
        const { tasks } = this.props;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.findByTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tasks List</h4>

                    <ul className="list-group">
                        {tasks &&
                            tasks.map((task, index) => (
                                <li
                                    className={
                                        "list-group-item " +
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
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTasks}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTask ? (
                        <div>
                            <h4>Task</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTask.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTask.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTask.completed ? "Completed" : "Pending"}
                            </div>

                            <Link
                                to={"/tasks/" + currentTask.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Task...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    };
};

export default connect(mapStateToProps, { retrieveTask, findTaskByTitle, deleteAllTasks }) (TasksList);