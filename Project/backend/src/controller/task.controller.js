import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Task from "../model/task.model.js";

const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, discription } = req.body;
        console.log("discription", req.body)
        const createdBy = req.user._id;
        const existingTask = await Task.findOne({ title: title });
        if (existingTask) {
            throw new ApiError(400, "Task with this title already exists");
        }

        const task = await Task.create({ title, discription, createdBy });

        if (!task) {
            throw new ApiError(400, "Internal error");
        }
        res
            .status(201)
            .json(new ApiResponse(201, "Task created successfully", task));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});
const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        if (!tasks) {
            throw new ApiError(404, "No tasks found");
        }
        if (tasks.length === 0) {
            res.status(200).json(new ApiResponse(200, [], "No tasks found"));
        }
        res.status(200).json(new ApiResponse(200, tasks, "tasks found"));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});
const getTask = asyncHandler(async (req, res) => {

    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new ApiError(404, "Task not found");
        }


        res.status(200).json(new ApiResponse(200, task, "Task found"));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

// upate the task
const updateTask = asyncHandler(async (req, res) => {
    // first get the task id
    // check wheather the user is valid for updating the task or not
    // get the updated data from the user
    // update the task with the new data
    // if the task is not updated then throw an error
    try {
        const { title, discription } = req.body;
        const { id } = req.params;




        const task = await Task.findById(id);
        if (!task) {
            throw new ApiError(404, "Task not found");
        }
        if (task.createdBy.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "You are not authorized to update this Task");
        }



        task.title = title;
        task.discription = discription;
        await task.save();
        res
            .status(200)
            .json(new ApiResponse(200, "Post updated successfully", task));
    } catch (error) {

        throw new ApiError(400, error.message);
    }
});
// delete the task from the database
const deleteTask = asyncHandler(async (req, res) => {
    // get the task id
    // get the task from the database
    // check if the user is authorized to delete the task or not
    // if the user is not authorized then throw an error
    // if the user is authorized then delete the task
    // if the task is not deleted then throw an error
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json(new ApiResponse(200, "Task deleted successfully"));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});



export {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};