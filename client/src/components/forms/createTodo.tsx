import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

interface IFormInput {
  content: string;
}

const CreateTodo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/todos", {
        content: data.content,
      });
      toast.success("Todo created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error creating todo");
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="relative w-full flex gap-4">
        <div className="flex-1">
          <div className="flex items-center flex-1">
            <svg
              className="w-6 h-6 text-gray-400 absolute left-3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <input
              placeholder="e.g. Do the homework"
              {...register("content", { required: true })}
              className="w-full pl-12 pr-3 h-10 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg font-medium"
            />
          </div>

          {errors.content && (
            <span className="font-medium mt-1 block text-red-500">
              * This field is required
            </span>
          )}
        </div>

        <button
          type="submit"
          className="px-4 h-10 text-white bg-indigo-600 shadow-md rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default CreateTodo;
