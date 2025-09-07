import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/baseUrl";
import toast from "react-hot-toast";

export default function TaskForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/task/fetch-single-task/${id}`).then((res) => {
        setTitle(res.data.task.title);
        setDescription(res.data.task.description);
        setStatus(res.data.task.status);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axiosInstance.put(`/task/edit-task/${id}`, { title, description, status });
    } else {
      await axiosInstance.post("/task/create-task", { title, description, status });
    }
    navigate("/dashboard");
    if(id){
      toast.success("Task updated successfully...")
    }else{
      toast.success("Task created successfully...")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {id ? "✏️ Edit Task" : "📝 Create Task"}
        </h1>

        {/* Title Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Description Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />

        {/* Status Select */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 w-full rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          {id ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
