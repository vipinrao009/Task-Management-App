import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import axiosInstance from "../api/baseUrl";
import toast from "react-hot-toast";

export default function TaskCard({ task, refresh }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure ?")) {
    await axiosInstance.delete(`/task/delete-task/${id}`);
    refresh();
    toast.success("Task deleted successfully....")
  }
  };

  return (
    <div className=" bg-sky-100 border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-lg text-gray-800">{task.title}</h2>
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

      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
        {task.description}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => navigate(`/task-form/${task._id}`)}
          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
