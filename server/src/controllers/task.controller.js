const { GoogleGenerativeAI } = require("@google/generative-ai");
const Task = require("../models/task.model");

const generateAITasks = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ err: "Topic is required" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();
    const tasks = generatedText
      .split("\n")
      .filter((task) => task.trim() !== "");

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Task generated successfully!",
      data: tasks,
    });
  } catch (error) {
    console.error("Error generating tasks:", error);
    res
      .status(500)
      .json({ message: "Error generating tasks", err: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { topic, description, status, priority } = req.body;

    if (!topic || !description) {
      return res
        .status(400)
        .json({ err: "Topic and description are required" });
    }

    if (status && !["pending", "completed"].includes(status)) {
      return res.status(400).json({ err: "Invalid status value" });
    }

    if (priority && !["low", "medium", "high"].includes(priority)) {
      return res.status(400).json({ err: "Invalid priority value" });
    }

    const newTask = new Task({
      userId: req.user._id,
      topic,
      description,
      status: status || "pending",
      priority: priority || "low",
    });

    await newTask.save();
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Server error", err: error.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOne({ _id: taskId, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.status === "completed") {
      return res.status(400).json({ message: "Task is already completed" });
    }
    task.status = "completed";
    await task.save();
    res.json({ message: "Task marked as completed", task });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Server error", err: error.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { topic, description, status, priority } = req.body;

    // Find task belonging to the logged-in user
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Validations
    if (status && !["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    if (priority && !["low", "medium", "high"].includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }

    // Update only provided fields
    if (topic !== undefined) task.topic = topic;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ err: "Server error", errMsg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find and delete the task belonging to the logged-in user
    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { _id, email } = req.user;
    const allTasks = await Task.find({ userId: _id, status: "pending" });
    return res.status(200).json({
      message: "All Task fetched successfully!",
      data: allTasks,
    });
  } catch (err) {
    res.status(500).json({ message: "INTERNAL_SERVER_ERR", err: err.message });
  }
};

const getAllTaskByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const { _id } = req.user;
    if (!["pending", "completed", "high", "low", "medium"].includes(status)) {
      return res.status(400).json({
        err: "Status is not valid",
      });
    }
    let filterTasks;
    if (["pending", "completed"].includes(status)) {
      filterTasks = await Task.find({ userId: _id, status: status });
    } else if (["high", "low", "medium"].includes(status)) {
      filterTasks = await Task.find({ userId: _id, priority: status });
    }
    return res.status(200).json({
      message: "All Task fetched successfully!",
      data: filterTasks,
    });
  } catch (err) {
    res.status(500).json({ message: "INTERNAL_SERVER_ERR", err: err.message });
  }
};

module.exports = {
  generateAITasks,
  addTask,
  completeTask,
  editTask,
  deleteTask,
  getAllTasks,
  getAllTaskByStatus,
};
