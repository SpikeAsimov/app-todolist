import {
    CREATE_TASK,
    RETRIEVE_TASKS,
    UPDATE_TASK,
    DELETE_TASK,
    DELETE_ALL_TASKS
} from "./types";

import TaskDataService from "../services/task.service";

export const createTask = (title, description) => async (dispatch) => {
    try {
        const res = await TaskDataService.create({ title, description });

        dispatch({
            type: CREATE_TASK,
            payload: res.data,
        });

        return Promise.resolve(res.data);        
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveTask = () => async (dispatch) => {
    try {
        const res = await TaskDataService.getAll();

        dispatch({
            type: RETRIEVE_TASKS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};


export const updateTask = (id, data) => async (dispatch) => {
    try {
        const res = await TaskDataService.update(id, data);

        dispatch({
            type: UPDATE_TASK,
            payload: data,
        });

        return Promise.resolve(res.data);        
    } catch (err) {
        return Promise.reject(err);
    }
};


export const deleteTask = (id) => async (dispatch) => {
    try {
        await TaskDataService.delete(id);

        dispatch({
            type: DELETE_TASK,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};


export const deleteAllTasks = () => async (dispatch) => {
    try {
        const res = await TaskDataService.deleteAll();

        dispatch({
            type: DELETE_ALL_TASKS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};


export const findTaskByTitle = (title) => async (dispatch) => {
    try {
        const res = await TaskDataService.findbytitle(title);

        dispatch({
            type: RETRIEVE_TASKS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};