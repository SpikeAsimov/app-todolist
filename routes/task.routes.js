module.exports = app => {

    const tasks = require("../controllers/task.controller.js");

    var router = require("express").Router();

    //Create new Task
    router.post("/", tasks.create);

    //Retrieve all Taks
    router.get("/", tasks.findAll);

    //Retrieve all Completed Tasks
    router.get("/completed", tasks.findAllCompleted);

    //Retrieve a single Task with id
    router.get("/:id", tasks.findOne);

    //Update a Task with id
    router.put("/:id", tasks.update);

    //Delete a Task with id
    router.delete("/:id", tasks.delete);

    //Delete all Tasks
    router.delete("/", tasks.deleteAll);

    app.use('/api/tasks', router);
};