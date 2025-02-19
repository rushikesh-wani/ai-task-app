import {
  Calendar,
  CircleCheck,
  LayoutDashboard,
  LetterText,
  ListTodo,
  Mails,
  ScanSearch,
  Text,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  editTask,
  getAllTasks,
  getFilterTasks,
  handleTaskCompletion,
} from "../services/task";
import Modal from "./Modal";

const Blocks = () => {
  const [task, setTask] = useState();
  const [filterTask, setFilterTask] = useState("completed");
  const [filteredTasks, setFilteredTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState();

  const getPendingTasks = async () => {
    const taskData = await getAllTasks();
    setTask(taskData?.data);
  };
  const getTask = async () => {
    if (filterTask === "completed") {
      setFilteredTasks(await getFilterTasks("completed"));
    }
  };
  useEffect(() => {
    getPendingTasks();
    getTask();
  }, [isModalOpen, filterTask]);
  return (
    <>
      <div className="relative col-span-6 h-[500px] overflow-y-scroll bg-[#272727]/60 text-white rounded-lg">
        <h2 className="z-10 w-full sticky top-0 inline-flex gap-2 items-center left-0 right-0 px-6 py-2 text-xl font-semibold bg-[#272727]/10 backdrop-filter backdrop-blur-sm shadow-md">
          <ListTodo /> Schedule Tasks
        </h2>
        <div className="px-1 my-2 sm:px-4 sm:my-4 flex flex-col gap-2">
          {task?.length === 0 && (
            <div className="mt-24 flex flex-col items-center justify-center gap-4">
              <ScanSearch className="size-24" />
              <p className="text-center">No task added! Go to add task...</p>
            </div>
          )}
          {task?.map((item, idx) => (
            <div key={item._id} className="p-2 w-full bg-black/50 rounded-lg ">
              <div className="grid grid-flow-col grid-cols-16 grid-rows-1 items-center">
                <div className="col-span-1">
                  <input
                    type="radio"
                    id={item.id}
                    checked={filteredTasks[item._id] || false}
                    onChange={() => {
                      handleTaskCompletion(
                        item._id,
                        setFilteredTasks,
                        getPendingTasks
                      );
                    }}
                    className="size-6"
                  />
                </div>
                <div className="col-span-15">
                  <p className="w-full truncate text-lg sm:text-lg font-semibold">
                    {item?.topic}
                  </p>

                  <p className="text-xs inline-flex items-center gap-1 font-semibold">
                    <Calendar className="size-4" />{" "}
                    {Date(item?.createAt).toLocaleString()}
                  </p>
                  <div className="text-xs px-3 py-1 uppercase bg-white/10 w-fit rounded-lg">
                    #{item?.priority}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden sm:block relative col-span-4 h-[500px] overflow-y-scroll bg-[#272727]/60 text-white rounded-lg">
        <h2 className="w-full inline-flex items-center gap-2 px-6 py-2 text-xl font-semibold bg-[#272727]/10 backdrop-filter backdrop-blur-sm shadow-md">
          <CircleCheck /> Filter
        </h2>
        <div className="sticky top-0  text-sm bg-[#272727]/10 backdrop-filter backdrop-blur-sm py-2 px-2 overflow-x-scroll flex gap-4">
          <button
            onClick={async () => {
              setFilterTask("completed");
              setFilteredTasks(await getFilterTasks("completed"));
            }}
            className={`px-3 py-1 border border-white rounded-lg hover:bg-white hover:text-black ${
              filterTask == "completed" ? "bg-white text-black" : ""
            }`}
          >
            Completed
          </button>
          <button
            onClick={async () => {
              setFilterTask("pending");
              setFilteredTasks(await getFilterTasks("pending"));
            }}
            className={`px-3 py-1 border border-white rounded-lg hover:bg-white hover:text-black ${
              filterTask == "pending" ? "bg-white text-black" : ""
            }`}
          >
            Pending
          </button>
          <button
            onClick={async () => {
              setFilterTask("low");
              setFilteredTasks(await getFilterTasks("low"));
            }}
            className={`px-3 py-1 border border-white rounded-lg hover:bg-white hover:text-black ${
              filterTask == "low" ? "bg-white text-black" : ""
            }`}
          >
            Low
          </button>
          <button
            onClick={async () => {
              setFilterTask("high");
              setFilteredTasks(await getFilterTasks("high"));
            }}
            className={`px-3 py-1 border border-white rounded-lg hover:bg-white hover:text-black ${
              filterTask == "high" ? "bg-white text-black" : ""
            }`}
          >
            High
          </button>
          <button
            onClick={async () => {
              setFilterTask("medium");
              setFilteredTasks(await getFilterTasks("medium"));
            }}
            className={`px-3 py-1 border border-white rounded-lg hover:bg-white hover:text-black ${
              filterTask == "medium" ? "bg-white text-black" : ""
            }`}
          >
            Medium
          </button>
        </div>
        <div className="flex flex-col divide-y">
          {filteredTasks?.data?.length == 0 && (
            <p className="text-center mt-10">No Task Found!</p>
          )}
          {filteredTasks?.data?.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setIsModalOpen(true);

                const { _id, topic, description, priority, status } = item;
                setEditData({ _id, topic, description, priority, status });
                console.log(editData);
              }}
              className="p-3 w-full hover:bg-black/50 hover:cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-[10%]">
                  <p className="p-2 size-7 inline-flex justify-center items-center rounded-full text-black font-bold bg-white">
                    {idx + 1}
                  </p>
                </div>
                <div className="w-[90%]">
                  <p className="text-lg font-semibold">{item?.topic}</p>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {item?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={"Edit Task"}
          description={"Edit your previous task..."}
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
              <Text /> Title
            </label>
            <input
              id="text"
              type="text"
              value={editData?.topic}
              onChange={(e) =>
                setEditData({ ...editData, topic: e.target.value })
              }
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
              value={editData?.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              placeholder="Paste the task description here..."
              className="max-h-24 h-24 min-h-24 px-4 py-2 bg-black/50 rounded-lg ring-0 focus:outline-none"
            />
            <div className="flex flex-col gap-2">
              <p className="text-base sm:text-lg font-semibold">
                Select Priority:
              </p>
              <div className="flex gap-4">
                {["low", "medium", "high"].map((priority) => (
                  <label
                    key={priority}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer 
            ${
              editData?.priority === priority
                ? "bg-white text-black"
                : "hover:bg-white/20"
            }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={editData?.priority === priority}
                      onChange={() =>
                        setEditData({ ...editData, priority: priority })
                      }
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        priority === "low"
                          ? "border-green-500 bg-green-500"
                          : priority === "medium"
                          ? "border-yellow-500 bg-yellow-500"
                          : "border-red-500 bg-red-500"
                      }`}
                    />
                    <span className="capitalize">{priority}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 w-full inline-flex justify-center items-center">
            <button
              onClick={async () => {
                await editTask(editData);
                setEditData({});
                setIsModalOpen(false);
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

export default Blocks;
