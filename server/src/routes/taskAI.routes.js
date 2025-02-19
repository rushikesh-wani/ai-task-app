const express = require("express");
const auth = require("../middleware/auth");
const {
  generateAITasks,
  addTask,
  completeTask,
  deleteTask,
  editTask,
  getAllTasks,
  getAllTaskByStatus,
} = require("../controllers/task.controller");

const taskRouter = express.Router();

taskRouter.post("/task/generate", auth, generateAITasks);
taskRouter.post("/task/add-task", auth, addTask);
taskRouter.post("/task/complete/:taskId", auth, completeTask);
taskRouter.delete("/task/delete/:taskId", auth, deleteTask);
taskRouter.patch("/task/edit/:taskId", auth, editTask);
taskRouter.get("/task/get-all", auth, getAllTasks);
taskRouter.get("/task/get-all/:status", auth, getAllTaskByStatus);

module.exports = taskRouter;
