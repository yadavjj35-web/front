import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function uploadFiles(files, onProgress) {
  const fd = new FormData();
  Array.from(files).forEach((f) => fd.append('files', f));
  const res = await api.post(ENDPOINTS.upload, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress(e) {
      if (e.total && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    }
  });
  return res.data;
}
