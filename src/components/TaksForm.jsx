import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTaskAsync, selecTaskById, editTask } from '../features/tasks/taskSlice';
import { useNavigate, useParams } from "react-router-dom";

const TaksForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { taskId } = useParams();

    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    const taskById = useSelector(state => selecTaskById(state, taskId));
    
    useEffect(() => {
        if (taskId) {
            setTask(taskById);
        }
    }, [taskId, taskById])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskId) {
            dispatch(editTask(task))
            setTask({
                title: "",
                description: "",
                completed: false,
            });
            navigate('/');
            return;
        }
        dispatch(addTaskAsync(task));
        setTask({
            title: "",
            description: "",
            completed: false,
        });
        navigate('/');
    };

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form className="bg-zinc-800 max-w-md w-3/4 p-4 rounded-md">
            <label htmlFor="title" className="block text-sm font-bold mb-2">Title task:</label>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={handleChange}
                className="w-full bg-zinc-900 p-2 rounded-md mb-2"
            />

            <label htmlFor="description" className="block text-sm font-bold mb-2">Description task:</label>
            <textarea
                name="description"
                placeholder="Write a description"
                value={task.description}
                onChange={handleChange}
                className="w-full bg-zinc-900 p-2 rounded-md mb-2"
            ></textarea>

            <button onClick={handleSubmit} className="bg-indigo-600 px-8 py-1 rounded-md mt-3">Add</button>
        </form>
    );
};

export default TaksForm;
