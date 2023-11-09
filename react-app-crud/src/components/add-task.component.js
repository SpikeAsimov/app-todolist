import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../actions/tasks";

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.newTask = this.newTask.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            completed: false,

            submitted: false,
        };        
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    saveTutorial() {
        const { title, description } = this.state;

        this.props
            .createTask(title, description)
            .then((data) => {
                this.setState({
                id: data.id,
                title: data.title,
                description: data.description,
                completed: data.completed,

                submitted: true,
            });
            console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });    
  }

    newTask() {
        this.setState({
            id: null,
            title: "",
            description: "",
            completed: false,

            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Tou submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTask}>
                            Add
                        </button>
                    </div>
                ) : ( 
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />                            
                        </div>

                        <button onClick={this.saveTask} className="btn btn-succes">
                            Submt
                        </button>
                    </div>
                )}
            </div>
        );
    }   
}

export default connect(null, { createTask })(AddTask);