import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = (email, password) =>
  api.post('/login', { email, password });

export const register = (username, email, password) =>
  api.post('/register', { username, email, password });

export const createBlog = (title, content, image, token) =>
  api.post('/blogs', { title, content, image }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchBlogs = () => api.get('/blogs');

export const fetchBlogById = (id) => api.get(`/blogs/${id}`);

export const updateBlog = (id, title, content, image, token) =>
  api.put(`/blogs/${id}`, { title, content, image }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteBlog = (id, token) =>
  api.delete(`/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
