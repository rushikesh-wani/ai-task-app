import { toast } from "sonner";
import api from "./api";

export const addTask = async (formData) => {
  try {
    const response = await api.post("/task/add-task", formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response?.status === 201) {
      toast.success("Task Added Successfully!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllTasks = async () => {
  try {
    const res = await api.get("/task/get-all", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    return res?.data;
  } catch (err) {
    console.log(err);
    toast.error("Error fetching the tasks! Reload the page");
  }
};

export const getFilterTasks = async (status) => {
  try {
    const res = await api.get(`/task/get-all/${status}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    return res?.data?.data;
  } catch (err) {
    console.log(err);
    toast.error("Error fetching the tasks! Reload the page");
  }
};

export const handleTaskCompletion = async (taskId, getPendingTasks) => {
  try {
    const response = await api.post(
      `/task/complete/${taskId}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Task marked as completed!");
      await getPendingTasks();
    }
  } catch (error) {
    console.error("Failed to update task status:", error);
    toast.error(
      error?.response?.data?.err ||
        error?.response?.data?.message ||
        "Failed to update task Status!"
    );
  }
};

export const editTask = async (formData) => {
  try {
    const { _id, topic, description, status, priority } = formData;
    const res = await api.patch(
      `/task/edit/${_id}`,
      { topic, description, status, priority },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      toast.success(res?.data?.data?.message || "Task updated successfully!");
    }
  } catch (err) {
    toast.error(
      err?.response?.data?.err ||
        err?.response?.data?.message ||
        "something went wrong!"
    );
  }
};

export const deleteTaskService = async (
  taskId,
  filteredTasks,
  setFilteredTasks
) => {
  try {
    const res = await api.delete(
      `/task/delete/${taskId}`,

      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      toast.success(res?.data?.data?.message || "Task deleted successfully!");
    }
  } catch (err) {
    toast.error(
      err?.response?.data?.err ||
        err?.response?.data?.message ||
        "something went wrong!"
    );
    console.log(err);
  }
};
