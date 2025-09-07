import { useNavigate } from "react-router-dom";
import { Pencil, ScanEye, Trash2, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "../api/baseUrl";
import toast from "react-hot-toast";
import { useState } from "react";

export default function TaskCard({ task, refresh }) {
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure ?")) {
      await axiosInstance.delete(`/task/delete-task/${id}`);
      refresh();
      toast.success("Task deleted successfully....");
    }
  };

  const openModel = () => {
    setModelOpen(true);
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  return (
    <div className=" bg-sky-100 border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-lg text-gray-800">{task.title}</h2>
        <div className="flex gap-1">
          <ScanEye
            color="blue"
            onClick={openModel}
            className=" cursor-pointer"
          />
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              task.status === "done"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
        {task.description}
      </p>

      <div className="flex justify-between  mt-4">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/task-form/${task._id}`)}
            className="flex items-center gap-1  cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={() => handleDelete(task._id)}
            className="flex items-center gap-1  cursor-pointer bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
        <div>
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </div>
      </div>

      {modelOpen && (
        <div className="fixed inset-0 bg-gray-800/75 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold mb-4">{task.title}</h3>
              <X
                onClick={(e) => {
                  e.stopPropagation();
                  closeModel();
                }}
                color="red"
              />
            </div>
            <p className=" overflow-y-scroll">{task.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
