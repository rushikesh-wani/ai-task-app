import { Sparkles, Zap } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSuggestion } from "../services/taskAI";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  LayoutDashboard,
  LetterText,
  Mail,
} from "lucide-react";
import Modal from "../components/Modal";
import { addTask } from "../services/task";

const AddTask = () => {
  const [prompt, setPrompt] = useState("");
  const [task, setTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    priority: "low",
    status: "pending",
  });
  const [priority, setPriority] = useState("low");
  const navigate = useNavigate();
  const handler = async () => {
    setIsLoading(true);
    if (prompt) {
      const res = await getSuggestion(prompt);
      console.log(res);
      setTask(res?.data);
      setIsLoading(false);
    } else {
      toast.warning("Enter the task prompt!");
    }
  };

  const handleOpenModal = (taskPoint) => {
    setSelectedTask(taskPoint);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="mt-5 col-span-10">
        <div className="mb-10 w-full text-center text-white">
          <p className="inline-flex gap-2 items-center justify-center px-4 py-2 bg-white/5 border border-gray-500 rounded-lg">
            <Zap />
            AI-Powered Task Generation: Smart, Fast, and Effortless!
          </p>
        </div>
        <div className="w-full inline-flex items-center justify-center gap-4 text-white">
          <input
            className="w-xl px-4 py-2 bg-black/50 rounded-lg ring-0 focus:outline-none"
            placeholder="Enter the task..."
            onChange={(e) => {
              setTask([]);
              setPrompt(e.target.value);
            }}
          />
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl blur-sm bg-gradient-to-r from-rose-800 via-violet-600 to-blue-600"></div>
            <button
              onClick={handler}
              className="inline-flex gap-1 items-center justify-center bg-white/40 backdrop-filter backdrop-blur-sm text-black ring-2 ring-white/5 px-5 py-1 text-lg font-semibold rounded-lg cursor-pointer"
            >
              <Sparkles className="size-5" /> AI Anaylse
            </button>
          </div>
        </div>
        <div className="p-5 flex flex-col gap-2">
          {isLoading && (
            <p className="w-[70%] mx-auto h-10 bg-white/20 rounded-lg animate-pulse"></p>
          )}
          {task ? (
            task?.map((taskPoint, idx) => (
              <Link
                key={idx}
                onClick={() => {
                  handleOpenModal(taskPoint);
                }}
                className="w-[70%] inline-flex items-center gap-4 mx-auto px-4 py-2 bg-white text-black rounded-lg"
              >
                <span className="p-2 flex items-center justify-center size-6 rounded-full bg-black text-white">
                  {idx + 1}
                </span>
                {taskPoint}
              </Link>
            ))
          ) : (
            <div className="w-[70%] mx-auto p-5 bg-white text-black rounded-lg">
              No tasks found!
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title={"Add Task"}
          description={
            "Add your task with the description and priority of task..."
          }
          isOpen={isModalOpen}
          onClose={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
        >
          <div className="my-3 flex flex-col gap-1">
            <label
              className="text-base sm:text-lg inline-flex gap-2 items-center"
              htmlFor="email"
            >
              <Mail /> Title
            </label>
            <input
              id="text"
              type="text"
              value={selectedTask}
              onChange={(e) => setFormData(selectedTask)}
              placeholder="Enter your task title here..."
              className="px-4 py-2 bg-black/50 rounded-lg ring-0 focus:outline-none"
            />
            <label
              className="text-base sm:text-lg inline-flex gap-2 items-center"
              htmlFor="desc"
            >
              <LetterText /> Description
            </label>
            <textarea
              id="desc"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Paste the task description here..."
              className="max-h-24 h-24 min-h-24 px-4 py-2 bg-black/50 rounded-lg ring-0 focus:outline-none"
            />

            <div>
              <div className="text-base sm:text-lg inline-flex gap-2 items-center">
                <LayoutDashboard /> <p>Priority</p>
              </div>
              <div className="w-full p-2 inline-flex gap-2 items-center">
                {["low", "medium", "high"].map((level) => (
                  <label
                    key={level}
                    className={`flex items-center gap-2 px-3 py-1 border rounded-lg cursor-pointer ${
                      priority === level
                        ? "bg-white text-black"
                        : "hover:bg-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={level}
                      checked={priority === level}
                      onChange={() => setPriority(level)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        level === "low"
                          ? "border-green-500 bg-green-500"
                          : level === "medium"
                          ? "border-yellow-500 bg-yellow-500"
                          : "border-red-500 bg-red-500"
                      }`}
                    />
                    <span className="capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 w-full inline-flex justify-center items-center">
            <button
              onClick={() => {
                addTask({
                  topic: selectedTask,
                  description: formData.description,
                  priority,
                  status: "pending",
                });
                navigate("/");
              }}
              className="bg-white text-black px-5 py-1 text-lg font-semibold rounded-lg"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddTask;
