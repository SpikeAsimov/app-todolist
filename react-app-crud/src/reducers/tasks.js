import {
    CREATE_TASK,
    RETRIEVE_TASKS,
    UPDATE_TASK,
    DELETE_TASK,
    DELETE_ALL_TASKS,
} from "../actions/types";

const initialState = [];

function taskReducer(tasks = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_TASK:
            return [...tasks, payload];
        
        case RETRIEVE_TASKS:
            return payload;

        case UPDATE_TASK:
            return tasks.map((task) => {
                if (task.id === payload.id) {
                    return {
                        ...task,
                        ...payload,
                    };
                } else {
                    return task;
                }
            });
        
        case DELETE_TASK:
            return tasks.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_TASKS:
            return [];

        default:
            return tasks;
    }
};


export default taskReducer;