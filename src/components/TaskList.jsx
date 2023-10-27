import { useSelector, useDispatch } from "react-redux"

import { deleteTask } from "../features/tasks/taskSlice"
import { Link } from "react-router-dom"

const TaskList = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks.tasks)

    const onHandleDelete = (id) => {
        const action = deleteTask({ id })
        console.log("Action: ", action)
        dispatch(action)
    }

    return (
        <div className="w-4/6 h-screen">
            <header className="flex justify-between items-center py-4">
                <h1 className="">Task List {tasks.length}</h1>
                <Link className="bg-indigo-600 px-2 py-1 text-sm rounded-md" to="/add-task">Add Task</Link>
            </header>

            <div className="overflow-y-auto max-h-[90vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tasks.map(task => (
                        <div key={task._id} className="bg-neutral-800 p-6 rounded-lg shadow-md flex flex-col">
                            <div className="overflow-hidden">
                                <h3 className="text-2xl font-bold text-white mb-4 truncate h-[3rem]">
                                    {task.title}
                                </h3>
                            </div>
                            <div className="mt-auto">
                                <p className="text-gray-300 leading-relaxed">{task.description}</p>
                                <span>{task.done}</span>
                                <div className="w-100 flex justify-end gap-3 mt-3">
                                    <Link to={`/edit-task/${task.id}`} className="bg-zinc-600 px-2 py-1 text-xs rounded-md">Edit</Link>
                                    <button onClick={() => onHandleDelete(task._id)} className="bg-red-500 px-2 py-1 text-xs rounded-md self-center">Done</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>




        </div>
    )
}

export default TaskList