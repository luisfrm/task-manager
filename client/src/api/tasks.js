import axios from "./axios";

export const getTasksRequest = async () => {
  try {
    const req = await axios.get(`/tasks`);
    return req.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getTaskRequest = async (id) => {
  try {
    const req = await axios.get(`/tasks/${id}`);
    return req.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export const saveTaskRequest = async (task) => {
  try {
    const req = await axios.post(`/tasks`, task);
    return req.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export const updateTaskRequest = async (task) => {
  try {
    const req = await axios.put(`/tasks/${task._id}`, task);
    return req.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export const deleteTaskRequest = async (id) => {
  try {
    const req = await axios.delete(`/tasks/${id}`);
    return req.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}