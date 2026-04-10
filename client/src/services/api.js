import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor — attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Resume APIs
export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const analyzeResume = (text, fileName) => {
  return api.post('/resume/analyze', { text, fileName });
};

// Interview APIs
export const generateQuestions = (jobRole) => {
  return api.post('/interview/generate-questions', { jobRole });
};

export const evaluateAnswer = (data) => {
  return api.post('/interview/evaluate-answer', data);
};

// History APIs
export const getResumeHistory = () => api.get('/history/resumes');
export const getInterviewHistory = () => api.get('/history/interviews');
export const deleteResumeHistory = (id) => api.delete(`/history/resumes/${id}`);
export const deleteInterviewHistory = (id) => api.delete(`/history/interviews/${id}`);

export default api;
