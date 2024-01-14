import CreateTodo from "~/components/forms/createTodo";
import Todos from "~/components/todos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
      <ToastContainer position="top-center" hideProgressBar autoClose={1000} />
      <main className="w-[400px] mx-auto min-h-screen flex items-center justify-center flex-col">
        <h1 className="font-bold text-4xl text-slate-800 mb-8">Todo App</h1>
        <CreateTodo />
        <Todos />
      </main>
    </>
  );
};

export default MainLayout;
