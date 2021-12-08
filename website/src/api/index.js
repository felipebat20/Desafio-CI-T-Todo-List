import axios from 'axios';


const fetchTasks = async() => {
  const response = await axios.get('http://localhost:8000/api/tasks');
  console.log(response);

  return response;
};

const addNewTask = async(task) => {
  const params = new URLSearchParams({
    name: task
  });

  const response = await axios.post('http://localhost:8000/api/tasks', {
    params,
  });

  console.log();

  return response
};

export default {
  fetchTasks,
  addNewTask,
}
