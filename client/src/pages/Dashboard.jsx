import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/baseUrl.js";
import TaskCard from "../components/TaskCard.jsx";
import { PlusCircle, Search } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/task/fetch-task");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // search + filter
  const filteredTasks = useMemo(() => {
    let list = Array.isArray(tasks) ? tasks : [];

    if (status !== "all") {
      list = list.filter((t) => t?.status === status);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((t) => {
        const title = (t?.title || "").toLowerCase();
        const desc = (t?.description || "").toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }

    return list;
  }, [tasks, status, search]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const pageTasks = filteredTasks.slice(startIndex, startIndex + PAGE_SIZE);
  const showingFrom = filteredTasks.length ? startIndex + 1 : 0;
  const showingTo = Math.min(startIndex + PAGE_SIZE, filteredTasks.length);

  // reset page on search/filter
  useEffect(() => {
    setPage(1);
  }, [search, status]);

  // clamp page if reduced
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      {/* Toolbar */}
      <div className="border rounded-lg shadow p-4 bg-white mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        {/* Add Task */}
        <button
          onClick={() => navigate("/task-form")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition"
        >
          <PlusCircle size={18} />
          Add Task
        </button>
      </div>

      {/* Meta: showing range */}
      <div className="flex-1">
        <div className="mb-4 text-sm text-gray-600">
        Showing <span className="font-medium">{showingFrom}</span>–
        <span className="font-medium">{showingTo}</span> of{" "}
        <span className="font-medium">{filteredTasks.length}</span> tasks
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          pageTasks.map((task) => (
            <TaskCard key={task._id} task={task} refresh={fetchTasks} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No tasks found 😔
          </div>
        )}
      </div>
      </div>

      {/* Pagination */}
      {filteredTasks.length > PAGE_SIZE && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-md border bg-white disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-md border bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
