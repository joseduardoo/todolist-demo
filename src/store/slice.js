
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_URL = "http://localhost:3005/tasks";

const initialState = {
  tasks: []
};

//// Actions async 
const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});
/////
const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
  }
})
////
const toggleTask = createAsyncThunk("task/toggleTask", async (taskData) => {
  const status = taskData.newStatus;
  try {
    const response = await fetch(`${API_URL}/${taskData.idTask}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status}),
    });

    const data = await response.json();
    return taskData;
  } catch (error) {
    console.error("Error toggling task:", error);
  }
});
////
const deleteTask = createAsyncThunk("taskDelete", async (taskId) => {
  try {
    await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    return taskId;
  } catch (error) {
    console.error("Error deleting task:", error);
  }
});

/////// Slice
const todoSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload; 
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const updatedTasks = [];
        for (const taskData of state.tasks) {
          if (taskData._id === action.payload.idTask) {
            const date = taskData.date;
            const task = taskData.task;
            const status = action.payload.newStatus;
            const _id = action.payload.idTask;
            updatedTasks.push({date,task,status,_id});
          } else {
            updatedTasks.push(taskData);
          }
        }
        state.tasks = updatedTasks;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
  }
})

export {addTask, deleteTask, fetchTasks, toggleTask}; 
export default todoSlice.reducer;