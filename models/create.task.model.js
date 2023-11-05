module.exports = (sequelize, Sequilize) => {
    const Task = sequelize.define("task", {
        title: {
            type: Sequilize.STRING
        },
        description: {
            type: Sequilize.STRING
        },
        completed: {
            type: Sequilize.BOOLEAN
        }
    });

    return Task;
};