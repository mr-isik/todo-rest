import axios from "axios";
import classNames from "classnames";
import useSWR from "swr";
import { toast } from "react-toastify";

interface ITodo {
  id: number;
  content: string;
  completed: boolean;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Todos = () => {
  const { data, error, isLoading } = useSWR<ITodo[]>(
    "http://localhost:3000/api/todos",
    fetcher,
    { refreshInterval: 500 }
  );

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting todo");
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, { completed });
      toast.success("Todo updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating todo");
    }
  };

  if (error) return <p>Error loading data</p>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <article className="flex flex-col gap-2 w-full mt-12">
      {data?.map((todo) => (
        <div
          key={todo.id}
          className="border border-slate-200 rounded-md px-4 py-2 flex items-center"
        >
          <div className="flex flex-1 items-center gap-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                handleToggle(todo.id, todo.completed);
              }}
              className="form-checkbox h-4 w-4 text-indigo-600 cursor-pointer"
            />
            <span
              className={classNames("text-slate-600", {
                "line-through text-slate-400": todo.completed,
              })}
            >
              {todo.content}
            </span>
          </div>
          <button
            onClick={() => handleDelete(todo.id)}
            type="button"
            className="text-slate-600"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
            </svg>
          </button>
        </div>
      ))}
    </article>
  );
};

export default Todos;
