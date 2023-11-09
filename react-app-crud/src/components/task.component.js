import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../actions/tasks";
import TaskDataService from "../services/task.service";

class Task extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTask = this.getTask.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.removeTask = this.removeTask.bind(this);

        this.state = {
            currentTask: {
                id: null,
                title: "",
                description: "",
                completed: false,
            },
            message: "",
        };
    }

    
    componentDidMount() {
        this.getTask(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTask: {
                    ...prevState.currentTask,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentTask: {
                    ...prevState.currentTask,
                    description: description,
                },            
        }));
    }

    getTask(id) {
        TaskDataService.get(id)
            .then((response) => {
                this.setState({
                    currentTask: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }


    updateStatus(status) {
        var data = {
            id: this.state.currentTask.id,
            title: this.state.currentTask.title,
            description: this.state.currentTask.description,
            completed: status,
        };

        this.props
            .updateTask(this.state.currentTask.id, data)
            .then((response) => {
                console.log(response);
                
                this.setState((prevSate) => ({
                    currentTask: {
                        ...prevSate.currentTask,
                        completed: status,
                    },
                }));

                this.setState({ message: "The status was updated successfully!"});
            })
            .catch((e) => {
                console.log(e);
            });

    }

    updateContent() {
        this.props
            .updateTask(this.state.currentTask.id, this.state.currentTask)
            .then((response) => {
                console.log(response);

                this.setState({ message: "the task was updated successfully!"});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    removeTask() {
        this.props
            .deleteTask(this.state.currentTask.id)
            .then(() => {
                this.props.history.push("/tasks");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentTask } = this.state;
    
        return (
            <div>
                {currentTask ? (
                    <div className="edit-form">
                        <h4>Task</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentTask.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTask.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <strong>Status</strong>
                                </label>
                                {currentTask.completed ? "Completed" : "Pending"}
                            </div>
                            {currentTask.completed ? (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updateStatus(false)}
                                >
                                    UnCompleted
                                </button>
                            ) : (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updateStatus(true)}
                                >
                                    Completed
                                </button>
                            )}
                            <button
                                className="badge badge-danger mr-2"
                                onClick={this.removeTask}
                            >
                                Delete
                            </button>
                            <button
                                type="submit"
                                className="badge badge-success"
                                onClick={this.updateContent}
                            >
                                Update
                            </button>
                            <p>{this.state.message}</p>
                        </form>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Task...</p>
                    </div>
                )}
            </div>
        );
    }
    
}

export default connect(null, { updateTask, deleteTask })(Task);
