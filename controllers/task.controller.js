const Task = require("../models/task.model.js");


exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });                    
    }

    //Create Task
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false
    });

    //Save Task
    Task.create(task, (err, data) =>{
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Task."
    });
    else res.send(data);
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Task was update successfully"
                });
            } else {
                res.send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });
};

//Retrieve all Tasks from the database (with condition)

exports.findAll = (req, res) => {
    const title = req.query.title;
    
    Task.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Task.findByPk(id)
        .then( data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Task with id= ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task with id=" + id
            });
        });

};



//Delete

exports.delete = (req, res) => {

    const id = req.params.id;
    Task.destroy({
        where: { id: id}
    })
        .then(num => {
            if(num ==1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tasks were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks"
            });
        });
};

exports.findAllCompleted = (req, res) => {
    Task.getAllCompleted((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
        });
        else res.send(data);
    });
};

