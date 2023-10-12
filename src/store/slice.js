
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
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
  }
})
////
const toggleTask = createAsyncThunk("task/toggleTask", async (taskId, status) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    console.log("esta es la data que manda toggle",data);
    return data;
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
        console.log("se ejecuto esta funcion ");
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        console.log("se ejecuto ela tarea addTask y se imprimira el nuevo estado:");
      })
      .addCase(toggleTask.fulfilled, (state,action) => {
        const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload._id : task
        );
        state.tasks = updatedTasks;
      })
      .addCase(deleteTask.fulfilled, (state,action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })


  }
  
})

export {addTask, deleteTask, fetchTasks, toggleTask}; 
export default todoSlice.reducer;