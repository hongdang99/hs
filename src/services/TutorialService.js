import axios from "../axios"

const getAll = () => {
  return axios.get("/todo");
};

// const get = id => {
//   return axios.get(`/todo/${id}`);
// };

const create = data => {
  return axios.post("/todo", data);
};

const update = (id, data) => {
  return axios.put(`/todo/${id}`, data);
};

const remove = id => {
  return axios.delete(`/todo/${id}`);
};

const completeTodo = () => {
  return axios.delete(`/todo`);
};

const findByTitle = title => {
  return axios.get(`/tutorials?title=${title}`);
};

const TodolService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default TutorialService;
