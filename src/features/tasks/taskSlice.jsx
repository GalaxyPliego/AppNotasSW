import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const serverUrl = 'http://localhost:3001';

const initialState = {
    tasks: [],
    status: 'idle',
    error: null,
}

const addTaskAsync = createAsyncThunk('tasks/addTaskAsync', async (task) => {
    try {
        const response = await fetch(`${serverUrl}/api/note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const data = await response.json();
        console.log("Nota creada: ", data)
        return data;
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
        throw error;
    }
})

const getTasksAsync = createAsyncThunk('tasks/getTasksAsync', async () => {
    try {
        const response = await fetch(`${serverUrl}/api/note`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
        throw error;
    }
})

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: {
            reducer(state, action) {
                state.tasks.push(action.payload)
            },
            prepare(task) {
                return {
                    payload: {
                        id: nanoid(),
                        title: task.title,
                        description: task.description,
                        completed: task.completed
                    }
                }
            }
        },
        deleteTask: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id)
            state.tasks.splice(taskIndex, 1)

        },
        editTask: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id)
            state.tasks[taskIndex] = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTaskAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //state.tasks.push(action.payload);
                state.tasks = [...state.tasks, action.payload]
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getTasksAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getTasksAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(getTasksAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { addTask, deleteTask, editTask } = taskSlice.actions;

export default taskSlice.reducer;

export const selecTaskById = (state, taskId) => {
    return state.tasks.tasks.find(task => task.id === taskId)
}

export { addTaskAsync, getTasksAsync };