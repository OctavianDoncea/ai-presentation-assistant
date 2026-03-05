import { Slide } from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const generateFromText = async (topic: string) => {
  const formData = new FormData();
  formData.append('topic', topic);
  const response = await api.post('/presentations/generate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const generateFromFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/presentations/generate-from-file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const savePresentation = async (title: string, slides: Slide[]) => {
  const response = await api.post('/presentations/', { title, content: slides });
  return response.data;
};

export const fetchPresentations = async () => {
  const response = await api.get('/presentations/');
  return response.data;
};

export const fetchPresentation = async (id: number) => {
  const response = await api.get(`/presentations/${id}`);
  return response.data;
};

export const updatePresentation = async (id: number, title: string, slides: Slide[]) => {
  const response = await api.put(`/presentations/${id}`, { title, content: slides });
  return response.data;
};

export const deletePresentation = async (id: number) => {
  const response = await api.delete(`/presentations/${id}`);
  return response.data;
};